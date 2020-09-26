import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Image } from 'react-bootstrap';
import { useHistory, useParams, Link } from 'react-router-dom';

import DisplayInfo from '~/components/DisplayInfo';
import useNotification from '~/contexts/notification';
import { decimal } from '~/helpers/intl';
import * as service from '~/services/activity';

function DisplayComponent() {
  const { sendNotification } = useNotification();
  const { id } = useParams();
  const history = useHistory();
  const [view, setView] = useState({});

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
          label="Employee"
          value={view.employee?.name}
        />
        <DisplayInfo
          md="6"
          lg="8"
          label="Description"
          value={view.description}
        />
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
          <Link to={`/activities/${id}`}>
            <Button>Edit</Button>
          </Link>
        </Col>
      </Row>
    </Card>
  );
}

export default DisplayComponent;
