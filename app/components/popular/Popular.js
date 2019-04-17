import React from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import Loading from '../Loading';

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repositories: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    const { selectedLanguage } = this.state;
    this.updateLanguage(selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang,
      repositories: null,
    });

    api.fetchPopularRepositories(lang).then(
      repositories => this.setState({ repositories }),
    );
  }


  render() {
    const { repositories, selectedLanguage } = this.state;
    return (
      <div>
        <SelectLanguage onSelect={this.updateLanguage} selectedLanguage={selectedLanguage} />
        {!repositories
          ? <Loading text="Loading what's popular" />
          : <RepositoryGrid repositories={repositories} /> }
      </div>
    );
  }
}

const SelectLanguage = (props) => {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="languages">
      {languages.map(lang => (
        <li
          style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
          onClick={() => props.onSelect(lang)}
          key={lang}
        >
          {lang}
        </li>
      ))}
    </ul>
  );
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};


const RepositoryGrid = (props) => {
  const { repositories } = props;

  return (
    <ul className="popular-list">
      {repositories.map((repo, index) => {
        const {
          owner: { avatar_url: avatarUrl },
          owner: { login },
          name,
          stargazers_count: stargazersCount,
          html_url: htmlUrl,
        } = repo;
        return (
          <li key={repo.name} className="popular-item">
            <div className="popular-rank">
              {`#${index + 1}`}
              <ul className="space-list-items">
                <li>
                  <img
                    className="avatar"
                    src={avatarUrl}
                    alt={`Avatar for ${login}`}
                  />
                </li>
                <li>
                  <a href={htmlUrl}>{name}</a>
                </li>
                <li>
                  {`@${login}`}
                </li>
                <li>
                  {`${stargazersCount} stars`}
                </li>
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

RepositoryGrid.propTypes = {
  repositories: PropTypes.array.isRequired,
};
