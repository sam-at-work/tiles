import styled from "styled-components";

export default styled.div`
  --grid-gap: ${props => (props.width * props.height > 9 ? "2px" : "5px")};
  @media (min-width: 600px) {
    --grid-gap: ${props => (props.width * props.height > 9 ? "8px" : "12px")};
  }

  max-width: calc(
    ${props => props.tileRatio * 100}vh - ${props => props.gapRatio} * var(--grid-gap)
  );

  display: grid;
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: var(--grid-gap);

  .location {
    align-self: end; // make locations appear aligned to bottom of cell;
    position: relative;
    padding-bottom: 100%; // make square by default

    //width: 100%;
    //content: "";
    //height: 0;
    > * {
      //top: 0;
      //bottom: 0;
      //left: 0;
      //right: 0;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  .placeHolder {
    display: ${props => (props.width <= 2 ? "none" : "block")};
    grid-column-start: 2;
    grid-column-end: -2;
  }
`;
