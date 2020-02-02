import React, { Component } from 'react'
import swal from 'sweetalert'
// css 
import './style/home.css'
import Login from '../auth/login'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            quizInfo : {},
            errMsg : "",
            noKey : false,
            status : "",
            time : 0
        }
    }

    componentDidMount = () => {
        this.getInfo()
    }

    // get quiz-info 
    getInfo = () => {
        let key = this.getKey()
        if (key){
            fetch("https://quiz-app-v1.herokuapp.com/api/admin/quiz/get-quiz-info",{
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
                if (!data.error){
                    this.setState({
                        quizInfo : data,
                        status : data.status,
                        time : data.time / 60
                    })
                }else{
                    swal(data.error)
                    this.setState({
                        errMsg : data.error
                    })
                }
            })
        }
    }

    // start-quiz
    startQuiz = () => {
        let status = this.state.status 
        let time = this.state.time * 60
        let key = this.getKey()
        if (time === 0){
            swal("time required!....")
        }else{
            if (key && status === "-"){
                let obj = {"status" : "started", "timer" : time}
                console.log(obj)
                fetch("https://quiz-app-v1.herokuapp.com/api/admin/quiz/start-quiz",{
                    method : "POST",
                    headers : {
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': true,
                        'Content-Type': 'application/json',
                        'key' : key
                    },
                    body : JSON.stringify(obj)
                })
                .then(res => res.json())
                .then(data => {
                    if(!data.error){
                        this.setState({
                            status : "started"
                        })
                        swal(data.msg)
                    }else{
                        swal(data.error)
                    }
                })
            }else{
                if (this.state.status === "started"){
                    swal("quiz has been already started!..")
                }
                if (this.state.status === "finished"){
                    swal("quiz finished!..")
                }
            }
        }
    }

    // stop-quiz
    stopQuiz = () => {
        let status = this.state.status 
        let key = this.getKey()
        if (status && key){
            if(this.state.status === "started"){
                let obj = {"status" : "finished"}
                // console.log(obj)
                fetch("https://quiz-app-v1.herokuapp.com/api/admin/quiz/stop-quiz",{
                    method : "POST",
                    headers : {
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': true,
                        'Content-Type': 'application/json',
                        'key' : key
                    },
                    body : JSON.stringify(obj)
                })
                .then(res => res.json())
                .then(data => {
                    if(!data.error){
                        this.setState({
                            status : "finished"
                        })
                        swal(data.msg)
                    }else{
                        swal(data.error)
                    }
                })
            }else{
                if (this.state.status === "-"){
                    swal("u haven't started the quiz yet!..")
                }
                if (this.state.status === "finished"){
                    swal("quiz has already finished!...")
                }
            }
        }
    }

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

    // set-time in state 
    setTime = (event) => {
        event.preventDefault()
        this.setState({
            time : event.target.value
        })
    }

    render(){
        if (this.state.noKey){
            return(
                <div>
                    <Login />
                </div>
            )
        }

        return   (
            <div className="home-main">
                <div>
                    <button className="start-btn" onClick={this.startQuiz}>
                        start quiz 
                    </button>
                    <button className="stop-btn" onClick={this.stopQuiz}>
                        stop quiz 
                    </button>
                    <button className="rf" onClick={this.getInfo}>
                        referesh 
                    </button>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>quizName</td>
                            <td>{this.state.quizInfo.quizName}</td>
                        </tr>
                        <tr>
                            <td>state</td>
                            <td>{this.state.status}</td>
                        </tr>
                        <tr>
                            <td>timer</td>
                            <td>
                                <h4>{this.state.time} min </h4> 
                                <input type="text" value={this.state.time}
                                onChange={this.setTime} className="in-time"
                                placeholder="time in minutes"/>
                            </td>
                        </tr>
                        <tr>
                            <td>quiz start time</td>
                            <td>{this.state.quizInfo.quizStartTime}</td>
                        </tr>
                        <tr>
                            <td>quiz end time</td>
                            <td>{this.state.quizInfo.quizEndTime}</td>
                        </tr>
                        <tr>
                            <td>created by</td>
                            <td>{this.state.quizInfo.email}</td>
                        </tr>
                        <tr>
                            <td>DOC</td>
                            <td>{this.state.quizInfo.DOC}</td>
                        </tr>
                        <tr>
                            <td>no of question's</td>
                            <td>{this.state.quizInfo.noOfQuestion}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Home