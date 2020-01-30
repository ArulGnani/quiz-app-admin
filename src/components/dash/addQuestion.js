import React, { Component } from 'react'
import swal from 'sweetalert'
// css
import "./addQuestionStyle.css"

class AddQuestion extends Component {
    constructor(){
        super()
        this.state = {
            currentUser : "tester",
            quizName : "sample-2",
            allQuestions : [],
            options : [],
            question : "",
            option : "",
            optionAns : "",
            ans : "",
            noKey : false 
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
        let key = this.getKey()
        if(validate === true && key){
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
                        'Content-Type': 'application/json',
                        'auth-key' : key
                    },
                    body : JSON.stringify(obj)
            })
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    console.log(data)
                    swal("new question added")
                    this.renderNewQuestion(data)
                    this.resetInputFields()
                }else{
                    swal("can't add question","something went wrong!...","info")
                    this.resetInputFields()
                }
            })
        }else{
            alert(validate)
        }
    }

    // get key
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


    // render-new-question in question list 
    renderNewQuestion = (data) => {
        let newQuestion = data
        if (newQuestion){
            this.setState({
                allQuestions : [...this.state.allQuestions, newQuestion]
            })
        }
    }

    // reset all the input field 
    resetInputFields = () => {
        this.setState({
            question : "",
            option : "",
            optionAns : "",
            ans : "",
            options : []
        })
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

    // delete-question 
    deleteQuestion = (event) => {
        event.preventDefault()
        let delId = event.target.getAttribute("questionId")
        console.log(event.target)
        console.log(delId)
    } 

    render() {
        let allQuestion  = this.state.allQuestions.map((q,key) => {
            return (
                <div key={key} className="r-main">
                    <h3 className="r-main-q">{ q.question.ques }</h3> 
                    <button  className="r-main-del" questionId={q._id} onClick={this.deleteQuestion}>
                        delete question
                    </button>
                    <div className="r-main-ops">
                        {q.question.options.map((op,key) => {
                            return(
                                <div key={key} className="r-main-op">
                                    <input type="radio"/>{op.optionAns}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        })
        let opts = this.state.options.map((op,key) => {
            return (
                <div key={op.option} id={key}>
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
                    <h3 className="add-title">All question</h3>
                    <div>{ allQuestion }</div>
                </div>
                
                <div className="question-block">
                    <div className="preview-question">
                        <h3 className="preview-question-tit">qustion preview</h3>
                        <div className="preview-question-block">
                            <h3 className="preview-question-block-q">question : {this.state.question}</h3>
                            <h4 className="preview-question-block-a">answer : {this.state.ans}</h4>
                            <form className="preview-question-block-opts">
                                options : 
                                {this.state.options.map((op,key) => {
                                    return (
                                        <React.Fragment>
                                            <input key={key} type="radio" className="preview-question-block-op"/><span key={key+1}>{op.optionAns}</span>
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