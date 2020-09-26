import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useHistory, useParams, Link } from 'react-router-dom';

import Avatar from '~/components/Avatar';
import DisplayInfo from '~/components/DisplayInfo';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import * as employeeService from '~/services/employee';

function DisplayComponent() {
  const { id } = useParams();
  const history = useHistory();
  const { sendNotification } = useNotification();
  const { hasPermission, FUNCTIONALITIES, ACTIONS } = useAuth();
  const [view, setView] = useState({});
  const hasEditPermission = hasPermission(
    FUNCTIONALITIES.EMPLOYEES,
    ACTIONS.UPDATE
  );

  useEffect(() => {
    if (!id) return;
    employeeService
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
      <Card.Title>Display Employee</Card.Title>
      <hr />

      <Row>
        <Col>
          <Avatar
            name={view.name}
            titleName={view.profile?.name}
            imageUrl={view.imageUrl}
          />
        </Col>
      </Row>

      <Row>
        <DisplayInfo md="6" lg="4" label="Name" value={view.name} />
        <DisplayInfo md="6" lg="4" label="Email" value={view.email} />
        <DisplayInfo md="6" lg="4" label="Profile" value={view.profile?.name} />
        <DisplayInfo md="6" lg="4" label="Specialty" value={view.specialty} />
      </Row>

      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="secondary" className="mr-2" onClick={handleCancel}>
            Cancel
          </Button>
          {hasEditPermission && (
            <Link to={`/employees/${id}`}>
              <Button>Edit</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default DisplayComponent;
