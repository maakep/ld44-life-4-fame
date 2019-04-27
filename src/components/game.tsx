import * as React from "react";
import * as io from "socket.io-client";
import * as Swipeable from "react-swipeable";

import initializeSocketResponse from "./socket-callbacks";

import { styled } from "@glitz/react";
import { Footer, FooterElement, FooterArrow } from "./elements/footer";
import { Button } from "./elements/button";
import { Header } from "./elements/header";

type PropType = {
  name: string;
  clearName: () => void;
};
type StateType = {
  clicks: number;
  showFooter: boolean;
};

export class Game extends React.Component<PropType, StateType> {
  socket: SocketIOClient.Socket;
  timeout: NodeJS.Timer;

  constructor(props: PropType) {
    super(props);
    this.socket = io();
    this.socket.emit("client:join", { name: this.props.name });
    /* Initialize socket responses here, if any are created
    initializeSocketResponse(this.socket);*/

    this.state = {
      clicks: 0,
      showFooter: false,
    };
  }

  componentDidMount() {
    window.scrollTo({ top: 0 });
    document.body.setAttribute('style', 'overflow: hidden');
  }

  handleClick(e?: React.MouseEvent<HTMLElement>): void {
    this.increment();

    if (this.timeout !== undefined) {
      this.resetTimeout();
    }

    this.timeout = setTimeout(() => {
      this.emitScore();
    }, 1500);
  }

  emitScore() {
    if (this.state.clicks > 0) {
      this.socket.emit("client:submit-score", { name: this.props.name, score: this.state.clicks });
      this.reset();
    }
  }

  resetTimeout() {
    clearTimeout(this.timeout);
  }

  increment(): void {
    this.setState({ clicks: this.state.clicks + 1 });
  }

  reset(): void {
    this.setState({ clicks: 0 });
  }

  swipedUp(
    event: React.TouchEvent<HTMLElement>,
    deltaX: number,
    deltaY: number,
    isFlick: boolean,
    velocity: number
  ) {
    this.handleClick();
    this.setState({ showFooter: (deltaY > 0) });
  }

  render(): JSX.Element {
    return (
      <Swipeable
        style={{ height: "100%" }}
        onSwiped={this.swipedUp.bind(this)}
        trackMouse={true}>
        <Header />
        <Button onClick={this.handleClick.bind(this)}>
          <div style={{ marginTop: '300px', fontSize: '60px' }}>{this.state.clicks}</div>
        </Button>
        <Footer css={this.state.showFooter ? { bottom: 70 } : { bottom: 9 }}>
          <FooterArrow onClick={() => this.setState({ showFooter: !this.state.showFooter })} />
          <FooterElement onClick={() => {
            this.resetTimeout();
            this.emitScore();
            localStorage.clear();
            this.props.clearName();
          }}>
            <i className="fa fa-sign-out" />
            <styled.Div css={{ fontSize: 12, fontStyle: "italic" }}>Change name</styled.Div>
          </FooterElement>
          <FooterElement onClick={() => {
            this.resetTimeout();
            this.emitScore();
          }}>
            <styled.Div css={{ fontSize: 18, fontWeight: "bold" }}><a target="_blank" href="https://ldjam.com/users/maakep">Ludum Dare Entry Page</a></styled.Div>
          </FooterElement>
          <FooterElement onClick={() => {
            this.resetTimeout();
            this.emitScore();
            window.location.href = "/score";
          }}>
            <i className="fa fa-trophy" />
            <styled.Div css={{ fontSize: 12, fontStyle: "italic" }}>Highscores</styled.Div>
          </FooterElement>
        </Footer>
      </Swipeable>
    );
  }
}
