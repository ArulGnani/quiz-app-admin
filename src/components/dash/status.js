import React, { Component } from 'react'
import swal from 'sweetalert'

// css
import './style/status.css'

class Status extends Component {
  constructor(){
    super()
    this.state = {
      status : [],
      noKey : false,
      msg : ""
    }
  }

  componentDidMount = () => {
    this.getStat()
  }

  // get result from db
  getStat = () => {
    let key = this.getKey()
    if(key){
      fetch("https://quiz-app-v1.herokuapp.com/api/admin/quiz/current-status",{
          method : "GET",
              headers : {
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': true,
                  'Content-Type': 'application/json',
                  'key' : key
              }
      })
      .then(res => res.json())
      .then(data => {
        if(!data.error){
          this.setState({
            status : [...data]
          })
        }else{
          swal(data.error)
          this.setState({
            msg : data.error
          })
        }
      })    
  }}  

    // get auth-key 
    getKey = () => {
        let key = localStorage.getItem("key")
        if(key){
            return key
        }else{
            this.setState({
                noKey : true
            })
        }
    }


  render() {
    let stat = this.state.status.map((stat,k) => {
      return(
          <tr key={k}>
              <td>{stat.email}</td>
              <td>{stat.teamName}</td>
              <td>{stat.quizName}</td>
              <td>{stat.startTime}</td>
              <td>{stat.endTime}</td>
              <td>{stat.startQuiz === true ? "on" : "off"}</td>
              <td>{stat.points === false ? "-" : stat.points}</td>
          </tr> 
      )
    })

    return (
      <div className="s-main">
          <div className="s-btns">
              <button onClick={this.getStat} className="ref">refresh</button>
          </div>
          <div className="total"> 
              <h3>total no of participants : {this.state.status.length}</h3>
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