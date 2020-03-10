import React from "react";
import "./DemoRoute.css";
import Word from '../../components/Word/Word'
import Button from "../../components/Button/Button";
import { Label, Input } from "../../components/Form/Form";

import { Link } from "react-router-dom";


export default class DemoRoute extends React.Component {
    state = {
        words: [],
        guess_input:'',
        headWord: '',
        translation: '',
        counter: 0,
      };
  GuessInput = React.createRef();
    

    componentDidMount() {
        const demoWords= [
            {
              id: 1,
              original: "perro",
              translation: "dog",
              correct_count: 0,
              incorrect_count: 0
            },
            {
              id: 2,
              original: "gato",
              translation: "cat",
              correct_count: 0,
              incorrect_count: 0
            },
            {
              id: 3,
              original: "mano",
              translation: "hand",
              correct_count: 0,
              incorrect_count: 0
            },
            {
              id: 4,
              original: "elefante",
              translation: "elephant",
              correct_count: 0,
              incorrect_count: 0
            },
            {
                id: 5,
                original: 'casa',
                translation: 'home',
                correct_count: 0,
                incorrect_count:0
            },
            {
                id: 6,
                original: 'sol',
                translation: 'sun',
                correct_count: 0,
                incorrect_count:0
            },
            
        
        ]
        
    
        this.setState({
            words: demoWords,
        
        }, () => {
            for (const [key, value] of Object.entries(demoWords[0])) {
                this.setState({
                    [key]: value
                });
            }
        })
        this.GuessInput.current.focus();
    }

    generateDemoList = words => {
        let wordList = words.map((item, index) => {
          return (
            <li key={index}>
         
              
              <Word
                id={item.id}
                original={item.original}
                correct_count={item.correct_count}
                incorrect_count={item.incorrect_count}
                  />
                    
    
               
            </li>
          );
        });
        return wordList;
      };
    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        }, () => {
                console.log(this.state)
        });
      };
    handleNext = e => {
        e.preventDefault();
        this.setState({
          ...this.state,
          answer: null
        });
      };
    handleSubmit = e => {
        e.preventDefault();
        let wordList = this.state.words
        let headWord = this.state.headWord
        let counter = this.state.counter
        const guess = this.state.guess_input.toLowerCase();
        console.log(wordList)
        if (headWord === guess && counter< 3) {
            if (counter === 0) {
                alert('When you guess the word correctly, the word will be inserted further down the list')
     
            }
            if (counter === 1) {
                alert('Your progress is saved on the back end, using a Linked List')
            
            }
            if (counter === 2) {
                alert('Almost Done')
  
            }
            let oldHeadWord = wordList.shift()
        
            oldHeadWord.correct_count += 1
            let index = oldHeadWord.correct_count * 2
            wordList.splice(index, 0, oldHeadWord)
            console.log(wordList)
            this.setState({
                words: wordList,
                counter: this.state.counter + 1
            
            }, () => {
                for (const [key, value] of Object.entries(wordList[0])) {
                    this.setState({
                        [key]: value
                    });
                }
            })
        }
    
    if (headWord === guess  && counter === 3) {
        alert('The more consecutive correct guesses for a given word will push that word even further down so you will see it less often')
        let oldHeadWord = wordList.shift()
        
        oldHeadWord.correct_count += 1
        let index = oldHeadWord.correct_count * 2
        wordList.splice(index, 0, oldHeadWord)
        console.log(wordList)
        this.setState({
            words: wordList,
            counter: this.state.counter + 1
            
        }, () => {
            this.setState({
                original: wordList[0].original,
                translation: 'malarkey',
                incorrect_count: wordList[0].incorrect_count,
                correct_count:wordList[0].correct_count,
        })
           
            }
        )
    }
   
    
    if (counter === 4) {
              alert('But beware: if you answer a word incorrectly, you will see the word again soon')
            
              let oldHeadWord = wordList.shift()
        
              oldHeadWord.incorrect_count += 1
              let index = 1
              wordList.splice(index, 0, oldHeadWord)
              console.log(wordList)
              this.setState({
                  words: wordList,
                  counter: this.state.counter + 1
                  
              }, () => {
                for (const [key, value] of Object.entries(wordList[0])) {
                    this.setState({
                        [key]: value
                    });
                }
                  }
              )
            }
    };
    
        render() {
        let wordList = this.generateDemoList(this.state.words)
        let headWord = this.state.original
        let translation = this.state.translation
     
        // console.log(this.state.headWord)
        return (
            <div className='DemoPage'>
    <div className='question-card'>
                <>
          <h2>Translate the word:</h2>{" "}
                        <span id="quest-word">
                            {headWord}
                        </span>
        </>
                <form id="quest-form"  onSubmit={this.handleSubmit}>
            <Label htmlFor="learn-guess-input" className="quest-text">
              What's the translation for this word?
            </Label>
            <br />
                        <Input
                         
                            ref={this.GuessInput}
                            type="text"
                            id="learn-guess-input"
                            name="guess_input"
                            value={translation }
                            disabled
              onChange={this.handleChange.bind(this)}
              required
                        />
                        <Button className="guess-submit-btn" type='submit' >
                        {this.state.counter < 5 ? 'Submit your answer': <Link to='/landing'>DONE</Link> }  
              {/* Submit your answer */}
            </Button>
                        
          </form>
                </div>
            <div className="ListContainer">
    <h3 className="list-msg">DEMO Word List</h3>
      <ul className="word-list">
        {wordList}
  
      </ul>
                </div>
            
            </div>
    
    )
  }
}
