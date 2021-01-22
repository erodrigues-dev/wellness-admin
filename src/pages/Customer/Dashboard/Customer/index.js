import React from 'react';

import Avatar from '~components/Avatar';

import { Container } from './styles';

const Customer = ({ user }) => {
  return (
    <Container>
      <Avatar name={user.name} imageUrl={user.imageUrl} />
      {/* <div className="counters">
        <div className="counter">
          <p>200</p>
          <span>counter</span>
        </div>
        <div className="counter">
          <p>200</p>
          <span>counter</span>
        </div>
        <div className="counter">
          <p>200</p>
          <span>counter</span>
        </div>
        <div className="counter">
          <p>200</p>
          <span>counter</span>
        </div>
        <div className="counter">
          <p>200</p>
          <span>counter</span>
        </div>
        <div className="counter">
          <p>200</p>
          <span>counter</span>
        </div>
      </div> */}
    </Container>
  );
};

export default Customer;
