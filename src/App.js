import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import drumSoundData from './drumSoundData';

class DrumPad extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown = (e) => {
    console.log(e.key);
    if (e.keyCode === this.props.value.charCodeAt()) {
      document.getElementById(`${this.props.value}`).classList.add('active');
      this.handleClick();
    }
  };

  handleKeyUp = (e) => {
    document.getElementById(`${this.props.value}`).classList.remove('active');
  };

  handleClick = () => {
    this.audio.play();
    this.audio.currentTime = 0;

    this.props.handleDisplay(this.props.id);
  };

  render() {
    return (
      <div id={this.props.id} className="drum-pad" onClick={this.handleClick}>
        <button id={this.props.value} className="drum-pad__button">
          {this.props.value}
        </button>
        <audio
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
      <div className="drum-machine" id="drum-machine">
        <h1>Drum Machine</h1>
        <div className="display" id="display">
          {this.state.display}
        </div>
        <div className="drum-pad__container">
          {drumSoundData.map((d, index) => (
            <DrumPad
              key={index}
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
