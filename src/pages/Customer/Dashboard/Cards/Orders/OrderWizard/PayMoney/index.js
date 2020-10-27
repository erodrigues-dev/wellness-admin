import React from 'react';
import { Button } from 'react-bootstrap';

import ButtonLoading from '~/components/ButtonLoading';

const PayMoney = ({ setClose }) => {
  return (
    <div>
      <p>Package/Activity Name</p>
      <p>Valor (Mensal ou Semanal)*: $99.99</p>
      <p>Discount: 10% ou $10.00</p>
      <p>Subtotal: $99.00</p>
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
    </div>
  );
};

export default PayMoney;
