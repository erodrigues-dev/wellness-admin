import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { useFormik } from 'formik';

import useNotification from '~/contexts/notification';
import masks from '~/helpers/masks';
import * as checkoutService from '~/services/checkout';
import * as discountService from '~/services/discount';

import OrderSummary from '../../OrderSummary';
import CardSelection from '../CardSelection';
import schema from './schema';
import { Container } from './styles';

const PaymentForm = ({ SqPaymentForm, order, reloadOrders, setClose }) => {
  const { sendNotification } = useNotification();
  const [discount, setDiscount] = useState(0);
  const [paymentForm, setPaymentForm] = useState(null);
  const [selectedCard, setSelectedCard] = useState('');
  const [cardNonceResponseReceived, setCardNonceResponseReceived] = useState(
    false
  );
  const [cardId, setCardId] = useState('');
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
        setCardNonceResponseReceived(true);
        if (errors) {
          errors.forEach((error) => {
            sendNotification(`  ${error.message}`, false);
          });
        } else {
          setCardId(nonce);
        }
      },
      paymentFormLoaded: () => {
        document.getElementById('name').style.display = 'inline-flex';
      },
    },
  });
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      cardName: '',
      saveCard: order.isRecurrencyPay,
      tip: '',
    },
  });

  const checkout = useCallback(
    async (nonce) => {
      try {
        await checkoutService.payWithCard({
          customerId: order.customerId,
          itemType: order.itemType,
          itemId: order.item.id,
          quantity: order.quantity,
          cardId: nonce,
          cardName: formik.values.cardName,
          tip: formik.values.tip,
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
      formik.values.tip,
      reloadOrders,
      setClose,
    ]
  );

  useEffect(() => {
    if (cardNonceResponseReceived) {
      checkout(cardId || selectedCard);
    }
  }, [cardNonceResponseReceived, cardId, selectedCard, checkout]);

  // useEffect(() => {
  //   if (cardId) checkout(cardId);
  // }, [cardId, checkout]);

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

  return (
    <Container>
      <Form id="form-container">
        <Col md="7" className="card-form">
          <CardSelection
            customerId={order.customerId}
            setCardId={setSelectedCard}
          />
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
              disabled={selectedCard}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.cardName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Card Number</Form.Label>
            <Form.Control id="sq-card-number" name="sq-card-number" />
          </Form.Group>

          <Row className="d-flex ">
            <Col md="3">
              <Form.Group>
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control
                  id="sq-expiration-date"
                  name="sq-expiration-date"
                  disabled={selectedCard}
                />
              </Form.Group>
            </Col>
            <Col md="3">
              <Form.Group>
                <Form.Label>Security Code</Form.Label>
                <Form.Control
                  id="sq-cvv"
                  name="sq-cvv"
                  disabled={selectedCard}
                />
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  id="sq-postal-code"
                  name="sq-postal-code"
                  disabled={selectedCard}
                />
              </Form.Group>
            </Col>
          </Row>

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
              disabled={order.isRecurrencyPay || selectedCard}
            />
          </Form.Group>
        </Col>

        <Col md="4" className="confirmOrder">
          <h3>Order Summary</h3>
          <OrderSummary
            price={order.item.price}
            discountType={discount?.type}
            discountValue={discount?.value}
            quantity={order.quantity}
            recurrency={order.item.recurrencyPay}
          >
            <Form.Group className="tip">
              <div className="tip-wrapper">
                <Form.Label className="m-0">Tip: </Form.Label>
                <Form.Control
                  placeholder="ex: 1,000.00"
                  name="tip"
                  value={formik.values.tip}
                  onChange={(e) => formik.setFieldValue('tip', masks.price(e))}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.tip && formik.errors.tip}
                  isValid={formik.touched.tip && !formik.errors.tip}
                />
              </div>
              {formik.touched.tip && formik.errors.tip && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.tip}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </OrderSummary>
          <Form.Row className="button-request">
            <Button
              variant="primary"
              className="mr-2 button-credit-card"
              onClick={requestCardNonce}
              disabled={formik.isSubmitting}
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
