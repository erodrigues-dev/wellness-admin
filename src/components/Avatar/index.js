import React from 'react';

import {
  Container,
  ImageWrapper,
  Image,
  NameWrapper,
  Name,
  TitleName,
} from './styles';

const Avatar = ({ name, titleName, imageUrl }) => (
  <Container>
    <ImageWrapper>{imageUrl && <Image src={imageUrl} />}</ImageWrapper>
    <NameWrapper>
      <Name>{name}</Name>
      <TitleName>{titleName}</TitleName>
    </NameWrapper>
  </Container>
);

export default Avatar;
