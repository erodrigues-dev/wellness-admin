import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Image } from 'react-bootstrap';
import { useHistory, useParams, Link } from 'react-router-dom';

import DisplayCheck from '~/components/DisplayCheck';
import DisplayInfo from '~/components/DisplayInfo';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useNotification from '~/contexts/notification';
import { decimal } from '~/helpers/intl';
import * as service from '~/services/activity';

import useAuth from '../../../contexts/auth';

function DisplayComponent() {
  const { id } = useParams();
  const history = useHistory();
  const { hasPermission } = useAuth();
  const { sendNotification } = useNotification();
  const [view, setView] = useState({});

  const hasEditPermission = hasPermission(FUNCTIONALITIES.activities.update);

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
      <Card.Title>View Activity</Card.Title>
      <hr />

      <Row>
        <DisplayInfo md="12" lg="4" label="Name" value={view.name} />
        <DisplayInfo
          md="6"
          lg="4"
          label="Price"
          value={decimal.format(view.price)}
        />
        <DisplayInfo md="6" lg="4" label="Duration" value={view.duration} />
      </Row>

      <Row>
        <DisplayInfo
          md="6"
          lg="4"
          label="Category"
          value={view.category?.name}
        />
        <DisplayInfo
          md="6"
          lg="4"
          label="Employee"
          value={view.employee?.name}
        />
        <DisplayInfo
          md="6"
          lg="4"
          label="Max Number of People"
          value={view.maxPeople || '-'}
        />
      </Row>

      <Row>
        <DisplayInfo
          md="6"
          lg="8"
          label="Description"
          value={view.description}
        />
        <Col md="6" lg="4" className="mb-3">
          <p style={{ margin: 0 }}>
            <DisplayCheck checked={view.showInApp} /> Show in App
          </p>
          <p style={{ margin: 0 }}>
            <DisplayCheck checked={view.showInWeb} /> Show in Web
          </p>
        </Col>
      </Row>

      {view.imageUrl && (
        <Row>
          <Col>
            <p style={{ marginBottom: 4 }}>Image</p>
            <Image
              style={{ maxWidth: 400 }}
              src={view.imageUrl}
              alt="cover"
              rounded
            />
          </Col>
        </Row>
      )}

      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="secondary" className="mr-2" onClick={handleCancel}>
            Back
          </Button>
          {hasEditPermission && (
            <Link to={`/activities/${id}`}>
              <Button>Edit</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default DisplayComponent;
