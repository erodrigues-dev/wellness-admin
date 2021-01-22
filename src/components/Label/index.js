import React from 'react';

import { Status } from './styles';

const Label = ({ status }) => {
  return <Status status={status}>{status}</Status>;
};

export default Label;
