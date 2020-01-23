import React, { Component } from 'react'
import LangContext from '../../contexts/LangContext'
import LangService from '../../services/lang-service'
import Button from '../../components/Button/Button'
import { Label,Textarea , Input} from '../../components/Form/Form'
class LearningRoute extends Component {
  state= {
    guess_input: '',
    prevWord:'',
    nextWord: '',
    answer:null,
    wordCorrectCount: null,
    wordIncorrectCount: null,
    isCorrect:false
    
  }
  static contextType = LangContext


  componentDidMount(){
    LangService.getHeadWord()
      .then(res => {
        console.log(res)
        for(const [key,value] of Object.entries(res)){
          this.setState({
            [key]:value,
          })
      }
    })
    console.log(this.state)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    const guess = this.state.guess_input.toLowerCase()
    console.log(guess)
    //keeps track of word user just finished submitting
    this.setState({
      prevWord: this.state.nextWord
    }, () => {
        console.log(this.state)

    });

    LangService.postGuess(guess)
    .then(res => {
      for(const [key,value] of Object.entries(res)){
        this.setState({
          [key]:value,
        })
      }
    })
  }

  handleNext=(e)=>{
    e.preventDefault()
    console.log('here')
    console.log(this.state)
    this.setState({
      ...this.state,
      answer: null,
      isCorrect:false
    })
  }
  render() {
        //when there is an answer
        let message = null;
        //when the user has not entered anything
        let displayForm = null;
    
        if(this.state.isCorrect) {
          message = <><h2>You were correct! :D</h2></>;
          displayForm = <><Button type='click' onClick={this.handleNext.bind(this)}>Try another word!</Button></>
        } else {
          message = <><h2>Good try, but not quite right :(</h2>
          <p>{`The correct translation for ${this.state.prevWord} was ${this.state.answer} and you chose ${this.state.guess_input}!`}</p></>;
          
          //if the user entered the wrong word
          displayForm = <><Button type='click' onClick={this.handleNext.bind(this)}>Try another word!</Button></>
        } 
    
        //for if there is no answer
        if (!this.state.answer) {
          message = <><h2>Translate the word:</h2> <span>{this.state.nextWord}</span></>;
          displayForm = <>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <Label htmlFor='learn-guess-input'>What's the translation for this word?</Label>
              <Input type='text' id='learn-guess-input' name='guess_input' onChange={this.handleChange.bind(this)} required />
              <Button type='submit'>Submit your answer</Button>
            </form></>
        }
    
    
    
      return (
        <div role="main">
        <main className="score-form">
          <div className="DisplayFeedback">
          {message}
          </div>
          {displayForm}      
          <div className="DisplayScore">
            <p>{`Your total score is: ${this.context.total_score}`}</p>
          </div>
            <p>{`You have answered this word correctly ${this.state.wordCorrectCount} times.`}</p>
            <p>{`You have answered this word incorrectly ${this.state.wordIncorrectCount} times.`}</p>
        </main>
         </div>
      );
    }
}

export default LearningRoute
