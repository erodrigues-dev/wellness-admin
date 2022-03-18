import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

export const DetailsInfo = styled.div`
  display: flex;
  flex-direction: column;

  .date {
    color: #aaa;
  }

  .title {
    font-size: 1.4rem;
  }

  .slots {
  }
`;

export const AttendeesContainer = styled.div``;

export const AttendeesList = styled.ul``;

export const AttendeesItem = styled.li``;

export const EmptyAttendees = styled.i`
  display: block;
  padding: 12px;
  text-align: center;
  color: #ccc;
`;
