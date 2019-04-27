import * as React from 'react';
import { Game } from './game';
import { styled } from '@glitz/react';

const Center = styled.div({
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
});

const SubmitButton = styled.button({
  height: '50px',
  width: '100px',
  fontSize: '25px',
  alignSelf: 'center',
  boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
  border: {
    xy: {
      style: 'none'
    }
  },
  backgroundColor: '#90d7db',
  color: 'white',
  ":hover": {
    cursor: 'pointer',
  },
  ":active": {
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 8px 7px, rgba(0, 0, 0, 0.22) 0px 12px 17px',
    fontSize: '22px',
  },
  ":focus": {
    outline: { style: 'none' }
  }
});

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '20px'
})

const InputStyle = styled.input({
  height: '50px',
  width: '350px',
  marginRight: '30px',
  textAlign: 'center',
  fontSize: '14px',
  alignSelf: 'center',
  backgroundColor: 'transparent',
  border: {
    left: {
      style: 'none'
    },
    right: {
      style: 'none'
    },
    top: {
      style: 'none'
    },
    bottom: {
      width: '5px',
      color: 'black',
    }
  },
  ':focus': {
    'outline': {
      'style': 'none',
    },
  },
});

type PropType = {

};

type StateType = {
  nextName: string;
  selectedName: string;
};

export class App extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      selectedName: localStorage.getItem('name'),
      nextName: undefined,
    };
  }

  componentWillUpdate() {
    document.body.setAttribute('style', 'overflow: auto');
  }

  setName(): void {
    if (this.state.nextName.length > 2) {
      localStorage.setItem('name', this.state.nextName);
      this.setState({ selectedName: this.state.nextName });
    }
  }

  clearName(): void {
    this.setState({ selectedName: undefined, nextName: undefined });
  }

  handleNameInput(e: React.KeyboardEvent<HTMLInputElement>): void {
    this.setState({ nextName: e.currentTarget.value });

    if (e.keyCode === 13) {
      this.setName();
    }
  }

  render(): JSX.Element {
    return (
      (this.state.selectedName != null)
        ? (
          <Game
            name={this.state.selectedName}
            clearName={this.clearName.bind(this)}
          />)
        : (
          <Center>
            <h1>WELCOME TO <a target="_blank" href="https://ldjam.com/events/ludum-dare/44/life-4-fame">LIFE 4 FAME</a></h1>
            <p style={{ width: '600px', marginBottom: '50px' }}>
              In this game you trade your life for glory, or well... marketing. Glorious marketing!
              Getting a good score means that you will be in the top of the highscore, which means extraordinary market exposure! We're talking billions of clicks.
              <br />
              <br />
              <b style={{ fontSize: '20px' }}>INSTRUCTIONS</b>
              <br />
              <b>
                - Click (or tap, if you are on your phone) the screen to collect points, if you stop clicking for 1.5 seconds the points are submitted.
              <br />
                <br />
                - Enter a link to your game below and the highscore will link to it.
                <br />
                <i>Example: https://ldjam.com/events/ludum-dare/44/my-awesome-game</i>
                <br />
                <br />
                - If you don't have a game, a name is fine too; it will link to your LDJAM profile.
                <br />
                <i>Example: TheRock1337</i>
                <br />
                <br />
                - In game, swipe up to find highscore and other links.
                <br />
                <br />
                <br />
              </b>
              <i>How much of your life are you willing to trade for a top spot?</i>
            </p>
            <div style={{ marginBottom: '50px', padding: '50px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px' }}>
              <Row>
                <InputStyle placeholder={'Your name or link to your game'}
                  onChange={this.handleNameInput.bind(this)} />
                <SubmitButton onClick={this.setName.bind(this)}>
                  Go!
            </SubmitButton>
              </Row>
              <Row>
                <input type={"checkbox"} /> <span>I hereby promise that I will check out the #1 game on the highscore</span>
              </Row>
            </div>
            <iframe src="/score" frameBorder="0" height={800} width={600}></iframe>
          </Center >
        )
    );
  }
}
