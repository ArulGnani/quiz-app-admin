import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Status from './status'
import Home from './home'
import './style/dash.css'
// component's 
import AddQuestion from './addQuestion'
import Login from '../auth/login'

class Dash extends Component {
    constructor(){
        super()
        this.state = {
          logout : false,
          comp : ""
        }
    }

    componentDidMount = () => {
        let compName = this.props.quizName
        let email = this.props.email
        if (compName && email){
            this.setState({
                comp : compName,
                email
            })
        }
    }

    logout = () => {
        this.setState({
            logout : true
        })
        this.delKey()
    }

    delKey = () => {
        localStorage.removeItem("key")
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
                        <a onClick={this.logout}>logout</a>
                    </li>
                </ul>

                <Switch>
                    <Route exact path="/">
                        <Home compName={this.state.comp} 
                         email={this.state.email}/>
                    </Route>
                    <Route path="/add-new-question">
                        <AddQuestion compName={this.state.comp} 
                         email={this.state.email}/>
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