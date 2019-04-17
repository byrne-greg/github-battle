import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px',
  },
};

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
    };
  }


  componentDidMount() {
    const { text: originalText, speed } = this.props;
    const stopper = `${originalText}...`;
    this.interval = setInterval(() => {
      const { text: stateText } = this.state;
      if (stateText === stopper) {
        this.setState({ text: originalText });
      } else {
        this.setState(({ text: `${stateText}.` }));
      }
    }, speed);
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {
    const { text } = this.state;
    return (
      <p style={styles.content}>{text}</p>
    );
  }
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};
Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
};
