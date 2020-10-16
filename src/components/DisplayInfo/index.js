import React from 'react';
import { Col } from 'react-bootstrap';

const DisplayInfo = ({ label, value, ...rest }) => {
  return (
    <Col {...rest}>
      <p style={{ marginBottom: 4 }}>{label}</p>
      <p style={{ color: '#666' }}>{value}</p>
    </Col>
  );
};

export default DisplayInfo;
