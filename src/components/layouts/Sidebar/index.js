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

const Sidebar = ({ open, handleClose }) => {
  const location = useLocation();
  const { signOut, user, menu } = useAuth();

  const isActive = (path) => {
    return location.pathname.includes(path);
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
          {menu.map(({ path, title, Icon }) => (
            <Item key={path} active={isActive(path)} onClick={handleClose}>
              <Link to={path}>
                <Icon size={24} />
                {title}
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
