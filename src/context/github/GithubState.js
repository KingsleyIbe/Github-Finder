import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS

} from '../types';

let githubToken;

if (process.env.NODE_ENV !== 'production'){
    githubToken = process.env.REACT_APP_GITHUB_TOKEN;
}else{
    githubToken = process.env.GITHUB_TOKEN;
}


const github = axios.create({
    baseURL: "https://api.github.com",
    headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
  });

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);
//Search Users
    const searchUsers = async (text) => {
        setLoading();
    
        const res = await github.get(`/search/users?q=${text}`
        );
    
        dispatch({
            type: SEARCH_USERS,
            payLoad: res.data.items

        });
      };

// Get User 
const getUser = async (username) => {
      setLoading();

    const res = await github.get(`/users/${username}?`);
    
    dispatch({
        type: GET_USER,
        payLoad: res.data
    })
    };


//Get repos
const getUserRepos = async (username) => {
    setLoading();
    const res = await github.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );

    dispatch({
        type: GET_REPOS,
        payLoad: res.data
    })
  };
//Clear users 
const clearUsers = () => dispatch({ type: CLEAR_USERS});


const setLoading = () => dispatch({ type: SET_LOADING });

    return ( 
        <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
        >
        {props.children}
    </GithubContext.Provider>
    )
};

export default GithubState;
