import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// components import
import Navbar from './components/navbar/navbar';
import MyProfileContainer from './pages/myprofile/myprofile.container';
import AddUserContainer from './pages/adduser/adduser.container';
import AllUsersContainer from './pages/alluser/aluser.container';
import LoginContainer from './pages/login/login.container';
import ArticleContainer from './pages/article/article.container';
import NewPasswordContainer from './pages/newPassword/newPassword.container';
import NoMatchPage from './pages/NoMatchPage';

//jwt
import { getJwt } from './api/getJwt';
import { authenticateSession } from './api/authenticate';

class  App extends React.Component {
  constructor(){
    super();
    this.state={
      isLoggedin : (getJwt() === null) ? false : authenticateSession()
    }
  }

  login = () => {
    console.log("inside login ");

    this.setState ({
      isLoggedin : true
    })
  }

  logout = () => {
   
    localStorage.removeItem('NarayanShresthaJWT');
  
    this.setState ({
      isLoggedin : false
    })
  }
  
  render() {
    return (
      <Router>

        {
          this.state.isLoggedin ? 
            <Navbar logout={this.logout}/>
            :
            null
        }
        
  
        <Switch>
          <Route 
            exact 
            path="/" 
            render={ () => {
              
                if(!this.state.isLoggedin) {
                  return <LoginContainer login={this.login}/>
                }
                return <MyProfileContainer />
              
            }}
         
           />

          <Route 
            path="/allusers" 
            render={ () => {
              
              if(!this.state.isLoggedin) {
                return <LoginContainer login={this.login}/>
              }
              return <AllUsersContainer />
            
            }}
          />

          <Route 
            path="/adduser" 
            render={ () => {
              
              if(!this.state.isLoggedin) {
                return <LoginContainer login={this.login}/>
              }
              return <AddUserContainer />
            
            }}
          />

          <Route 
            path="/article" 
            render={ () => {
              
              if(!this.state.isLoggedin) {
                return <LoginContainer login={this.login}/>
              }
              return <ArticleContainer />
            
            }}
          />

          <Route 
            exact
            path="/login" 
            render={ () => 
              {
                if(!this.state.isLoggedin) {
                  return <LoginContainer login={this.login}/>
                }
                return <Redirect to="/"/>
              }
            } 
          />

          <Route 
            exact
            path="/verification/:id" 
            render={ () => 
              <NewPasswordContainer logout={this.logout}/>
            } 
          />

          <Route 
            component = {NoMatchPage}
          />

        </Switch>
      </Router>
    );
  }
  
}

export default App;