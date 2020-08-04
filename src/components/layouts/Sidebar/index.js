import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

import useAuth from '~/contexts/auth';

import {
  Container,
  Content,
  AvatarContainer,
  Avatar,
  AvatarImage,
  AvatarName,
  AvatarProfile,
  Menu,
  Item,
} from './styles';

const Sidebar = ({ open, routes, handleClose }) => {
  const location = useLocation();
  const { signOut, user } = useAuth();

  const isActive = (route) => {
    return location.pathname.includes(route.path);
  };

  return (
    <Container open={open}>
      <Content>
        <AvatarContainer>
          <Avatar>
            {user.imageUrl && <AvatarImage src={user.imageUrl} />}
          </Avatar>
          <AvatarName>{user.name}</AvatarName>
          <AvatarProfile>{user.profile?.name}</AvatarProfile>
        </AvatarContainer>
        <Menu>
          {routes.map((route) => (
            <Item
              key={route.path}
              active={isActive(route)}
              onClick={handleClose}
            >
              <Link to={route.path}>
                <route.Icon size={24} />
                {route.title}
              </Link>
            </Item>
          ))}
          <Item onClick={signOut}>
            <div>
              <FiLogOut size="24" />
              Sign-Out
            </div>
          </Item>
        </Menu>
      </Content>
    </Container>
  );
};

export default Sidebar;
