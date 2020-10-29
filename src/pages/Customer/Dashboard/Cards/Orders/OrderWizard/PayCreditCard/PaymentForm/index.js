import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';

import { useFormik } from 'formik';

import schema from './schema';
import { Container } from './styles';

const PaymentForm = ({ Payment }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardBrand: '',
    nonce: undefined,
  });
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {},
  });

  useEffect(() => {
    const config = {
      applicationId: process.env.REACT_APP_SQUARE_APP_ID,
      locationId: 'GMT96A77XABR1',
      inputClass: 'sq-input',
      autoBuild: false,
      inputStyles: [
        {
          fontSize: '16px',
          fontFamily: 'Helvetica Neue',
          padding: '16px',
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
        placeholder: '• • • •  • • • •  • • • •  • • • •',
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV',
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY',
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Zip',
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
    const paymentForm = new Payment(config);
    paymentForm.build();
  }, []);

  function handleSubmit() {}

  return (
    <Container>
      {/* payment form */}
      {console.log(paymentInfo.cardBrand)}

      <div id="sq-ccbox">
        <p>
          <span>Enter Card Info Below </span>
          <span>
            {paymentInfo.cardBrand !== undefined &&
              paymentInfo.cardBrand.toUpperCase()}
          </span>
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
      {/* <Form>
        <Form.Label>New Card</Form.Label>
        <Form.Group>
          <Form.Label>Card holder name</Form.Label>
          <Form.Control
            placeholder="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && formik.errors.name}
            isValid={formik.touched.name && !formik.errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            placeholder="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && formik.errors.name}
            isValid={formik.touched.name && !formik.errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="d-flex ">
          <Col md="3">
            <Form.Group>
              <Form.Label>MM</Form.Label>
              <Form.Control
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.name && formik.errors.name}
                isValid={formik.touched.name && !formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Group>
              <Form.Label>MM</Form.Label>
              <Form.Control
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.name && formik.errors.name}
                isValid={formik.touched.name && !formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group>
              <Form.Label>CVV</Form.Label>
              <Form.Control
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.name && formik.errors.name}
                isValid={formik.touched.name && !formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
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
            value={formik.values.relationType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.relationType && formik.errors.relationType
            }
            isValid={formik.touched.relationType && !formik.errors.relationType}
          />
          <Feedback type="invalid">{formik.errors.relationType}</Feedback>
        </Form.Group>
      </Form> */}
    </Container>
  );
};

export default PaymentForm;
