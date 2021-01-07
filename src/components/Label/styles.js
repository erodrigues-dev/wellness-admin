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

export const Status = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: white;
  background-color: ${(props) => getStatusColors(props.status)};
  border-radius: 5px;
  padding: 5px 10px;
  width: 100px;
  text-align: center;
`;
