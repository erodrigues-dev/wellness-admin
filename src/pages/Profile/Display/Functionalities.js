import React from 'react';
import { Table } from 'react-bootstrap';

import DisplayCheck from '~/components/DisplayCheck';

function Functionalities({ values }) {
  const isChecked = (name, action) => {
    const functionality = values.find((x) => x.name === name);
    if (!functionality) return false;
    const hasAction = (functionality.actions & action) === action;
    return hasAction;
  };

  return (
    <>
      <Table hover striped className="mt-4">
        <thead>
          <tr>
            <th>Functionality</th>
            <th className="text-center">List</th>
            <th className="text-center">Create</th>
            <th className="text-center">Update</th>
          </tr>
        </thead>
        <tbody>
          {[].map((item) => (
            // {functionalities.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td className="text-center">
                <DisplayCheck checked={isChecked(item.id)} />
                {/* <DisplayCheck checked={isChecked(item.id, ACTIONS.LIST)} /> */}
              </td>
              <td className="text-center">
                <DisplayCheck checked={isChecked(item.id)} />
                {/* <DisplayCheck checked={isChecked(item.id, ACTIONS.CREATE)} /> */}
              </td>
              <td className="text-center">
                <DisplayCheck checked={isChecked(item.id)} />
                {/* <DisplayCheck checked={isChecked(item.id, ACTIONS.UPDATE)} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Functionalities;
