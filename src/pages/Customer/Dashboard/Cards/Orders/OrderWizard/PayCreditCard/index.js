import React, { useEffect, useState } from 'react';

import PaymentForm from './PaymentForm';

const PayCreditCard = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const sqPaymentScript = document.createElement('script');
    // sqPaymentScript.src = 'https://js.squareupsandbox.com/v2/paymentform';
    sqPaymentScript.src = 'https://js.squareup.com/v2/paymentform';
    sqPaymentScript.type = 'text/javascript';
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      setLoaded(true);
    };
    document.getElementsByTagName('head')[0].appendChild(sqPaymentScript);
  }, []);

  return (
    <>
      {loaded && (
        <PaymentForm
          SqPaymentForm={window.SqPaymentForm}
          // paymentForm={window.SqPaymentForm}
          applicationId="sq0idp-rARHLPiahkGtp6mMz2OeCA"
          locationId="GMT96A77XABR1"
        />
      )}
    </>
  );
};

export default PayCreditCard;
