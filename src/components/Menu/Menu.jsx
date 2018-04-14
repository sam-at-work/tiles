import styled from "styled-components";

export default styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  //max-width: 300px;
  min-width: 300px;

  background-color: azure;

  &.message-enter {
    opacity: 0.01;
    transform: translateX(-50%) translateY(-75%);
  }
  &.message-enter-active {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%);
    transition: all 500ms ease-out 1000ms;
  }
  &.message-exit {
    opacity: 1;
    //transform: scale(1) translateY(0%);
  }
  &.message-exit-active {
    opacity: 0.01;
    //transform: scale(0.9) translateY(50%);
    transition: all 300ms ease-out;
  }
`;
