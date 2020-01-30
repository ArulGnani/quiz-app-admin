import React, { Component } from 'react'

// css 
import "./auth.css"

// component 
import Register from './register'
import Login from './login'

class Auth extends Component {
    constructor(){
        super()
        this.state = {
            reg : false,
            login : true
        }
    }

    // to-regester 
    toRegister = () => {
        this.setState({
            reg : true
        })
    }

    // to-login
    toLogin = () => {
        this.setState({
            login : true
        })
    }

    render() {
        if (this.state.reg){
            return(
                <div>
                    <Register />
                </div>
            )
        }

        if (this.state.login){
            return(
                <div>
                    <Login />
                </div>
            )
        }

        return (
            <div className="auth-box">
                <div onClick={this.toRegister} className="auth-reg">
                    create new comp
                </div>
                <hr className="auth-line"/>
                <div onClick={this.toLogin} className="auth-login">
                    login to comp 
                </div>
            </div>
        )
    }
}

export default Auth