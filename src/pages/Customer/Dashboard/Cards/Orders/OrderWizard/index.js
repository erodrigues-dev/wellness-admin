import React, { useState } from 'react';

import CreateOrder from './CreateOrder';
import PayCreditCard from './PayCreditCard';
import PayMoney from './PayMoney';
import { Container } from './styles';

const OrderWizard = ({ setClose }) => {
  const [page, setPage] = useState(1);

  return (
    <Container>
      {page === 1 && <CreateOrder setClose={setClose} setPage={setPage} />}
      {page === 2 && <PayCreditCard setClose={setClose} />}
      {page === 3 && <PayMoney setClose={setClose} />}
    </Container>
  );
};

export default OrderWizard;
