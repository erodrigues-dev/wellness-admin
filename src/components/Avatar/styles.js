import styled from 'styled-components';

import avatarImg from '~/assets/images/avatar.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  width: ${(props) => props.size ?? '80px'};
  height: ${(props) => props.size ?? '80px'};
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2) url(${avatarImg});
  background-size: contain;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NameWrapper = styled.div`
  /* margin-left: 16px; */
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Name = styled.span``;

export const TitleName = styled.span`
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
`;
