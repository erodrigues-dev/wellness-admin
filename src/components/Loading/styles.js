import styled, { keyframes } from 'styled-components';

const slideAnimation = keyframes`
    0% {
      transform: translate(12px, 80px) scale(0);
    }
    25% {
      transform: translate(12px, 80px) scale(0);
    }
    50% {
      transform: translate(12px, 80px) scale(1);
    }
    75% {
      transform: translate(80px, 80px) scale(1);
    }
    100% {
      transform: translate(148px, 80px) scale(1);
    }
`;

const displayAnimation = keyframes`
  0% {
    transform: translate(148px, 80px) scale(1);
  }
  100% {
    transform: translate(148px, 80px) scale(0);
  }
`;

const colorAnimation = keyframes`
0% {
      background: #294651;
    }
    25% {
      background: #9ce81a;
    }
    50% {
      background: #42c5be;
    }
    75% {
      background: #b0d04c;
    }
    100% {
      background: #294651;
    }
    `;

export const Container = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-100px, -100px);
  z-index: 1000;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
`;

export const Ellipsis = styled.div`
  box-sizing: content-box;
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate(80px, 80px) scale(1);
  background: #294651;
  animation: ${slideAnimation} 1.7241379310344827s infinite
    cubic-bezier(0, 0.5, 0.5, 1);

  &:nth-child(1) {
    background: #b0d04c;
    transform: translate(148px, 80px) scale(1);
    animation: ${displayAnimation} 0.43103448275862066s infinite
        cubic-bezier(0, 0.5, 0.5, 1),
      ${colorAnimation} 1.7241379310344827s infinite step-start;
  }

  &:nth-child(2) {
    animation-delay: -0.43103448275862066s;
    background: #294651;
  }

  &:nth-child(3) {
    animation-delay: -0.8620689655172413s;
    background: #b0d04c;
  }
  &:nth-child(4) {
    animation-delay: -1.2931034482758619s;
    background: #42c5be;
  }
  &:nth-child(5) {
    animation-delay: -1.7241379310344827s;
    background: #9ce81a;
  }
`;
