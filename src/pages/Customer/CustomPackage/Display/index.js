import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useHistory, useParams, Link } from 'react-router-dom';

import Avatar from '~/components/Avatar';
import DisplayInfo from '~/components/DisplayInfo';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import { formatToDisplay } from '~/helpers/date';
import { decimal } from '~/helpers/intl';
import service from '~/services/custom-package';

import Activities from './Activities';

function DisplayComponent() {
  const history = useHistory();
  const { id, packageId } = useParams();
  const { sendNotification } = useNotification();
  const { hasPermission, FUNCTIONALITIES, ACTIONS } = useAuth();
  const [customer, setCustomer] = useState(null);
  const [view, setView] = useState({});

  const hasEditPermission = hasPermission(
    FUNCTIONALITIES.PACKAGES,
    ACTIONS.UPDATE
  );

  useEffect(() => {
    if (id && packageId) {
      service
        .get(id, packageId)
        .then(({ data }) => {
          setView(data);
          setCustomer(data.customer);
        })
        .catch(({ message }) => sendNotification(message, false));
    }

    // eslint-disable-next-line
  }, [id, packageId]);

  function handleCancel() {
    history.goBack();
  }

  return (
    <Card body>
      <Card.Title>Display Custom Package</Card.Title>
      <hr />

      <Avatar
        name={customer?.name}
        titleName="Customer"
        imageUrl={customer?.imageUrl}
      />

      <Row>
        <DisplayInfo label="Name" value={view.name} />
        <DisplayInfo label="Price" value={decimal.format(view.price)} />
        <DisplayInfo
          label="Expiration"
          value={formatToDisplay(view.expiration) || 'Never'}
        />
        <DisplayInfo lg="12" label="Description" value={view.description} />
      </Row>

      <Row>
        <Col>
          <Activities list={view.activities || []} />
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="secondary" className="mr-2" onClick={handleCancel}>
            Back
          </Button>
          {hasEditPermission && (
            <Link to={`../${packageId}`}>
              <Button>Edit</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default DisplayComponent;
