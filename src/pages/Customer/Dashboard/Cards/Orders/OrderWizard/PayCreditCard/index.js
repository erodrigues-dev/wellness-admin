import React, { useEffect, useState } from 'react';

import PaymentForm from './PaymentForm';

const PayCreditCard = ({ order }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const sqPaymentScript = document.createElement('script');
    sqPaymentScript.src = 'https://js.squareup.com/v2/paymentform';
    sqPaymentScript.type = 'text/javascript';
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      setLoaded(true);
    };
    document.getElementsByTagName('head')[0].appendChild(sqPaymentScript);
  }, []);

  if (loaded) {
    return <PaymentForm SqPaymentForm={window.SqPaymentForm} order={order} />;
  }

  return null;
};

export default PayCreditCard;
