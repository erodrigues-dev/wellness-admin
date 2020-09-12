import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  z-index: 2;
  min-width: 320px;

  .react-calendar {
    * {
      outline: none;
    }

    border-color: #ced4da;
    margin-top: 2px;
    border-radius: 4px;
    background: #efefef;
    padding: 12px;
    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.3);

    .react-calendar__navigation {
      margin-bottom: 8px;
    }

    .react-calendar__navigation__arrow {
      width: 24px;
      height: 24px;
    }

    .react-calendar__month-view__weekdays__weekday {
      text-align: center;
    }

    .react-calendar__month-view__weekdays__weekday abbr {
      text-decoration: none;
      cursor: default;
    }

    .react-calendar__tile:disabled {
      color: var(--gray);
    }

    .react-calendar__tile--now {
      background: var(--secondary);
      color: #fff;
    }
    .react-calendar__tile--active,
    .react-calendar__tile--hasActive {
      background: var(--primary);
      color: #fff;
    }

    .react-calendar__month-view__days__day--weekend {
      color: var(--danger);
    }

    .react-calendar__month-view__days__day {
      height: 32px;
    }

    .react-calendar__century-view__decades__decade,
    .react-calendar__decade-view__years__year,
    .react-calendar__year-view__months__month {
      height: 46px;
    }
  }
`;
