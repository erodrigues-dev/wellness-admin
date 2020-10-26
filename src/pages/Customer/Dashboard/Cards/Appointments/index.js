import React from 'react';
import { Button, ButtonGroup, Card, ListGroup } from 'react-bootstrap';
import { RiPencilLine, RiUserAddLine, RiDeleteBin2Line } from 'react-icons/ri';

import Image from '~assets/images/avatar.svg';

const Appointments = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Appointments</Card.Title>
        <Button variant="outline-primary">Book Now</Button>
        <Button variant="outline-primary">See More</Button>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          <ListGroup.Item>
            <img src={Image} height="50" alt="profile" />
            <span>Activity Name</span>
            <ButtonGroup>
              <Button variant="secondary">
                <RiPencilLine />
              </Button>
              <Button variant="success">
                <RiUserAddLine />
              </Button>
              <Button variant="danger">
                <RiDeleteBin2Line />
              </Button>
            </ButtonGroup>
          </ListGroup.Item>
          <ListGroup.Item>
            <img src={Image} height="50" alt="profile" />
            <span>Activity Name</span>
            <ButtonGroup>
              <Button variant="secondary">
                <RiPencilLine />
              </Button>
              <Button variant="success">
                <RiUserAddLine />
              </Button>
              <Button variant="danger">
                <RiDeleteBin2Line />
              </Button>
            </ButtonGroup>
          </ListGroup.Item>
          <ListGroup.Item>
            <img src={Image} height="50" alt="profile" />
            <span>Activity Name</span>
            <ButtonGroup>
              <Button variant="secondary">
                <RiPencilLine />
              </Button>
              <Button variant="success">
                <RiUserAddLine />
              </Button>
              <Button variant="danger">
                <RiDeleteBin2Line />
              </Button>
            </ButtonGroup>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Appointments;
