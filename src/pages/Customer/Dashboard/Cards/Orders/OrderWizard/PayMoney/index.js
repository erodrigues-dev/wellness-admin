import React from 'react';
import { Button } from 'react-bootstrap';

import ButtonLoading from '~/components/ButtonLoading';

import { Container } from './styles';

const PayMoney = ({ setClose }) => {
  return (
    <Container>
      <h2>Package/Activity Name</h2>
      <ul>
        <li>
          Valor (Mensal ou Semanal)*: <span>$99.99</span>
        </li>
        <li>
          Discount: <span>10% ou $10.00</span>
        </li>
        <li>
          Subtotal: <span>$99.99</span>
        </li>
      </ul>
      {/* <p>Valor (Mensal ou Semanal)*: $99.99</p>
      <p>Discount: 10% ou $10.00</p>
      <p>Subtotal: $99.00</p> */}
      <div className="d-flex justify-content-end mt-5">
        <Button
          variant="secondary"
          className="mr-2"
          onClick={() => setClose(false)}
        >
          Cancel
        </Button>
        <ButtonLoading type="submit" onClick={() => {}}>
          Confirm Order
        </ButtonLoading>
      </div>
    </Container>
  );
};

export default PayMoney;
