import React, { useState } from 'react';
import { FiLogOut, FiEdit, FiSettings } from 'react-icons/fi';
import { RiArrowUpSLine } from 'react-icons/ri';
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
  RetractButton,
  Subgroup,
} from './styles';

const Sidebar = ({ open, handleClose }) => {
  const { signOut, user, menu } = useAuth();
  const { pathname } = useLocation();
  const [retractSettings, setRetractSettings] = useState(true);
  const menuItems = menu.filter((item) => item.subgroup === undefined);
  const settingsItems = menu.filter((item) => item.subgroup === 'settings');

  const isActive = (path) => {
    return matchPath(pathname, { path });
  };

  function handleRetract() {
    setRetractSettings((prevState) => !prevState);
  }

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
              <FiEdit title="Edit" />
            </AvatarName>
          </Link>

          <AvatarProfile>{user.profile?.name}</AvatarProfile>
        </AvatarContainer>

        <Menu>
          {menuItems.map(({ path, title, Icon }) => (
            <Item key={path} active={isActive(path)} onClick={handleClose}>
              <Link to={path}>
                <Icon size={24} title={title} />
                {title}
              </Link>
            </Item>
          ))}

          <Item onClick={handleClose} className="settings">
            <div
              onClick={handleRetract}
              onKeyDown={() => {}}
              tabIndex={0}
              role="button"
            >
              <FiSettings size={24} title="Settings" />
              Settings
            </div>
            <RetractButton
              type="button"
              onClick={handleRetract}
              retract={retractSettings}
              className={retractSettings && 'retract'}
            >
              <RiArrowUpSLine color="white" stroke="0" size={24} />
            </RetractButton>
          </Item>

          <Subgroup retract={retractSettings}>
            <div className={retractSettings ? 'retract' : 'show'}>
              {settingsItems.map(({ path, title }) => (
                <Item
                  key={path}
                  active={isActive(path)}
                  subgroup="settings"
                  onClick={handleClose}
                >
                  <Link to={path}>{title}</Link>
                </Item>
              ))}
            </div>
          </Subgroup>

          <Item onClick={signOut} className="signout">
            <div>
              <FiLogOut size="24" title="Sign-out" />
              Sign-Out
            </div>
          </Item>
        </Menu>
      </Content>
    </Container>
  );
};

export default Sidebar;
