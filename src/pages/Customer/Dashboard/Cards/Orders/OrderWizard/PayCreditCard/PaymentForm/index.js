import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { Container } from './styles';

const PaymentForm = ({ SqPaymentForm }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardBrand: '',
    nonce: undefined,
  });

  useEffect(() => {
    const config = {
      applicationId: process.env.REACT_APP_SQUARE_APP_ID,
      locationId: process.env.REACT_APP_SQUARE_LOCATION_ID,
      token: process.env.REACT_APP_SQUARE_TOKEN,
      inputClass: 'sq-input',
      autoBuild: false,
      cardNumber: {
        elementId: 'sq-card-number',
      },
      cvv: {
        elementId: 'sq-cvv',
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
      },
      postalCode: {
        elementId: 'sq-postal-code',
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
    paymentForm.build();
  }, [SqPaymentForm]);

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
      </Form>
    </Container>
  );
};

export default PaymentForm;
