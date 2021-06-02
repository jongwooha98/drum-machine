import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const data = [
  {
    id: 'Heater 1',
    value: 'Q',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    id: 'Heater 2',
    value: 'W',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    id: 'Heater 3',
    value: 'E',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    id: 'Kick n Hat',
    value: 'A',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    id: 'RP4 KICK 1',
    value: 'S',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    id: 'Punchy Kick 1',
    value: 'D',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
  },
  {
    id: 'Side Stick 1',
    value: 'Z',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
  },
  {
    id: 'Brk Snare',
    value: 'X',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
  },
  {
    id: 'Bld H1',
    value: 'C',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
  },
];

class DrumPad extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    console.log(e.key);
    if (e.keyCode === this.props.value.charCodeAt()) {
      this.handleClick();
    }
  };

  handleClick = () => {
    this.audio.play();
    this.audio.currentTime = 0;

    this.props.handleDisplay(this.props.id);
  };

  render() {
    return (
      <div id={this.props.id} className="drum-pad" onClick={this.handleClick}>
        <button>{this.props.value}</button>
        <audio
          id={this.props.value}
          className="clip"
          src={this.props.src}
          ref={(ref) => (this.audio = ref)}
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'Click or Press Key to Play',
    };
  }

  handleDisplay = (display) => {
    this.setState({
      display: display,
    });
  };

  render() {
    return (
      <div id="drum-machine">
        <div id="display">{this.state.display}</div>
        <div>
          {data.map((d) => (
            <DrumPad
              id={d.id}
              value={d.value}
              src={d.src}
              handleDisplay={this.handleDisplay}
            />
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
