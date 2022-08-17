import styled from 'styled-components';

export const Header = styled.section`
  h2 {
    font-size: 1.2em;
    margin-bottom: 1em;
  }

  p {
    margin: 0;
  }
`;

export const Contact = styled.section`
  font-size: 0.9em;
  margin-top: 1em;

  ul {
    list-style: none;
  }

  li {
    padding-top: 0.6em;
    padding-bottom: 0.6em;
    border-bottom: 1px solid #999;

    display: flex;
    justify-content: space-between;
  }
`;
