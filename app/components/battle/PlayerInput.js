import React from 'react';
import PropTypes from 'prop-types';

export default class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;

    this.setState({ username: value });
  }

  handleSubmit(event) {
    event.preventDefault(); // cancels event - in this case submission to server
    const { id, onSubmit } = this.props;
    const { username } = this.state;
    onSubmit(id, username);
  }

  render() {
    const { label } = this.props;
    const { username } = this.state;

    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {label}
        </label>
        <input id="username" placeholder="github username" type="text" autoComplete="off" value={username} onChange={this.handleChange} />
        <button className="button" type="submit" disabled={!username}>
          Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
