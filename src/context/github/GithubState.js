import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GituhbReducer from './githubReducer';
import{
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

const GithubState = props => {
    const initialState={
        users:[],
        user:{},
        repos:[],
        loading:false
    }

    const [state,dispatch] = useReducer(GituhbReducer,initialState);
    
    // Search USers

    // Get User

    // Get Repos

    // Clear Users

    // Set Loading

    return <GithubContext.Provider 
    value={{
        users:state.users,
        user:state.user,
        repos:state.repos,
        loadin:state.loading
    }}
    >
    {props.children}
    </GithubContext.Provider>

}

export default GithubState; 