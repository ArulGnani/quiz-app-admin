import React, { Component } from 'react'
import './status.css'

class Status extends Component {
  constructor(){
    super()
    this.state = {
      stat : [],
      res : [],
      noKey : false,
      msg : ""
    }
  }

  componentDidMount = () => {
    this.getStat()
    this.getRes()
  }

  // get result from db
  getRes = () => {
    let key = this.getKey()
    if(key){
      fetch("https://quiz-app-v1.herokuapp.com/api/admin/quiz/get-result",{
          method : "GET",
              headers : {
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': true,
                  'Content-Type': 'application/json',
                  'auth-key' : key
              }
      })
      .then(res => res.json())
      .then(data => {
        if(!data.error){
          this.setState({
            res : [...data]
          })
        }else{
          this.setState({
            msg : data.error
          })
        }
      })    
  }}  

  // get-data form db 
  getStat = () => {
        let key = this.getKey()
        if(key){
            fetch("https://quiz-app-v1.herokuapp.com/api/admin/quiz/current-status",{
                method : "GET",
                    headers : {
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': true,
                        'Content-Type': 'application/json',
                        'auth-key' : key
                    }
            })
            .then(res => res.json())
            .then(data => {
              if(!data.error){
                this.setState({
                  stat : [...data]
                })
              }else{
                this.setState({
                  msg : data.error
                })
              }
            })    
        }
    }
    
    // get auth-key 
    getKey = () => {
        let key = localStorage.getItem("auth-key")
        if(key){
            return key
        }else{
            this.setState({
                noKey : true
            })
        }
    }


  render() {
    let stat = this.state.stat.map((s,k) => {
      return(
          <tr key={k}>
              <td>{s.email}</td>
              <td>{s.teamName}</td>
              <td>{s.quizName}</td>
              <td>{s.startTime}</td>
              <td>{s.stopTime === false ? "-" : "-"}</td>
              <td>{s.startQuiz === true ? "on" : "off"}</td>
              <td>{s.points === false ? "-" : "-"}</td>
          </tr> 
      )
    })

    return (
      <div className="s-main">
          <div className="s-msg">
              {this.state.msg}
          </div>
          <div className="s-btns">
              <button>status</button><br/>
              <button>result</button>
          </div>
          <div className="s-data">
              <tabel className="s-table">
                <thead>
                  <tr className="s-table-tr">
                    <td>email</td>
                    <td>team name</td>
                    <td>quiz name</td>
                    <td>start time</td>
                    <td>stop time</td>
                    <td>status</td>
                    <td>points</td>
                  </tr>
                </thead>
                <tbody className="s-table-tb-tr">
                  {stat}
                </tbody>
              </tabel>
          </div>
      </div>
    )
  }
}

export default Status