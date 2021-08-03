import React from 'react';
import { RiBankCardLine, RiMoneyDollarBoxLine } from 'react-icons/ri';

import styled from 'styled-components';

import { currency } from '~/helpers/intl';

import { ListContainer, ListItem } from '../../styles';

const List = ({ list, setOrder, setOpenDetails }) => {
  function handleClickInfo(item) {
    setOrder(item);
    setOpenDetails(true);
  }

  return (
    <ListContainer>
      {list?.map((item) => (
        <ListItem key={item.id} onClick={() => handleClickInfo(item)}>
          <Item>
            <Detail>{item.name}</Detail>
            <Labels>
              <Label color="info" title={item.paymentType}>
                {item?.paymentType === 'money' ? (
                  <RiMoneyDollarBoxLine title="Money" />
                ) : (
                  <RiBankCardLine title="Credit Card" />
                )}
              </Label>

              <Label color="primary">
                <span>{currency.format(item.total)}</span>
              </Label>
            </Labels>
          </Item>
        </ListItem>
      ))}
    </ListContainer>
  );
};

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 42px;
  cursor: pointer;
`;
const Detail = styled.div`
  font-weight: 600;
  flex: 1;
`;
const Labels = styled.div`
  display: flex;
  gap: 4px;
`;
const Label = styled.div`
  padding: 4px;
  background: ${(props) => `var(--${props.color})`};
  border-radius: 4px;
  color: #fff;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default List;
