import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import useNotification from '~/contexts/notification';
import * as discountService from '~/services/discount';

import OrderSummary from '../../OrderSummary';
import CardSelection from '../CardSelection';
import { Container, Line } from './styles';

const PaymentForm = ({ SqPaymentForm, order }) => {
  const { id } = useParams();
  const { sendNotification } = useNotification();
  const [discount, setDiscount] = useState(0);

  const config = {
    applicationId: 'sq0idp-rARHLPiahkGtp6mMz2OeCA',
    locationId: 'GMT96A77XABR1',
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
      createPaymentRequest: () => {
        return {
          requestShippingAddress: false,
          requestBillingInfo: true,
          currencyCode: 'USD',
          countryCode: 'US',
          total: {
            label: 'MERCHANT NAME',
            amount: '100',
            pending: false,
          },
          lineItems: [
            {
              label: 'Subtotal',
              amount: '100',
              pending: false,
            },
          ],
        };
      },
      // eslint-disable-next-line no-unused-vars
      cardNonceResponseReceived: (errors, nonce, cardData) => {
        // console.log(nonce);
        // console.log(cardData);
        if (errors) {
          errors.forEach((error) => {
            sendNotification(`  ${error.message}`, false);
          });
        }
      },
      unsupportedBrowserDetected: () => {},
      inputEventReceived: (inputEvent) => {
        switch (inputEvent.eventType) {
          case 'focusClassAdded':
            break;
          case 'focusClassRemoved':
            break;
          case 'errorClassAdded':
            document.getElementById('error').innerHTML =
              'Please fix card information errors before continuing.';
            break;
          case 'errorClassRemoved':
            document.getElementById('error').style.display = 'none';
            break;
          case 'cardBrandChanged':
            break;
          case 'postalCodeChanged':
            break;
          default:
            break;
        }
      },
      paymentFormLoaded: () => {
        document.getElementById('name').style.display = 'inline-flex';
      },
    },
  };
  const paymentForm = new SqPaymentForm(config);
  paymentForm.build();

  const requestCardNonce = () => {
    paymentForm.requestCardNonce();
  };

  const findDiscount = useCallback(async () => {
    try {
      const { data } = await discountService.find(
        id,
        order.relationType,
        order.relation.id
      );

      setDiscount(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification, id, order.relationType, order.relation.id]);

  useEffect(() => {
    findDiscount();
  }, [findDiscount]);

  return (
    <Container>
      <Form id="form-container" className="d-flex">
        <Col md="7">
          <CardSelection />
          <Form.Label>
            <h3>New Card</h3>
          </Form.Label>
          <Form.Group>
            <Form.Label>Card holder name</Form.Label>
            <Form.Control id="name" placeholder="Name" name="name" />
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
                />
              </Form.Group>
            </Col>
            <Col md="3">
              <Form.Group>
                <Form.Label>Security Code</Form.Label>
                <Form.Control id="sq-cvv" name="sq-cvv" />
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control id="sq-postal-code" name="sq-postal-code" />
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
              id="package"
              name="relationType"
            />
          </Form.Group>
        </Col>

        <Col
          md="1"
          className="d-flex align-items-center justify-content-center"
        >
          <Line />
        </Col>

        <Col md="4" className="d-flex flex-column justify-content-center">
          <h3>Order Summary</h3>
          <OrderSummary
            price={order.relation.price}
            discountType={discount?.type}
            discountValue={discount?.value}
            quantity={order.quantity}
          >
            Tips
          </OrderSummary>
          <Form.Row className="d-flex justify-content-end">
            <Button
              variant="primary"
              className="mr-2 button-credit-card"
              onClick={requestCardNonce}
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
