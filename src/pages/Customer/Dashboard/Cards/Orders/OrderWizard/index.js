import React from 'react';
import StepWizard from 'react-step-wizard';

import CreateOrder from './CreateOrder';
import PayCreditCard from './PayCreditCard';
import PayMoney from './PayMoney';

const OrderWizard = ({ setClose }) => {
  return (
    <div>
      <StepWizard>
        <CreateOrder setClose={setClose} />
        <PayCreditCard setClose={setClose} />
        <PayMoney setClose={setClose} />
      </StepWizard>
    </div>
  );
};

export default OrderWizard;
