import React, { useEffect } from 'react';

import { DropDownList } from '@progress/kendo-react-dropdowns';

import { statusData } from '../consts';

export function StatusEditor(props) {
  // if (!props.value) props.onChange({ value: statusData[0] });

  useEffect(() => {
    if (!props.value) props.onChange({ value: statusData[0] });
  }, [props]);

  return <DropDownList {...props} data={statusData} />;
}
