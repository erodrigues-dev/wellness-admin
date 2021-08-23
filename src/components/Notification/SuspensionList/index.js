import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FiBell, FiX } from 'react-icons/fi';

import avatarDefaultImage from '~/assets/images/avatar.svg';
import { formatToList } from '~/helpers/date';

import {
  Container,
  Header,
  CloseButton,
  Buttons,
  List,
  Item,
  ReadStatus,
  EmptyList,
} from './styles';

export function NotificationSuspensionList({
  list,
  onToggleItem,
  onToggleAll,
  onClose,
}) {
  function getReadStatusTitle(read) {
    if (read) return 'Mark as unread';
    return 'Mark as read';
  }

  function getTextToMarkAll() {
    if (list.unreads > 0) return 'Mark all as read';
    return 'Mark all as unread';
  }

  return (
    <Container>
      <Header>
        <h1>Notifications</h1>
        <CloseButton onClick={onClose}>
          <FiX size={22} />
        </CloseButton>
      </Header>
      <Buttons>
        <button type="button" onClick={onToggleAll}>
          {getTextToMarkAll()}
        </button>
      </Buttons>
      <Scrollbars autoHeightMax="400px" autoHeight>
        <List className="list">
          {list.rows.map((item) => (
            <Item className="item" key={item.id}>
              <div className="avatar">
                <img
                  src={item.createdBy.avatar || avatarDefaultImage}
                  alt="avatar"
                />
              </div>
              <div className="content">
                <p>
                  {item.createdBy.name} {formatToList(item.createdAt)}
                </p>
                <h2>{item.title}</h2>
              </div>
              <ReadStatus
                onClick={() => onToggleItem(item)}
                title={getReadStatusTitle(item.read)}
                read={item.read}
              />
            </Item>
          ))}
          {list.total === 0 && (
            <EmptyList>
              <p>No unread notifications</p>
              <FiBell size={32} />
            </EmptyList>
          )}
        </List>
      </Scrollbars>
    </Container>
  );
}
