import React, { Component } from 'react'

// compoent's 
import Reg from './register'
import Dash from '../dash/dash'

class Login extends Component {
  constructor(){
    super()
    this.state = {
        email : "",
        comp : "",
        password : "",
        submit : true,
        err : "",
        login : true,
        reg : false
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
          fetch("https://quiz-app-v1.herokuapp.com/api/admin/auth/login",{
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
                let key = data.key
                this.storeKey(key)
                this.setState({
                  login : true
                })
                this.resetIn()
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

  // store-key in local storage
  storeKey = (key) => {
    console.log(key)
    let authKey = localStorage.getItem('auth-key')
    if(authKey){
      localStorage.removeItem("auth-key")
      localStorage.setItem("auth-key",key)
    }else{
      localStorage.setItem("auth-key",key)
    }
  }

  // reset err
  resetIn = () => {
      this.setState({
          email : "",
          password : "",
          comp : "",
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

  // to-register 
  toReg = (event) => {
    event.preventDefault()
    this.setState({
      reg : true
    })
  }

  render() {
    if (this.state.login){
      return(
        <div>
          <Dash />
        </div>
      )
    }

    if(this.state.reg){
      return(
        <div>
          <Reg />
        </div>
      )
    }

    return (
      <div className="reg-main">
          <div className="reg-t">
                <h3 className="reg-txt">login to comp</h3>
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
                  login to comp
              </button>
            </div>
            <div className="reg-login">
                <span className="reg-login-txt">don't have comp</span>
                <button onClick={this.toReg} className="reg-login-btn">
                    create comp
                </button>
            </div>
      </div>
    )
  }
}

export default Login