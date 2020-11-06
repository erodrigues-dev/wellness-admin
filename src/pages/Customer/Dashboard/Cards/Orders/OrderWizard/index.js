import React, { useState } from 'react';

import CreateOrder from './CreateOrder';
import PayCreditCard from './PayCreditCard';
import PayMoney from './PayMoney';
import { Container } from './styles';

const OrderWizard = ({ setClose }) => {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState(null);

  return (
    <Container>
      {page === 1 && (
        <CreateOrder
          setOrder={setOrder}
          setClose={setClose}
          setPage={setPage}
        />
      )}
      {page === 2 && <PayCreditCard order={order} setClose={setClose} />}
      {page === 3 && <PayMoney order={order} setClose={setClose} />}
    </Container>
  );
};

export default OrderWizard;
