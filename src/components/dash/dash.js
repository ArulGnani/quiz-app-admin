import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Status from './status'
import Home from './home'
import './dash.css'
// component's 
import AddQuestion from './addQuestion'
import Login from '../auth/login'

class Dash extends Component {
    constructor(){
        super()
        this.state = {
          logout : false
        }
    }

    logout = () => {
        this.setState({
            logout : true
        })
        this.delKey()
    }

    delKey = () => {
        localStorage.removeItem("auth-key")
    }

  render() {
    if(this.state.logout){
        return(
            <div>
                <Login />
            </div>
        )
    }
    return (
      <div className="dash">
        <Router>
            <div className="dash-nav">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/add-new-question">Add question's</Link>
                    </li>
                    <li>
                        <Link to="/status">Status</Link>
                    </li>
                    <li>
                        <Link onClick={this.logout}>logout</Link>
                    </li>
                </ul>

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/add-new-question">
                        <AddQuestion />
                    </Route>
                    <Route path="/status">
                        <Status />
                    </Route>
                </Switch>
            </div>
        </Router>
      </div>
    )
}
}


export default Dash