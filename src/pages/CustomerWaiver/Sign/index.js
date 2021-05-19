import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import styled from 'styled-components';

import Loading from '~/components/Loading';
import Modal from '~/components/Modal';
import { formatToDateTime } from '~/helpers/date';
import service from '~/services/customerWaiver';

export const CustomerWaiverSign = ({ customerId, waiverId, onClose }) => {
  const [model, setModel] = useState();

  const formatText = (text) => text.replaceAll('\n', '<br/>');

  useEffect(() => {
    service.get(customerId, waiverId).then(({ data }) => setModel(data));
  }, [customerId, waiverId]);

  if (!model) return <Loading />;

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

        <div className="sign">
          <canvas />
        </div>

        <div className="status">
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
          <Button>Cancel</Button>
          <Button variant="secondary">Save</Button>
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

  .sign {
    height: 140px;
    margin-bottom: 1rem;
    border: 1px solid #666;
    border-radius: 4px;
  }

  .status {
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
