import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  flex: 1;

  .k-scheduler {
    width: ${(props) => props.contentWidth}px;
  }

  .k-scheduler-toolbar span.k-datepicker {
    width: auto;
  }

  // set fixed times column on scroll horizontal
  .k-scheduler .k-scheduler-day-view .k-side-cell {
    position: sticky;
    left: 0;
    z-index: 2;
    background: #fff;
  }

  // set min width for columns
  .k-scheduler-head,
  .k-scheduler-body {
    min-width: ${(props) => props.schedulerWidth}px;
  }

  // hide allday slot and date slot
  .k-scheduler-head
    .k-scheduler-group:nth-child(1)
    .k-scheduler-row:nth-child(2),
  .k-scheduler-head .k-scheduler-group:nth-child(2) {
    display: none;
  }
`;
