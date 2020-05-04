import React from 'react';
import {
  FiClock,
  FiUser,
  FiUsers,
  FiActivity,
  FiBriefcase,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';

import {
  Container,
  Top,
  Logo,
  Content,
  AvatarContainer,
  Avatar,
  AvatarName,
  AvatarProfile,
  Menu,
  Item,
} from './styles';

const Sidebar = ({ open }) => (
  <Container open={open}>
    <Top>
      <Logo src="/images/logo-1.png" />
    </Top>
    <Content>
      <AvatarContainer>
        <Avatar>
          <FiUser size="56" />
        </Avatar>
        <AvatarName>John Doe</AvatarName>
        <AvatarProfile>Administrator</AvatarProfile>
      </AvatarContainer>
      <Menu>
        <Item className="active">
          <FiClock size="24" />
          Schedules
        </Item>
        <Item>
          <FiBriefcase size="24" />
          Customers
        </Item>
        <Item>
          <FiUsers size="24" />
          Employees
        </Item>
        <Item>
          <FiActivity size="24" />
          Activities
        </Item>
        <Item>
          <FiShoppingBag size="24" />
          Packages
        </Item>
        <Item>
          <FiSettings size="24" />
          Profiles
        </Item>
        <Item>
          <FiLogOut size="24" />
          Sign-Out
        </Item>
      </Menu>
    </Content>
  </Container>
);

export default Sidebar;
