import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Button } from '@progress/kendo-react-buttons';
import { MultiSelect } from '@progress/kendo-react-dropdowns';

import { ListItem, MultiSelectFooterContainer } from './styles';

const labels = [
  {
    id: 1,
    name: 'teste',
    color: '#ccc',
  },
  {
    id: 2,
    name: 'teste2',
    color: '#ccc',
  },
  {
    id: 3,
    name: 'teste3',
    color: '#ccc',
  },
];

const MultiSelectFooter = () => (
  <MultiSelectFooterContainer>
    <Button type="button">Cancel</Button>
    <Button type="button" onClick={(e) => e.preventDefault()}>
      New Label
    </Button>
  </MultiSelectFooterContainer>
);

const itemRender = (li, itemProps) => {
  const { index } = itemProps;
  const itemChildren = (
    <ListItem>
      {li.props.children} {index}
    </ListItem>
  );

  return React.cloneElement(li, li.props, itemChildren);
};

export function LabelList() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      {/* <OutsideClick onOutsideClick={() => setIsOpened(false)}> */}
      <Form.Group>
        <Form.Label>Labels</Form.Label>
        <MultiSelect
          readOnly
          data={labels}
          dataItemKey="id"
          textField="name"
          footer={<MultiSelectFooter />}
          opened={isOpened}
          onOpen={() => setIsOpened(true)}
          itemRender={itemRender}
        />
        {/* {isValid || <Error>{error}</Error>} */}
      </Form.Group>
    </div>
  );
}
