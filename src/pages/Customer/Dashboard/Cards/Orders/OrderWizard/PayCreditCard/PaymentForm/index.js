import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import useNotification from '~/contexts/notification';

import { Container } from './styles';

const PaymentForm = ({ SqPaymentForm }) => {
  const { sendNotification } = useNotification();
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

  return (
    <Container>
      <Form id="form-container">
        <Form.Label>New Card</Form.Label>
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
              <Form.Control id="sq-expiration-date" name="sq-expiration-date" />
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

        <Form.Row className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="mr-2 button-credit-card"
            onClick={requestCardNonce}
          >
            Request
          </Button>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default PaymentForm;
