import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url('/images/bg_blur.jpg');
  background-size: cover;
`;

export const Box = styled.div`
  background-color: #fff;
  width: 400px;
  padding: 48px 24px;
  border-radius: 4px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.6);
`;

export const Logo = styled.img`
  margin-top: -100px;
  margin-bottom: 24px;
`;
