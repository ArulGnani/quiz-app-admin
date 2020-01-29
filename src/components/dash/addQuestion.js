import React, { Component } from 'react'

// css
import "./addQuestionStyle.css"

class AddQuestion extends Component {
    constructor(){
        super()
        this.state = {
            currentUser : "tester",
            quizName : "sample",
            allQuestions : [],
            options : [],
            question : "",
            option : "",
            optionAns : "",
            ans : "" 
        }
    }

    // handel-change-event 
    handelChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    // add-new option
    addOption = (event) => {
        event.preventDefault()
        let option = this.state.option
        let optionAns = this.state.optionAns
        let op = { option : option, optionAns : optionAns}
        console.log(op)
        this.setState({
            options : [...this.state.options, op]
        })
        this.resetOption()
    }

    // reset's the option 
    resetOption = () =>{
        this.setState({
            option : "",
            optionAns : ""
        })
    }

    // delete-option
    deleteOption = (event) => {
        event.preventDefault()
        let key = event.target.getAttribute('option')
        this.setState({
            options : this.state.options.filter(op => op.option !== key)
        }) 
    }  

    // add-question 
    addQuestion = (event) => {
        event.preventDefault()
        let validate = this.validate()
        if(validate === true){
            let obj = {
                quizName : this.state.quizName,
                createdBy : this.state.currentUser,
                question : {
                    ques : this.state.question,
                    options : [...this.state.options],
                    ans : this.state.ans
                }
            }
            fetch("https://quiz-app-v1.herokuapp.com/api/admin/quiz/add-new-questions",{
                method : "POST",
                    headers : {
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': true,
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(obj)
            })
            .then(res => res.json())
            .then(data => console.log(data))
        }else{
            alert(validate)
        }
    }

    // validation 
    validate = () => {
        let question = this.state.question
        let option = this.state.options
        let ans = this.state.ans 
        if (question === "" || option.length === 0|| ans === ""){
                return "all field's required!..."
        }else{
            return true
        }
    }

    render() {
        let opts = this.state.options.map((op,key) => {
            return (
                <div key={key}>
                    <div className="r-op">
                        <p className="r-op-p"><span>{op.option}</span> : {op.optionAns}</p>
                        <button className="r-op-del" onClick={this.deleteOption} option={op.option}>
                            delete
                        </button>
                    </div>
                </div>
            )
        })
        return (
            <div className="add-main">
                <div className="show-qestion"> 
                    <h1>sample question</h1>
                </div>
                
                <div className="question-block">
                    <div className="preview-question">
                        <div>
                            <h3>{this.state.question}</h3>
                            <form>
                                {this.state.options.map((op,key) => {
                                    return (
                                        <React.Fragment>
                                            <input type="radio"/><span>{op.optionAns}</span>
                                        </React.Fragment>
                                    )
                                })}
                            </form>  
                        </div>
                    </div>
                    <div className="block">
                    <textarea name="question" placeholder="add question" 
                    value={this.state.question} onChange={this.handelChange}
                    className="question" cols="3" rows="3"/>
                    <br />
                    <div className="options">
                        {opts}
                    </div>
                    <br />
                    <div className="ops">
                        <input name="option" type="text" placeholder="option"
                        value={this.state.option} onChange={this.handelChange}
                        className="option"/> 
                        <br />
                        <input name="optionAns" type="text" placeholder="option"
                        value={this.state.optionAns} onChange={this.handelChange}
                        className="optionAns"/>
                        <br />
                        <button onClick={this.addOption} className="add-option">add</button>
                    </div>
                    <input name="ans" type="text" placeholder="ans" value={this.state.ans}
                    onChange={this.handelChange} className="ans"/><br />
                    <button onClick={this.addQuestion} className="add-question">add question</button>
                    </div>
                    </div>
            </div>
        )
    }
}

export default AddQuestion