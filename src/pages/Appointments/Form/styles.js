import styled from 'styled-components';

export const Container = styled.div`
  .react-calendar__tile {
    &:not(:disabled) {
      background-color: #f7f7f7;

      abbr {
        display: inline-block;
        background-color: #42c5be;
        border-radius: 100%;
        width: 25px;
        color: white;
        transition: background 100ms;
      }

      &:hover {
        abbr {
          background-color: #294651;
        }
      }
    }
  }

  .react-calendar__tile--active {
    &:not(:disabled) {
      abbr {
        background-color: #b0d04c;
      }
    }
  }
`;
