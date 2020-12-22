import styled from 'styled-components';

export const Container = styled.div`
  .react-calendar__month-view__days__day {
    &:not(:disabled) {
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

  .react-calendar .react-calendar__tile--active,
  .kIzxMT .react-calendar .react-calendar__tile--hasActive {
    background-color: unset;
  }
`;
