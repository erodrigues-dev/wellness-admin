import React, { useEffect, useState } from 'react';

import Loading from '~/components/Loading';

import PaymentForm from './PaymentForm';

const PayCreditCard = ({ order, reloadOrders, setClose }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const squareApi = document.getElementById('square-api');

    const sqPaymentScript = document.createElement('script');

    sqPaymentScript.src = 'https://js.squareupsandbox.com/v2/paymentform';
    sqPaymentScript.type = 'text/javascript';
    sqPaymentScript.async = false;
    sqPaymentScript.id = 'square-api';
    sqPaymentScript.onload = () => {
      setLoaded(true);
    };
    document.getElementsByTagName('head')[0].appendChild(sqPaymentScript);

    if (squareApi)
      document.getElementsByTagName('head')[0].removeChild(sqPaymentScript);
  }, []);

  if (loaded) {
    return (
      <PaymentForm
        SqPaymentForm={window.SqPaymentForm}
        order={order}
        reloadOrders={reloadOrders}
        setClose={setClose}
      />
    );
  }

  return <Loading />;
};

export default PayCreditCard;
