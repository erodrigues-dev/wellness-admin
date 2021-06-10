import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import dataURLtoBlob from 'dataurl-to-blob';
import styled from 'styled-components';

import Loading from '~/components/Loading';
import Modal from '~/components/Modal';
import { formatToDateTime } from '~/helpers/date';
import service from '~/services/customerWaiver';

import { Draw } from '../../../components/Draw';

const MIN_SIGN_LENGTH = 8_000;

export const CustomerWaiverSign = ({
  customerId,
  waiverId,
  onClose,
  onRefresh = () => {},
}) => {
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState();
  const [drawDataUrl, setDrawDataUrl] = useState(null);
  const [isAgree, setIsAgree] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const formatText = (text) => text.replaceAll('\n', '<br/>');
  const isValid = useMemo(
    () => Boolean(drawDataUrl?.length >= MIN_SIGN_LENGTH && isAgree),
    [drawDataUrl, isAgree]
  );

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await service.sign({
        customerId,
        waiverId,
        signImage: dataURLtoBlob(drawDataUrl),
      });
      onClose();
      onRefresh();
    } catch (error) {
      toast.error('An unexpected error has occurred');
      setIsSaving(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    service
      .get(customerId, waiverId)
      .then(({ data }) => setModel(data))
      .catch(() => {
        toast.error('Unexpected error.');
        onClose();
      })
      .finally(() => setLoading(false));
  }, [customerId, onClose, waiverId]);

  if (loading) return <Loading />;
  if (!model) return null;

  return (
    <Modal title="Waiver detail" setClose={onClose}>
      <Container>
        <h2>{model.waiver.title}</h2>
        <div className="text-container">
          <p
            dangerouslySetInnerHTML={{
              __html: formatText(model.waiver.text),
            }}
          />
        </div>

        <div className="agree">
          <label>
            <input
              type="checkbox"
              checked={isAgree}
              onChange={(e) => setIsAgree(e.target.checked)}
            />
            I have read and accept the terms of waiver.
          </label>
        </div>

        <Draw label="Assign here" onChange={setDrawDataUrl} />

        <div className="info">
          <div>
            <strong>Customer</strong>
            <p>{model.customer.name}</p>
          </div>
          <div>
            <strong>Created At</strong>
            <p>{formatToDateTime(new Date(model.createdAt))}</p>
          </div>
        </div>

        <div className="buttons">
          <Button disabled={isSaving} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            disabled={!isValid || isSaving}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  padding: 16px;

  h2 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0;
    margin-bottom: 1rem;
  }

  .text-container {
    max-height: 360px;
    overflow: auto;
    margin-bottom: 1rem;

    p {
      font-size: 0.9rem;
      line-height: 1rem;
    }
  }

  .agree {
    input {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }

  .info {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    p {
      white-space: nowrap;
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;
