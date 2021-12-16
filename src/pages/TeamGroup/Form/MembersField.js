import React, { useCallback, useState } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { Error } from '@progress/kendo-react-labels';

import autocomplete from '~/services/autocomplete';

export function MembersField({
  value,
  disabled,
  isValid,
  error,
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
}) {
  const [membersData, setMembersData] = useState({
    data: [],
    value: value || [],
    loading: false,
    timeout: null,
  });

  const handleChangeMembers = (ev) => {
    onChange(ev.value);
  };

  const handleFilterMembers = useCallback(
    ({ filter }) => {
      clearTimeout(membersData.timeout);
      const timeout = setTimeout(() => {
        autocomplete
          .customers(filter.value)
          .then(({ data }) => {
            setMembersData((state) => ({
              ...state,
              data,
              loading: false,
            }));
          })
          .catch(() => {
            toast.error('Unable to list members');
          });
      }, 500);

      setMembersData((state) => ({
        ...state,
        loading: true,
        data: [],
        timeout,
        filter: filter.value,
      }));
    },
    [membersData.timeout]
  );

  const handleFocus = () => {
    handleFilterMembers({ filter: { value: '' } });
    onFocus();
  };

  const handleBlur = () => {
    setMembersData((state) => ({ ...state, filter: '' }));
    onBlur();
  };

  return (
    <Form.Group>
      <Form.Label>Members</Form.Label>
      <MultiSelect
        textField="name"
        dataItemKey="id"
        data={membersData.data}
        loading={membersData.loading}
        value={value}
        filter={membersData.filter}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChangeMembers}
        onFilterChange={handleFilterMembers}
        popupSettings={{ className: 'z-index-in-modal' }}
        valid={isValid}
        disabled={disabled}
        filterable
      />
      {isValid || <Error>{error}</Error>}
    </Form.Group>
  );
}
