// @flow

import styled from "styled-components";
import React from "react";
import type { Vertex } from "../../types";

const CrossHairs = styled.div`
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: 100%;
    background-color: black;
  }
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: black;
  }

  .pos {
    position: absolute;
  }

  .top {
    top: 0;
    left: 50%;
  }

  .right {
    right: 0;
    top: 50%;
  }

  .bottom {
    bottom: 0;
    left: 50%;
  }

  .left {
    top: 50%;
    left: 0;
  }
`;

export default function({ edgeToVertex }: { edgeToVertex: { [number]: Vertex } }) {
  return (
    <CrossHairs>
      <div className={"pos top"}>{edgeToVertex[0]}</div>
      <div className={"pos right"}>{edgeToVertex[1]}</div>
      <div className={"pos bottom"}>{edgeToVertex[2]}</div>
      <div className={"pos left"}>{edgeToVertex[3]}</div>
    </CrossHairs>
  );
}
