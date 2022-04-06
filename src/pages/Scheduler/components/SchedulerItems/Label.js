import React from 'react';

import styled from 'styled-components';

import { useSchedulerContext } from '../../data/SchedulerContext';

export const Label = ({ calendarLabelId }) => {
  const { labels } = useSchedulerContext();
  const label = labels?.find((x) => x.id === calendarLabelId);

  return <LabelContainer title={label?.name} color={label?.color} />;
};

const LabelContainer = styled.div`
  margin: 12px 8px 8px 8px;
  height: 12px;
  min-width: 24px;
  max-width: 128px;
  width: 25%;
  border-radius: 25px;
  background-color: ${(props) => props.color};
  border: 1px solid rgba(0, 0, 0, 0.2);
`;
