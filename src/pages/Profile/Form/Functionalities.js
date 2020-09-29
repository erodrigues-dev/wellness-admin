import React from 'react';
import { Form, Table } from 'react-bootstrap';

function Functionalities({ list, formik }) {
  function handleCheck(name, action, checked) {
    const funcs = formik.values.functionalities;
    const func = funcs.find((x) => x.name === name) || { name, actions: 0 };
    func.actions = checked ? func.actions + action : func.actions - action;
    const newFunctionalities = [...funcs.filter((x) => x.name !== name)];
    if (func.actions > 0) newFunctionalities.push(func);

    formik.setTouched({
      ...formik.touched,
      functionalities: true,
    });

    formik.setValues({
      ...formik.values,
      functionalities: newFunctionalities,
    });
  }

  function isChecked(name, action) {
    const functionality = formik.values.functionalities.find(
      (x) => x.name === name
    );
    if (!functionality) return false;

    const hasAction = (functionality.actions & action) === action;

    return hasAction;
  }

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
          {list.map((functionality) => (
            <tr key={functionality.id}>
              <td>{functionality.name}</td>
              <td className="text-center">
                <Form.Check
                  custom
                  label=" "
                  id={`list-${functionality.id}`}
                  checked={isChecked(functionality.id, 1)}
                  onChange={(e) => {
                    handleCheck(functionality.id, 1, e.target.checked);
                  }}
                />
              </td>
              <td className="text-center">
                <Form.Check
                  custom
                  label=" "
                  id={`create-${functionality.id}`}
                  checked={isChecked(functionality.id, 2)}
                  onChange={(e) => {
                    handleCheck(functionality.id, 2, e.target.checked);
                  }}
                />
              </td>
              <td className="text-center">
                <Form.Check
                  custom
                  label=" "
                  id={`update-${functionality.id}`}
                  checked={isChecked(functionality.id, 4)}
                  onChange={(e) => {
                    handleCheck(functionality.id, 4, e.target.checked);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className="text-error">
        {formik.touched.functionalities && formik.errors.functionalities}
      </p>
    </>
  );
}

export default Functionalities;
