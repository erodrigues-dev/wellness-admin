import React, { useCallback, useEffect, useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiBankCard2Fill,
} from 'react-icons/ri';

import useNotification from '~/contexts/notification';
import * as checkoutService from '~/services/checkout';

import { Container, CardItem } from './style';

const MenuItem = ({ text, selected }) => {
  return (
    <CardItem selected={selected}>
      <RiBankCard2Fill />
      {text}
    </CardItem>
  );
};

export const Menu = (cards, selected) =>
  cards.map((card) => {
    return <MenuItem text={card.last_4} key={card.id} selected={selected} />;
  });

const CardSelection = ({ customerId }) => {
  const { sendNotification } = useNotification();
  const [selected, setSelected] = useState('');
  const [menuItems, setMenuItems] = useState();
  const [cards, setCards] = useState([]);

  const listCards = useCallback(async () => {
    if (customerId === undefined) return;

    try {
      const { data } = await checkoutService.listCards(customerId);

      setCards(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [customerId, sendNotification]);

  useEffect(() => {
    listCards();
  }, [listCards]);

  useEffect(() => {
    if (cards.length > 0) {
      setMenuItems(Menu(cards, selected));
    }
  }, [cards, selected]);

  function onSelect(key) {
    setSelected(key);
  }

  return (
    <Container>
      {menuItems !== undefined && (
        <ScrollMenu
          data={menuItems}
          arrowLeft={<RiArrowLeftSLine />}
          arrowRight={<RiArrowRightSLine />}
          selected={selected}
          onSelect={onSelect}
        />
      )}
    </Container>
  );
};

export default CardSelection;
