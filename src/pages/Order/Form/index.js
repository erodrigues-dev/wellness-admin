import React, { useState } from 'react';

import Modal from '~/components/Modal';

import CreateOrder from './CreateOrder';
import PayCreditCard from './PayCreditCard';
import PayMoney from './PayMoney';

const OrderWizard = ({ setClose, reloadOrders }) => {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState(null);

  return (
    <Modal title="Create Order" setClose={setClose}>
      {page === 1 && (
        <CreateOrder
          setOrder={setOrder}
          setClose={setClose}
          setPage={setPage}
        />
      )}
      {page === 2 && (
        <PayCreditCard
          order={order}
          setClose={setClose}
          reloadOrders={reloadOrders}
        />
      )}
      {page === 3 && (
        <PayMoney
          order={order}
          setClose={setClose}
          reloadOrders={reloadOrders}
        />
      )}
    </Modal>
  );
};

export default OrderWizard;
