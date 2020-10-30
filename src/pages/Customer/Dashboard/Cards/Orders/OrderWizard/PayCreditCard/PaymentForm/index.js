/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
// import { Button, Col, Form, Row } from 'react-bootstrap';

import { Container } from './styles';

const PaymentForm = ({ SqPaymentForm }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardBrand: '',
    nonce: undefined,
  });
  const config = {
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
      cardNonceResponseReceived: (errors, nonce) => {
        if (errors) {
          // Log errors from nonce generation to the Javascript console
          console.log('Encountered errors:');
          errors.forEach((error) => {
            console.log(`  ${error.message}`);
          });

          return;
        }
        setPaymentInfo({
          nonce,
        });
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
            if (inputEvent.cardBrand !== 'unknown') {
              setPaymentInfo({
                cardBrand: inputEvent.cardBrand,
              });
            } else {
              setPaymentInfo({
                cardBrand: '',
              });
            }
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

  function formBuild() {
    paymentForm.build();
  }

  useEffect(() => {
    formBuild();

    // return () => {
    //   paymentForm.destroy();
    // };
  }, []);

  return (
    <Container>
      <div className="container">
        <div id="form-container">
          <div id="sq-walletbox">
            <button type="button" className="wallet-button" id="sq-apple-pay" />
            <button
              type="button"
              className="wallet-button"
              id="sq-masterpass"
            />
            <button
              type="button"
              className="wallet-button"
              id="sq-google-pay"
            />
            <hr />
          </div>

          <div id="sq-ccbox">
            <p>
              <span>Enter Card Info Below </span>
              <span>{paymentInfo.cardBrand.toUpperCase()}</span>
            </p>
            <div id="cc-field-wrapper">
              <div id="sq-card-number" />
              <input type="hidden" id="card-nonce" name="nonce" />
              <div id="sq-expiration-date" />
              <div id="sq-cvv" />
            </div>
            <input id="name" type="text" placeholder="Name" />
            <div id="sq-postal-code" />
          </div>
          <button
            type="button"
            className="button-credit-card"
            onClick={() => paymentForm.requestCardNonce()}
          >
            Pay
          </button>
        </div>
        <p id="error" />
      </div>
      {/* <Form id="form-container">
        <Form.Label>New Card</Form.Label>
        <Form.Group>
          <Form.Label>Card holder name</Form.Label>
          <Form.Control id="name" placeholder="Name" name="name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            id="sq-card-number"
            placeholder="ex: xxxx xxxx xxxx xxxx"
            name="sq-card-number"
          />
        </Form.Group>

        <Row className="d-flex ">
          <Col md="3">
            <Form.Group>
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                placeholder="ex: 01/20"
                id="sq-expiration-date"
                name="sq-expiration-date"
              />
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Group>
              <Form.Label>Security Code</Form.Label>
              <Form.Control id="sq-cvv" placeholder="ex: 000" name="sq-cvv" />
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
            className="mr-2"
            onClick={() => paymentForm.requestCardNonce()}
          >
            Request
          </Button>
        </Form.Row>
      </Form> */}
    </Container>
  );
};

export default PaymentForm;
