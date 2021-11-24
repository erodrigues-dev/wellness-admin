import styled from 'styled-components';

export const Status = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: white;
  background-color: ${(props) => props.color[props.status]};
  border-radius: 5px;
  padding: 5px 10px;
  width: 100px;
  text-align: center;
`;
