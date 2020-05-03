import React from 'react';
import {
  FiUsers,
  FiActivity,
  FiCheckSquare,
  FiBriefcase,
} from 'react-icons/fi';

import {
  Container,
  Top,
  Logo,
  Title,
  Content,
  Itens,
  Item,
  Icon,
} from './styles';

const Sidebar = () => (
  <Container>
    <Top>
      <Logo src="/images/logo-simple.png" />
      <Title>Elite wellness</Title>
    </Top>
    <Content>
      <Itens>
        <Item className="active">
          <Icon>
            <FiUsers size="22" />
          </Icon>
          Employees
        </Item>
        <Item>
          <Icon>
            <FiBriefcase size="22" />
          </Icon>
          Customers
        </Item>
        <Item>
          <Icon>
            <FiActivity size="22" />
          </Icon>
          Activities
        </Item>
        <Item>
          <Icon>
            <FiCheckSquare size="22" />
          </Icon>
          Profiles
        </Item>
      </Itens>
    </Content>
  </Container>
);

export default Sidebar;
