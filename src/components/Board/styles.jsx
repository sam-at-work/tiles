import styled from "styled-components";
import dirt from "./images/5.png";
import topDirt from "./images/2.png";
import tree from "./images/Tree_2.png";

export default styled.div`
  --grid-gap: ${props => (props.width * props.height > 9 ? "2px" : "5px")};
  @media (min-width: 600px) {
    --grid-gap: ${props => (props.width * props.height > 9 ? "8px" : "12px")};
  }

  display: flex;
  flex-direction: column;

  .locations-wrapper {
    background-color: lightskyblue;
  }

  .tiles-wrapper {
    background-image: url(${topDirt}), url(${dirt});
    background-repeat: repeat-x, repeat;
    flex-grow: 1;
  }

  .grid {
    flex: auto;
    display: grid;
    grid-template-columns: repeat(${props => props.width}, 1fr);
    margin-left: auto;
    margin-right: auto;

    max-width: calc(
      ${props => props.tileRatio * 100}vh - ${props => props.gapRatio} * var(--grid-gap)
    );

    &.tiles {
      grid-gap: var(--grid-gap);
    }

    &.locations {
      grid-column-gap: var(--grid-gap);
    }
  }

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

  .tree {
    display: ${props => (props.width <= 2 ? "none" : "block")};
    background-image: url(${tree});
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: bottom;
    background-position-x: center;
    grid-row: 1;
  }

  .placeHolder {
    display: ${props => (props.width <= 2 ? "none" : "block")};
    grid-row: 1;
    grid-column-start: 2;
    grid-column-end: -2;
  }
`;
