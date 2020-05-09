import React from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import useAuth from '~/contexts/auth';

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

const Sidebar = ({ open, routes }) => {
  const { signOut } = useAuth();
  return (
    <Container open={open}>
      <Top>
        <Link to="/">
          <Logo src="/images/logo-1.png" />
        </Link>
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
          {routes.map((route) => (
            <Item key={route.path}>
              <Link to={route.path}>
                <route.Icon size={24} />
                {route.title}
              </Link>
            </Item>
          ))}
          <Item onClick={signOut}>
            <FiLogOut size="24" />
            Sign-Out
          </Item>
          {/* <Item className="active">
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
          <Item onClick={signOut}>
            <FiLogOut size="24" />
            Sign-Out
          </Item> */}
        </Menu>
      </Content>
    </Container>
  );
};

export default Sidebar;
