import styled from "styled-components";
import React from "react";

const HudWrapper = styled.div``;

export default function({ gameType, level, score, shortestPathLength, ...props }) {
  return (
    <HudWrapper {...props}>
      Level {level - 1} / {gameType} / Solution: {shortestPathLength} tiles
    </HudWrapper>
  );
}
