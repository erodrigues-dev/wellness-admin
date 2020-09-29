import React from 'react';
import { FiLogOut, FiEdit } from 'react-icons/fi';
import { Link, matchPath, useLocation } from 'react-router-dom';

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
  const { signOut, user, menu } = useAuth();
  const { pathname } = useLocation();

  const isActive = (path) => {
    return matchPath(pathname, { path });
  };

  return (
    <Container open={open}>
      <Content>
        <AvatarContainer>
          <Link to="/account">
            <Avatar>
              {user.imageUrl && <AvatarImage src={user.imageUrl} />}
            </Avatar>
          </Link>
          <Link to="/account">
            <AvatarName>
              <span>{user.name}</span>
              <FiEdit />
            </AvatarName>
          </Link>

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
