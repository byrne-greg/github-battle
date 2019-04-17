import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import Loading from '../Loading';
import PlayerPreview from './PlayerPreview';

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,

    };
  }

  componentDidMount() {
    const { location: { search: urlQueryParams } } = this.props;
    const players = queryString.parse(urlQueryParams);
    const { playerOneName, playerTwoName } = players;
    api.battle([playerOneName, playerTwoName]).then((results) => {
      if (results === null) {
        return this.setState({ error: 'Looks like there was an error. Check that both users exist on Github', loading: false });
      }
      return this.setState({
        error: null, winner: results[0], loser: results[1], loading: false,
      });
    });
  }

  render() {
    const {
      error,
      winner,
      loser,
      loading,
    } = this.state;

    if (loading === true) {
      return <Loading text="Loading battle results..." />;
    }
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      );
    }

    const { score: winnerScore, profile: winnerProfile } = winner;
    const { score: loserScore, profile: loserProfile } = loser;
    return (
      <div className="row">
        <Player
          label="Winner"
          score={winnerScore}
          profile={winnerProfile}
        />
        <Player
          label="Loser"
          score={loserScore}
          profile={loserProfile}
        />
      </div>
    );
  }
}

Results.propTypes = {
  location: PropTypes.object.isRequired,
};

const Player = (props) => {
  const { label, score, profile } = props;
  return (
    <div>
      <h1 className="header">{label}</h1>
      <h3 style={{ textAlign: 'center' }}>{`Score: ${score}`}</h3>
      <Profile info={profile} />
    </div>
  );
};
Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
};

const Profile = (props) => {
  const { info } = props;
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className="space-list-items">
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>{`Followers: ${info.followers}`}</li>
        <li>{`Following: ${info.following}`}</li>
        <li>{`Public Repos: ${info.public_repos}`}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  );
};
Profile.propTypes = {
  info: PropTypes.object.isRequired,
};
