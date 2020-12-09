import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { useFormik } from 'formik';

import useNotification from '~/contexts/notification';
import masks from '~/helpers/masks';
import { number } from '~/helpers/sanitize';
import * as checkoutService from '~/services/checkout';
import * as discountService from '~/services/discount';

import CardResume from './CardResume';
import CardSelection from './CardSelection';
import schema from './schema';
import { CardForm, Container } from './styles';
import Summary from './Summary';

const messages = {
  CVV_FAILURE: 'Please verify the CVV field',
  ADDRESS_VERIFICATION_ERROR: 'Please verify the Zip Code field',
  INVALID_EXPIRATION: 'Please verify the Expiration Date field',
  GENERIC_DECLINE: "Please, verify the card's fields",
};

const PaymentForm = ({ SqPaymentForm, order, reloadOrders, setClose }) => {
  const { sendNotification } = useNotification();
  const [discount, setDiscount] = useState(0);
  const [paymentForm, setPaymentForm] = useState(null);
  const [selectedCard, setSelectedCard] = useState('');
  const [cardId, setCardId] = useState(0);
  const [squareErrors, setSquareErrors] = useState([]);
  const [formLoaded, setFormLoaded] = useState(false);
  const [tip, setTip] = useState('');
  const [config] = useState({
    applicationId: process.env.REACT_APP_SQUARE_APP_ID,
    locationId: process.env.REACT_APP_SQUARE_LOCATION_ID,
    inputClass: 'sq-input',
    autoBuild: false,
    inputStyles: [
      {
        fontSize: '16px',
        padding: '2.5px',
        color: '#373F4A',
        backgroundColor: 'transparent',
        lineHeight: '1.15em',
        placeholderColor: '#000',
        _webkitFontSmoothing: 'antialiased',
        _mozOsxFontSmoothing: 'grayscale',
      },
    ],
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
      tip: '',
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

  useEffect(() => {
    findDiscount();
  }, [findDiscount]);

  const checkout = useCallback(
    async (nonce, cardName, saveCard) => {
      if (!nonce) return;

      try {
        await checkoutService.payWithCard({
          customerId: order.customerId,
          itemType: order.itemType,
          itemId: order.item.id,
          quantity: order.quantity,
          cardId: nonce,
          cardName,
          tip: number(tip),
          dueDate: order.dueDate || null,
          saveCard,
        });

        reloadOrders();
        sendNotification('Order created successfully.', true);
        setClose(false);
      } catch (error) {
        if (error.length > 0) {
          error.forEach((er) => sendNotification(messages[er.code], false));
        } else {
          sendNotification(error.message, false);
        }
      }
    },
    [order, sendNotification, tip, reloadOrders, setClose]
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

    return () => {
      if (paymentForm) paymentForm.destroy();
    };
  }, [paymentForm]);

  const requestCardNonce = () => {
    if (paymentForm) {
      paymentForm.requestCardNonce();
    }
  };

  useEffect(() => {
    if (squareErrors.length > 0 && !selectedCard) {
      squareErrors.forEach((error) => {
        sendNotification(error.message, false);
      });
    }
  }, [squareErrors, selectedCard, sendNotification]);

  function handleSubmit(data) {
    if (selectedCard.id) {
      checkout(selectedCard.id, data.cardName, data.saveCard);
    } else {
      requestCardNonce();
    }
  }

  function handleSelectCard(key) {
    if (key.id === '' && order.isRecurrencyPay) {
      formik.setFieldValue('saveCard', true);
    } else {
      formik.setFieldValue('saveCard', false);
    }
    formik.setFieldValue('cardName', '');
    setSelectedCard(key);
  }

  return (
    <Container>
      <Form id="form-container" onSubmit={formik.handleSubmit}>
        <Col md="8" className="card-form">
          <CardSelection
            customerId={order.customerId}
            setCard={handleSelectCard}
            setFormikCard={(e) => formik.setFieldValue('cardId', e)}
          />
          <CardForm formLoaded={formLoaded} hasCardSelected={!!selectedCard.id}>
            {!formLoaded && <p>Loading...</p>}
            <Form.Label id="name">
              <h3>
                {selectedCard.id || formik.values.cardId ? 'Selected' : 'New'}{' '}
                Card
              </h3>
            </Form.Label>
            {!(selectedCard.id || formik.values.cardId) && (
              <Form.Group>
                <Form.Label>Card holder name</Form.Label>
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
            )}
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
                    <Form.Label className="text-nowrap">
                      Expiration Date
                    </Form.Label>
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
                    <Form.Label className="text-nowrap">Zip Code</Form.Label>
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
            {!selectedCard.id && (
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
                  disabled={order.isRecurrencyPay}
                />
              </Form.Group>
            )}
          </CardForm>
        </Col>
        <Col md="4" className="confirmOrder">
          <div className="summary">
            <h3>Order Summary</h3>
            <Summary
              subtotal={order.item.price}
              discountType={discount?.type}
              discount={discount?.value}
              quantity={order.quantity}
              tip={formik.values.tip}
              recurrency={order.item.recurrencyPay}
              isRecurrencyPay={order.isRecurrencyPay}
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
                variant="secondary"
                className="button-credit-card"
                onClick={formik.handleSubmit}
              >
                Confirm Order
              </Button>
            </Form.Row>
          </div>
        </Col>
      </Form>
    </Container>
  );
};

export default PaymentForm;
