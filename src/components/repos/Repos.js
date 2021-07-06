import React from 'react'
import PropTypes from 'prop-types';
import Repositems from './Repositems';

//  const Repos = ({ repos }) => {
//     return repos.map = (repo => <Repositems repo={repo} key={repo.id} />)
    
// }
const Repos = ({ repos }) => {
  return repos.map((repo) => <Repositems repo={repo} key={repo.id} />);
};

Repos.propTypes = {
    repos: PropTypes.array.isRequired,

}

export default Repos
