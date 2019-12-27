import React, { Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';
import './App.css';

class App extends Component{
  state = {
    users:[],
    user: {},
    repos:[],
    loading: false,
    alert:null
  }

  // async componentDidMount(){    
  //   this.setState({ loading:true });

  //   const res  = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({ users: res.data , loading: false });
  // }

  // Search Github users
  searchUsers = async (text) =>{
    this.setState({loading: true});

    const res  = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items , loading: false });
  }


  // Get Single Github user
  getUser = async (username) => {
    this.setState({loading: true});

    const res  = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ user: res.data , loading: false });
  }

  // Get users repos
  getUserRepos = async (username) => {
    this.setState({loading: true});

    const res  = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ repos: res.data , loading: false });
  }

  // Clear users from state
  clearUsers = ()=>{
    this.setState({ users:[],loading:false });
  }

  // Set Alert
  setAlert = (msg,type) =>{
    this.setState({ alert: {msg, type} });
    setTimeout(()=> this.setState({alert:null}),2000);
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github"/>
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/" render={ props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers} 
                    showClear={ this.state.users.length>0 ? true : false } 
                    setAlert={this.setAlert}
                  />
                  <Users loading={this.state.loading} users={this.state.users} /> 
                </Fragment>
              )} />

              <Route exact path='/about' component={About} />

              <Route exact path="/user/:login" render={props =>(
                <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={this.state.user} repos={this.state.repos} loading={this.state.loading} />
              )} />

            </Switch>
          </div>
        </div>
      </Router>
    );
  }
} 

export default App;
