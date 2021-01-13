/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useHistory, useParams, Link } from 'react-router-dom';

import DisplayInfo from '~/components/DisplayInfo';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useNotification from '~/contexts/notification';
import * as service from '~/services/customer';

import Avatar from '../../../components/Avatar';
import useAuth from '../../../contexts/auth';

function DisplayComponent() {
  const { id } = useParams();
  const history = useHistory();
  const { hasPermission } = useAuth();
  const { sendNotification } = useNotification();
  const [view, setView] = useState({});
  const hasEditPermission = hasPermission(FUNCTIONALITIES.customers.update);

  useEffect(() => {
    if (!id) return;
    service
      .get(id)
      .then(({ data }) => {
        setView(data);
      })
      .catch(({ message }) => sendNotification(message, false));

    // eslint-disable-next-line
  }, [id]);

  function handleCancel() {
    history.goBack();
  }

  return (
    <Card body>
      <Card.Title>Display Customer</Card.Title>
      <hr />

      <Row>
        <Col>
          <Avatar
            name={view.name}
            titleName="Customer"
            imageUrl={view.imageUrl}
          />
        </Col>
        <DisplayInfo label="Email" value={view.email} />
      </Row>

      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="secondary" className="mr-2" onClick={handleCancel}>
            Back
          </Button>
          {hasEditPermission && (
            <Link to={`/customers/${id}`}>
              <Button>Edit</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default DisplayComponent;
