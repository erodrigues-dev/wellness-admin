import React from 'react';
import { Button } from 'react-bootstrap';
import { FiEye, FiTrash } from 'react-icons/fi';
import { MdFingerprint } from 'react-icons/md';

import styled from 'styled-components';

import { formatToDateTime } from '~/helpers/date';

export const List = ({ list }) => {
  return (
    <Container>
      {list.map((item) => (
        <li key={item.id}>
          <div>
            <h2>{item.waiver.title}</h2>
            {item.signedAt ? (
              <p>Signed at {formatToDateTime(new Date(item.signedAt))}</p>
            ) : (
              <p>Not signed yet.</p>
            )}
          </div>
          <div>
            {item.signedAt ? (
              <Button variant="info" className="mr-2" title="View detail">
                <FiEye color="#fff" />
              </Button>
            ) : (
              <Button variant="secondary" className="mr-2" title="Sign Waiver">
                <MdFingerprint color="#fff" />
              </Button>
            )}
            <Button variant="danger" title="Remove waiver">
              <FiTrash />
            </Button>
          </div>
        </li>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  list-style: none;

  > li {
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }

    > div:first-child {
      flex: 1;
      h2 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
      }
    }
  }
`;
