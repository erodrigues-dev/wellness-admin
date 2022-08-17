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

export const AttendeesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  & > div {
    h5 {
      margin-bottom: 0;
    }

    span {
      font-size: 0.9rem;
    }
  }
`;

export const AttendeesList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

export const AttendeesItem = styled.li`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  padding-right: 8px;

  &:last-child {
    border: none;
  }

  & > div {
    display: flex;
    align-items: center;
    column-gap: 8px;

    & > span {
      flex: 1;
    }

    & > div {
      margin-bottom: 0;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .buttons {
      display: flex;
      align-items: center;
      column-gap: 8px;
      margin-top: 12px;
      align-self: flex-end;
    }
  }

  .open-details {
    cursor: pointer;
    user-select: none;
  }
`;

export const EmptyAttendees = styled.i`
  display: block;
  padding: 12px;
  margin-top: 16px;
  text-align: center;
  color: #ccc;
`;
