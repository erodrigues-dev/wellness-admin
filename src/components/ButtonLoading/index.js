import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function ButtonLoading({ children, loading, ...props }) {
  return (
    <Button {...props} disabled={loading}>
      {loading && (
        <Spinner as="span" animation="border" size="sm" className="mr-3" />
      )}
      {children}
    </Button>
  );
}

export default ButtonLoading;
