import React from 'react';
import StepWizard from 'react-step-wizard';

import CreateOrder from './CreateOrder';
import PayCreditCard from './PayCreditCard';
import PayMoney from './PayMoney';
import { Container } from './styles';

const OrderWizard = ({ setClose }) => {
  return (
    <Container>
      <StepWizard>
        <CreateOrder setClose={setClose} />
        <PayCreditCard setClose={setClose} />
        <PayMoney setClose={setClose} />
      </StepWizard>
    </Container>
  );
};

export default OrderWizard;
