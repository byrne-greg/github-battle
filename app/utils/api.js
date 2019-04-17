import axios from 'axios';

const mockBattleResult = [{
  profile: {
    login: 'BBB', id: 73390, node_id: 'MDQ6VXNlcjczMzkw', avatar_url: 'https://avatars1.githubusercontent.com/u/73390?v=4', gravatar_id: '', url: 'https://api.github.com/users/BBB', html_url: 'https://github.com/BBB', followers_url: 'https://api.github.com/users/BBB/followers', following_url: 'https://api.github.com/users/BBB/following{/other_user}', gists_url: 'https://api.github.com/users/BBB/gists{/gist_id}', starred_url: 'https://api.github.com/users/BBB/starred{/owner}{/repo}', subscriptions_url: 'https://api.github.com/users/BBB/subscriptions', organizations_url: 'https://api.github.com/users/BBB/orgs', repos_url: 'https://api.github.com/users/BBB/repos', events_url: 'https://api.github.com/users/BBB/events{/privacy}', received_events_url: 'https://api.github.com/users/BBB/received_events', type: 'User', site_admin: false, name: 'Ollie Relph', company: null, blog: 'http://ollie.relph.me', location: 'London, UK', email: null, hireable: true, bio: null, public_repos: 44, public_gists: 26, followers: 30, following: 34, created_at: '2009-04-13T18:54:18Z', updated_at: '2018-09-10T17:14:52Z',
  },
  score: 328,
}, {
  profile: {
    login: 'aaa', id: 1704, node_id: 'MDQ6VXNlcjE3MDQ=', avatar_url: 'https://avatars1.githubusercontent.com/u/1704?v=4', gravatar_id: '', url: 'https://api.github.com/users/aaa', html_url: 'https://github.com/aaa', followers_url: 'https://api.github.com/users/aaa/followers', following_url: 'https://api.github.com/users/aaa/following{/other_user}', gists_url: 'https://api.github.com/users/aaa/gists{/gist_id}', starred_url: 'https://api.github.com/users/aaa/starred{/owner}{/repo}', subscriptions_url: 'https://api.github.com/users/aaa/subscriptions', organizations_url: 'https://api.github.com/users/aaa/orgs', repos_url: 'https://api.github.com/users/aaa/repos', events_url: 'https://api.github.com/users/aaa/events{/privacy}', received_events_url: 'https://api.github.com/users/aaa/received_events', type: 'User', site_admin: false, name: null, company: null, blog: '', location: null, email: null, hireable: null, bio: null, public_repos: 0, public_gists: 0, followers: 5, following: 0, created_at: '2008-02-29T07:11:49Z', updated_at: '2014-02-09T23:13:45Z',
  },
  score: 15,
}];

// optional for rate limiting
const id = 'YOUR_GITHUB_OAUTH_CLIENT_ID';
const secret = 'YOUR_GITHUB_OAUTH_CLIENT_SECRET';
const params = `?client_id=${id}&client_secret=${secret}`;

const getProfile = username => axios.get(`https://api.github.com/users/${username + params}`).then(user => user.data);

const getRepos = username => axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);

const getStarCount = repositories => repositories.data.reduce(
  (count, repository) => count + repository.stargazers_count,
  0,
);

const calculateScore = (profile, repositories) => {
  const { followers } = profile;
  const totalStars = getStarCount(repositories);
  return (followers * 3) + totalStars;
};

const handleError = error => console.warn(error);

// axios.all waits until all async functions have been resolved
const getUserData = player => axios.all([getProfile(player), getRepos(player)]).then((data) => {
  const profile = data[0];
  const repos = data[1];
  return { profile, score: calculateScore(profile, repos) };
});

const sortPlayers = players => players.sort((a, b) => b.score - a.score);

export default {
  battle: players => axios.all(players.map(getUserData)).then(sortPlayers).catch(handleError),

  mockBattle: players => axios.all(mockBattleResult).then(sortPlayers),

  fetchPopularRepositories: (language) => {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    return axios.get(encodedURI).then(response => response.data.items);
  },
};
