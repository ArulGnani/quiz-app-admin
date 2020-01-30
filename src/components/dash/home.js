import React, { Component } from 'react'
import './home.css'
import Login from '../auth/login'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            allUser : [],
            conn : 0,
            noTaking : 0,
            finished : 0,
            quizName : "",
            noQues : 0,
            noKey : false
        }
    }

    componentDidMount = () => {
        this.getData()
    }

    // get-data form db 
    getData = () => {
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
            .then(data => console.log(data))
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

    render(){
        if (this.state.noKey){
            return(
                <div>
                    <Login />
                </div>
            )
        }

        return(
            <div className="home-main">
                
            </div>
        )
    }
}

export default Home