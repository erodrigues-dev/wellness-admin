import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { useFormik } from 'formik';

import useNotification from '~/contexts/notification';
import masks from '~/helpers/masks';
import { number } from '~/helpers/sanitize';
import * as checkoutService from '~/services/checkout';
import * as discountService from '~/services/discount';

import CardSelection from '../CardSelection';
import CardResume from './CardResume';
import schema from './schema';
import { CardForm, Container } from './styles';
import Summary from './Summary';

const PaymentForm = ({ SqPaymentForm, order, reloadOrders, setClose }) => {
  const { sendNotification } = useNotification();
  const [discount, setDiscount] = useState(0);
  const [paymentForm, setPaymentForm] = useState(null);
  const [selectedCard, setSelectedCard] = useState('');
  const [cardId, setCardId] = useState(0);
  const [squareErrors, setSquareErrors] = useState([]);
  const [formLoaded, setFormLoaded] = useState(false);
  const [tip, setTip] = useState(0);
  const [config] = useState({
    applicationId: process.env.REACT_APP_SQUARE_APP_ID,
    locationId: process.env.REACT_APP_SQUARE_LOCATION_ID,
    inputClass: 'sq-input',
    autoBuild: false,
    cardNumber: {
      elementId: 'sq-card-number',
      placeholder: 'ex: xxxx xxxx xxxx xxxx',
    },
    cvv: {
      elementId: 'sq-cvv',
      placeholder: 'ex: 000',
    },
    expirationDate: {
      elementId: 'sq-expiration-date',
      placeholder: 'ex: 12/21',
    },
    postalCode: {
      elementId: 'sq-postal-code',
      placeholder: 'ex: 1111111',
    },
    callbacks: {
      cardNonceResponseReceived: (errors, nonce) => {
        if (errors) {
          setSquareErrors(errors);
        } else {
          setCardId(nonce);
        }
      },
      paymentFormLoaded: () => {
        document.getElementById('name').style.display = 'inline-flex';
        setFormLoaded(true);
      },
    },
  });

  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      cardName: '',
      saveCard: order.isRecurrencyPay,
      tip: 0,
      cardId: '',
    },
  });

  const findDiscount = useCallback(async () => {
    try {
      const { data } = await discountService.find(
        order.customerId,
        order.itemType,
        order.item.id
      );

      setDiscount(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification, order.customerId, order.itemType, order.item.id]);

  // VERIFICAR REGRAS (SAVE CARD TRUE E DISABLED QUANDO RECORRENTE TB)

  useEffect(() => {
    findDiscount();
  }, [findDiscount]);

  const checkout = useCallback(
    async (nonce) => {
      if (!nonce) return;
      try {
        await checkoutService.payWithCard({
          customerId: order.customerId,
          itemType: order.itemType,
          itemId: order.item.id,
          quantity: order.quantity,
          cardId: nonce,
          cardName: formik.values.cardName,
          tip: number(tip),
          dueDate: order.dueDate || null,
          saveCard: formik.values.saveCard,
        });

        reloadOrders();
        sendNotification('Order created successfully.', true);
        setClose(false);
      } catch (error) {
        sendNotification(error.message, false);
      }
    },
    [
      order,
      sendNotification,
      formik.values.cardName,
      formik.values.saveCard,
      tip,
      reloadOrders,
      setClose,
    ]
  );

  useEffect(() => {
    if (cardId) {
      checkout(cardId);
    }
  }, [cardId, checkout]);

  useEffect(() => {
    setPaymentForm(new SqPaymentForm(config));
  }, [SqPaymentForm, config]);

  useEffect(() => {
    if (paymentForm) paymentForm.build();
  }, [paymentForm]);

  const requestCardNonce = () => {
    if (paymentForm) {
      paymentForm.requestCardNonce();
    }
  };

  useEffect(() => {
    if (selectedCard) {
      formik.setFieldValue('saveCard', false);
    }
    // eslint-disable-next-line
  }, [selectedCard]);

  useEffect(() => {
    if (squareErrors.length > 0 && !selectedCard) {
      squareErrors.forEach((error) => {
        sendNotification(error.message, false);
      });
    }
  }, [squareErrors, selectedCard, sendNotification]);

  function handleSubmit() {
    if (selectedCard) {
      checkout(selectedCard.id);
    } else {
      requestCardNonce();
    }
  }

  return (
    <Container>
      <Form id="form-container" onSubmit={formik.handleSubmit}>
        <Col md="8" className="card-form">
          <CardSelection
            customerId={order.customerId}
            setCard={setSelectedCard}
            setFormikCard={(e) => formik.setFieldValue('cardId', e)}
          />
          <CardForm formLoaded={formLoaded} hasCardSelected={!!selectedCard.id}>
            {!formLoaded && <p>Loading...</p>}
            <Form.Label>
              <h3>New Card</h3>
            </Form.Label>
            <Form.Group>
              <Form.Label id="name">Card holder name</Form.Label>
              <Form.Control
                id="cardName"
                name="cardName"
                placeholder="Name"
                type="text"
                value={formik.values.cardName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.cardName && formik.errors.cardName}
                isValid={formik.touched.cardName && !formik.errors.cardName}
                disabled={!!selectedCard.id}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.cardName}
              </Form.Control.Feedback>
            </Form.Group>
            {!!(selectedCard.id || formik.values.cardId) && (
              <CardResume selectedCard={selectedCard} />
            )}
            <div className="square-form">
              <Form.Group>
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control id="sq-card-number" name="sq-card-number" />
              </Form.Group>

              <Row className="d-flex ">
                <Col md="3">
                  <Form.Group>
                    <Form.Label>Expiration Date</Form.Label>
                    <Form.Control
                      id="sq-expiration-date"
                      name="sq-expiration-date"
                      disabled={!!selectedCard.id}
                    />
                  </Form.Group>
                </Col>

                <Col md="3">
                  <Form.Group>
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      id="sq-cvv"
                      name="sq-cvv"
                      disabled={!!selectedCard.id}
                    />
                  </Form.Group>
                </Col>

                <Col md="6">
                  <Form.Group>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      id="sq-postal-code"
                      name="sq-postal-code"
                      disabled={!!selectedCard.id}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <p id="error" />

            <Form.Group>
              <Form.Check
                custom
                inline
                className="text-nowrap"
                type="checkbox"
                label="Save card"
                id="saveCard"
                name="saveCard"
                checked={formik.values.saveCard}
                onChange={formik.handleChange}
                disabled={order.isRecurrencyPay || !!selectedCard.id}
              />
            </Form.Group>
          </CardForm>
        </Col>
        <Col md="4" className="confirmOrder">
          <h3>Order Summary</h3>
          <Summary
            subtotal={order.item.price}
            discountType={discount?.type}
            discount={discount?.value}
            quantity={order.quantity}
            tip={formik.values.tip}
            recurrency={order.item.recurrencyPay}
          >
            <Form.Group className="tip">
              <div className="tip-wrapper">
                $
                <input
                  type="text"
                  placeholder="ex: 1,000.00"
                  name="tip"
                  value={formik.values.tip}
                  onChange={(e) => {
                    formik.setFieldValue('tip', masks.price(e));
                    setTip(masks.price(e));
                  }}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.tip && formik.errors.tip && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: 'block', fontWeight: 'normal' }}
                >
                  {formik.errors.tip}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Summary>
          <Form.Row className="button-request">
            <Button
              variant="primary"
              className="mr-2 button-credit-card"
              onClick={formik.handleSubmit}
              // disabled={formik.isSubmitting}
            >
              Confirm Order
            </Button>
          </Form.Row>
        </Col>
      </Form>
    </Container>
  );
};

export default PaymentForm;
