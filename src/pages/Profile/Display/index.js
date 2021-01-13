import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useHistory, useParams, Link } from 'react-router-dom';

import DisplayInfo from '~/components/DisplayInfo';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import * as service from '~/services/profile';

import Functionalities from './Functionalities';

function FormComponent() {
  const { id } = useParams();
  const history = useHistory();
  const { sendNotification } = useNotification();
  const { hasPermission } = useAuth();
  const [view, setView] = useState({});
  const hasEditPermission = hasPermission(
    FUNCTIONALITIES.settings.profiles.update
  );

  useEffect(() => {
    if (!id) return;
    service
      .get(id)
      .then(({ data }) => setView(data))
      .catch(({ message }) => sendNotification(message, false));

    // eslint-disable-next-line
  }, [id]);

  function handleCancel() {
    history.goBack();
  }

  return (
    <Card body>
      <Card.Title>Display Profile</Card.Title>
      <hr />

      <Row>
        <DisplayInfo label="Name" value={view.name} />
        <DisplayInfo label="Description" value={view.description} />
      </Row>

      <Row>
        <Col>
          <Functionalities values={view.functionalities || []} />
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="secondary" className="mr-2" onClick={handleCancel}>
            Cancel
          </Button>
          {hasEditPermission && (
            <Link to={`/profiles/${id}`}>
              <Button>Edit</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default FormComponent;
