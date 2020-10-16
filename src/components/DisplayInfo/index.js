import React from 'react';
import { Col } from 'react-bootstrap';

const DisplayInfo = ({ label, value, secondValue, ...rest }) => {
  return (
    <Col {...rest}>
      <p style={{ marginBottom: 4 }}>{label}</p>
      <p style={{ color: '#666' }}>
        {value}
        {value && secondValue && ', '}
        {secondValue}
        {!value && !secondValue && '-'}
      </p>
    </Col>
  );
};

export default DisplayInfo;
