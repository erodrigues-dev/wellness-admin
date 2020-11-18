import React, { useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiBankCard2Fill,
} from 'react-icons/ri';

import { Container, CardItem } from './style';

const MenuItem = ({ text, selected }) => {
  return (
    // <CardItem className={`menu-item ${selected ? 'active' : ''}`}>
    <CardItem selected={selected}>
      <RiBankCard2Fill />
      {text}
    </CardItem>
  );
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
  list.map((el) => {
    const { name } = el;

    return <MenuItem text={name} key={name} selected={selected} />;
  });

const list = [
  { name: 'New' },
  { name: '1112' },
  { name: '1113' },
  { name: '1114' },
];

const CardSelection = () => {
  const [selected] = useState('1111');
  const [menuItems] = useState(Menu(list, selected));

  return (
    <Container>
      {menuItems !== undefined && (
        <ScrollMenu
          data={menuItems}
          arrowLeft={<RiArrowLeftSLine />}
          arrowRight={<RiArrowRightSLine />}
          selected={selected}
        />
      )}
    </Container>
  );
};

export default CardSelection;
