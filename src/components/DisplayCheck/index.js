import React from 'react';
import { FiCheckSquare, FiXSquare } from 'react-icons/fi';

const DisplayCheck = ({ checked }) =>
  checked ? (
    <FiCheckSquare color="green" size="22" />
  ) : (
    <FiXSquare color="red" size="22" />
  );

export default DisplayCheck;
