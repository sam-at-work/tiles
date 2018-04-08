import styled from "styled-components";
import React from "react";

const HudWrapper = styled.div`

`;

export default function({ level, score, ...props }) {
  console.log(level);
  return <HudWrapper {...props}>Level {level - 1}</HudWrapper>;
}
