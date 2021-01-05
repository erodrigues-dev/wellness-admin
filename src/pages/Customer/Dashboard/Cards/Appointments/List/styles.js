import styled from 'styled-components';

function getStatusColors(status) {
  const colors = {
    scheduled: '#42c5be',
    arrived: '#e0c200',
    completed: '#b0d04c',
    canceled: '#C82333',
  };

  return colors[status];
}

export const Container = styled.ul`
  li {
    list-style: none;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    padding: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background 100ms;
    display: flex;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    button {
      background-color: transparent;
      border: none;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .items {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h2 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .value {
        font-size: 0.9rem;
      }
    }
  }
`;

export const DateSpan = styled.span`
  color: #777;
  margin-right: 5px;
  font-size: 0.9rem;
`;

export const Status = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: white;
  background-color: ${(props) => getStatusColors(props.status)};
  border-radius: 5px;
  padding: 5px 0;
  width: 80px;
  text-align: center;
`;
