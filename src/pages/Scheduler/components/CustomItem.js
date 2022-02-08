import React from 'react';

import { SchedulerItem } from '@progress/kendo-react-scheduler';

export function CustomItem(props) {
  const handleClick = () => {
    // console.log('click on item', props.dataItem);
  };

  return <SchedulerItem {...props} onClick={handleClick} />;
}
