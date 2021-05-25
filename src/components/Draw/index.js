import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import CanvasDraw from 'react-canvas-draw';
import { IoReload } from 'react-icons/io5';

import styled from 'styled-components';

export const Draw = ({ label, onChange, data }) => {
  const canvasDrawRef = useRef(null);

  const handleClear = () => {
    onChange(null);
    canvasDrawRef.current.clear();
  };

  if (onChange && data)
    throw new Error('Dont set "onChange" and "data" at same time');

  return (
    <Container>
      <strong>{label}</strong>
      <div className="canvas">
        <CanvasDraw
          ref={canvasDrawRef}
          onChange={(draw) => onChange(draw.getSaveData())}
          saveData={data}
          disabled={Boolean(data)}
          canvasWidth="100%"
          canvasHeight="100%"
          loadTimeOffset={1}
          brushRadius={2}
          lazyRadius={4}
          hideInterface
        />
      </div>
      <Button title="clear" variant="secondary" onClick={handleClear}>
        <IoReload />
      </Button>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin-bottom: 8px;

  strong {
    width: 100%;
    display: block;
  }

  div.canvas {
    display: block;
    width: 100%;
    height: 140px;
    border: 1px solid #666;
    border-radius: 0.25em;
    overflow: hidden;
  }

  button {
    position: absolute;
    bottom: 1px;
    right: 1px;
    z-index: 100;
  }
`;
