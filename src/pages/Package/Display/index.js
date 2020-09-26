import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Image } from 'react-bootstrap';
import { useHistory, useParams, Link } from 'react-router-dom';

import DisplayCheck from '~/components/DisplayCheck';
import DisplayInfo from '~/components/DisplayInfo';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import { formatToDisplay } from '~/helpers/date';
import { decimal } from '~/helpers/intl';
import service from '~/services/package';

import Activities from './Activities';

function DisplayComponent() {
  const { id } = useParams();
  const history = useHistory();
  const { sendNotification } = useNotification();
  const { hasPermission, FUNCTIONALITIES, ACTIONS } = useAuth();
  const [view, setView] = useState({});
  const hasEditPermission = hasPermission(
    FUNCTIONALITIES.PACKAGES,
    ACTIONS.UPDATE
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
      <Card.Title>Display Package</Card.Title>
      <hr />

      <Row>
        <DisplayInfo md="6" lg="3" label="Name" value={view.name} />
        <DisplayInfo
          md="6"
          lg="3"
          label="Price"
          value={decimal.format(view.price)}
        />
        <DisplayInfo
          md="6"
          lg="3"
          label="Expiration"
          value={formatToDisplay(view.expiration) || 'Never'}
        />
        <Col md="6" lg="3" className="mb-3">
          <p style={{ margin: 0 }}>
            <DisplayCheck checked={view.showInApp} /> Show in App
          </p>
          <p style={{ margin: 0 }}>
            <DisplayCheck checked={view.showInWeb} /> Show in Web
          </p>
        </Col>
      </Row>

      <Row>
        <DisplayInfo label="Description" value={view.description} />
        {view.imageUrl && (
          <Col lg="6">
            <p>Image</p>
            <Image
              style={{ maxWidth: 400, maxHeight: 400 }}
              src={view.imageUrl}
              rounded
            />
          </Col>
        )}
      </Row>

      <Row className="mt-2">
        <Col>
          <Activities list={view.activities || []} />
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="secondary" className="mr-2" onClick={handleCancel}>
            Cancel
          </Button>
          {hasEditPermission && (
            <Link to={`/packages/${id}`}>
              <Button>Edit</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default DisplayComponent;
