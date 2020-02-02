import React, { Component } from 'react'

// css 
import './style/auth.css'
// components 
import Login from './login'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            email : "",
            comp : "",
            password : "",
            submit : false,
            err : "",
            login : false
        }
    }

    // handelchange 
    handelChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
            err : ""
        })
    }

    // submit
    submit = (event) => {
        event.preventDefault()
        let validated = this.validate()
        if (validated === true){
            let email = this.state.email
            let password = this.state.password
            let comp = this.state.comp
            let newComp = {
                email : email,
                password : password,
                quizName : comp
            }
            // console.log(newComp)
            fetch("https://quiz-app-v1.herokuapp.com/api/admin/auth/register-quiz ",{
                method : "POST",
                    headers : {
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': true,
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(newComp)
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (!data.error){
                    this.setState({
                        login : true
                    })
                }else{
                    this.setState({
                        err : data.error
                    })
                }
            })
        }else{
            this.setState({
                err : validated
            })
        }
    }

    // reset err
    resetErr = () => {
        this.setState({
            err : ""
        })
    }

    // validate input 
    validate = () => {
        let email = this.state.email
        let comp = this.state.comp
        let password = this.state.password
        if (email === "" || comp === "" || password === ""){
            return "all fields are required!..."
        }else{
            return true
        }

    }

    // to-login
    toLogin = () => {
        this.setState({
            login : true
        })
    }

    render() {
        if(this.state.login){
            return (
                <div>
                    <Login />
                </div>
            )
        }

        return (
        <div className="reg-main">
            <div className="reg-t">
                <h3 className="reg-txt">register comp</h3>
            </div>
            <div className="reg-box">
                <span className="reg-err">{this.state.err}</span>
                <input type="text" placeholder="enter email id" 
                className="reg-email" value={this.state.email} 
                onChange={this.handelChange} name="email"/><br/>
                <input type="text" placeholder="enter comp name" 
                className="reg-comp" value={this.state.comp} 
                onChange={this.handelChange} name="comp"/><br/>
                <input type="password" placeholder="enter password" 
                className="reg-password" value={this.state.password} 
                onChange={this.handelChange} name="password"/><br/>
                <button className="reg-btn" onClick={this.submit}>
                    craete new comp
                </button>
            </div>
            <div className="reg-login">
                <span className="reg-login-txt">already created comp</span>
                <button onClick={this.toLogin} className="reg-login-btn">
                    login to comp
                </button>
            </div>
        </div>
        )
    }
}

export default Register