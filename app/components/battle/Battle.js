import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerInput from './PlayerInput';
import PlayerPreview from './PlayerPreview';


export default class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    const newState = {};
    newState[`${id}Name`] = username;
    newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;
    this.setState(newState);
  }

  handleReset(id) {
    const newState = {};
    newState[`${id}Name`] = '';
    newState[`${id}Image`] = null;
    this.setState(newState);
  }

  render() {
    const {
      playerOneName, playerTwoName, playerOneImage, playerTwoImage,
    } = this.state;
    const { match: { url: matchUrl } } = this.props;


    return (
      <div>
        <div className="row">
          {!playerOneName
            && <PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmit} />}

          {playerOneImage !== null
            && (
            <PlayerPreview avatar={playerOneImage} username={playerOneName}>
              <button className="reset" onClick={() => this.handleReset('playerOne')}>Reset</button>
            </PlayerPreview>
            ) }

          {!playerTwoName
            && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmit} />}

          {playerTwoImage !== null
            && (
            <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
              <button className="reset" onClick={() => this.handleReset('playerTwo')}>Reset</button>
            </PlayerPreview>
            ) }
        </div>

        {playerOneImage && playerTwoImage
        && (<Link className="button" to={{ pathname: `${matchUrl}/results`, search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}` }}>Battle</Link>)}
      </div>
    );
  }
}

Battle.propTypes = {
  match: PropTypes.object.isRequired,
};
