import * as React from "react";
import { styled } from "@glitz/react";

const LinkOverlay = styled.div({
  width: "100%",
  height: "100%",
  cursor: "pointer",
  backgroundColor: "white",
  userSelect: "none",
  display: "flex",
  justifyContent: "center",
  WebkitTapHighlightColor: "transparent",
  flexWrap: "wrap",
});


type PropType = {
  onClick: () => void,
};

type StateType = {

};

export class Button extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {};
  }
  render(): JSX.Element {
    return (
      <LinkOverlay onClick={this.props.onClick}>
        {this.props.children}
      </LinkOverlay>
    );
  }
}