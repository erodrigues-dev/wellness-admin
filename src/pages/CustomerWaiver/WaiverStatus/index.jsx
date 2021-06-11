import React, { useCallback, useEffect, useState } from 'react';
import {
  FormGroup,
  FormLabel,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { FiEye } from 'react-icons/fi';
import { MdFingerprint } from 'react-icons/md';
import { toast } from 'react-toastify';

import { CustomerWaiverDetail } from '~/pages/CustomerWaiver/Detail';
import { CustomerWaiverSign } from '~/pages/CustomerWaiver/Sign';
import service from '~/services/customerWaiver';

export const CustomerWaiverStatus = ({
  customerId,
  activityId,
  onChange: setStatus = () => {},
}) => {
  const [detail, setDetail] = useState(null);
  const [modal, setModal] = useState({});

  const signed = Boolean(detail?.customerHasSign);

  const fetchDetail = useCallback(async () => {
    const { data } = await service.getByActivity(customerId, activityId);
    setDetail(data);
  }, [activityId, customerId]);

  const handleCloseModal = async () => {
    if (modal.action === 'sign') await fetchDetail();

    setModal({});
  };

  const addWaiverInCustomerAccount = async () => {
    if (detail.customerHasWaiver) return;

    try {
      await service.add(customerId, detail.id);
      setDetail({ ...detail, customerHasWaiver: true });
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAction = async (action) => {
    if (action === 'sign') {
      await addWaiverInCustomerAccount();
    }

    setModal({ action });
  };

  const StatusButton = () => {
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
        onClick={() => handleAction(action)}
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

    fetchDetail();
  }, [customerId, activityId, fetchDetail]);

  useEffect(() => {
    setStatus({
      hasWaiver: Boolean(detail),
      hasSign: Boolean(detail?.customerHasSign),
    });
  }, [detail, setStatus]);

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
            autoFocus
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
