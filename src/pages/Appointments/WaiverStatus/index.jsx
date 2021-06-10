import React, { useEffect, useState } from 'react';
import {
  FormGroup,
  FormLabel,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { FiEye } from 'react-icons/fi';
import { MdFingerprint } from 'react-icons/md';

import { CustomerWaiverDetail } from '~/pages/CustomerWaiver/Detail';
import { CustomerWaiverSign } from '~/pages/CustomerWaiver/Sign';
import service from '~/services/customerWaiver';

export const WaiverStatus = ({ customerId, activityId }) => {
  const [detail, setDetail] = useState(null);
  const [modal, setModal] = useState({});

  const signed = Boolean(detail?.signedAt);

  const handleCloseModal = () => setModal({});

  const StatusButton = () => {
    // TODO onClick devera adicionar a waiver na conta do usuario
    // antes de chamar o modal de SIGN

    const title = signed ? 'View detail' : 'Sign waiver';
    const variant = signed ? 'info' : 'secondary';
    const action = signed ? 'detail' : 'sign';
    return (
      <Button
        title={title}
        variant={variant}
        style={{
          borderRadius: '0 4px 4px 0',
        }}
        onClick={() => setModal({ action })}
      >
        {signed ? <FiEye color="#fff" /> : <MdFingerprint color="#fff" />}
      </Button>
    );
  };

  useEffect(() => {
    if (!customerId || !activityId) {
      setDetail(null);
      return;
    }

    service
      .getByActivity(customerId, activityId)
      .then(({ data }) => setDetail(data))
      .catch();
  }, [customerId, activityId]);

  if (!detail) return null;

  return (
    <>
      <FormGroup>
        <FormLabel>Waiver {modal.action}</FormLabel>
        <InputGroup>
          <FormControl
            readOnly
            defaultValue={detail.title}
            isInvalid={!signed}
            isValid={signed}
          />
          <InputGroup.Append>
            <StatusButton />
          </InputGroup.Append>
          <FormControl.Feedback type="invalid">
            Signin required
          </FormControl.Feedback>
        </InputGroup>
      </FormGroup>

      {modal.action === 'detail' && (
        <CustomerWaiverDetail
          customerId={customerId}
          waiverId={detail.id}
          onClose={handleCloseModal}
        />
      )}

      {modal.action === 'sign' && (
        <CustomerWaiverSign
          customerId={customerId}
          waiverId={detail.id}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
