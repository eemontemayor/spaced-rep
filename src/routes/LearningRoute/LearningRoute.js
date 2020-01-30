import React, { Component } from "react";
import LangContext from "../../contexts/LangContext";
import LangService from "../../services/lang-service";
import Button from "../../components/Button/Button";
import { Label, Input } from "../../components/Form/Form";
import "./LearningRoute.css";
class LearningRoute extends Component {
  state = {
    guess_input: "",
    prevWord: "",
    nextWord: "",
    answer: null
  };
  static contextType = LangContext;
  GuessInput = React.createRef();

  componentDidMount() {
    LangService.getHeadWord().then(res => {
      console.log(res);
      for (const [key, value] of Object.entries(res)) {
        this.setState({
          [key]: value
        });
      }
    });
    this.GuessInput.current.focus();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const guess = this.state.guess_input.toLowerCase();
    console.log(guess);
    //keeps track of word user just finished submitting
    this.setState(
      {
        prevWord: this.state.nextWord,
        prevIncorrectCount: this.state.wordIncorrectCount,
        prevCorrectCount: this.state.wordCorrectCount
      },
      () => {
        LangService.postGuess(guess).then(res => {
          for (const [key, value] of Object.entries(res)) {
            this.setState({
              [key]: value
            });
          }
        });
      }
    );
  };

  handleNext = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      answer: null
    });
  };
  render() {
    //when there is an answer
    let message = null;
    //when the user has not entered anything
    let displayForm = null;
    let wordData = null;
    if (this.state.isCorrect) {
      message = (
        <>
          <h2 className="feedback-message">You were correct! :D</h2>
        </>
      );
      displayForm = (
        <>
          <Button
            type="click"
            className="NextWordBtn"
            onClick={this.handleNext.bind(this)}
          >
            Try another word!
          </Button>
        </>
      );
      wordData = (
        <>
          <p className="WordData green">{`correct guesses: ${this.state
            .prevCorrectCount + 1}`}</p>
          <p className="WordData">{`incorrect guesses: ${this.state.prevIncorrectCount}`}</p>
        </>
      );
    } else {
      message = (
        <>
          <h2 className="feedback-message">Good try, but not quite right :(</h2>
          <p>{`The correct translation for ${this.state.prevWord} was ${this.state.answer} and you chose ${this.state.guess_input}!`}</p>
        </>
      );
      wordData = (
        <>
          <p className="WordData">{`correct guesses: ${this.state.prevCorrectCount}`}</p>
          <p className="WordData red">{`incorrect guesses: ${this.state
            .prevIncorrectCount + 1}`}</p>
        </>
      );
      //if the user entered the wrong word
      displayForm = (
        <>
          <Button
            type="click"
            className="NextWordBtn"
            onClick={this.handleNext.bind(this)}
          >
            Try another word!
          </Button>
        </>
      );
    }

    //for if there is no answer
    if (!this.state.answer) {
      message = (
        <>
          <h2>Translate the word:</h2>{" "}
          <span id="quest-word">{this.state.nextWord}</span>
        </>
      );
      displayForm = (
        <>
          <form id="quest-form" onSubmit={this.handleSubmit.bind(this)}>
            <Label htmlFor="learn-guess-input" className="quest-text">
              What's the translation for this word?
            </Label>
            <br />
            <Input
              ref={this.GuessInput}
              type="text"
              id="learn-guess-input"
              name="guess_input"
              onChange={this.handleChange.bind(this)}
              required
            />
            <Button className="guess-submit-btn" type="submit">
              Submit your answer
            </Button>
          </form>
        </>
      );
      wordData = (
        <>
          <p className="WordData">{`incorrect guesses: ${this.state.wordCorrectCount}`}</p>
          <p className="WordData">{`correct guesses: ${this.state.wordIncorrectCount}`}</p>
        </>
      );
    }

    return (
      <div role="main" className="question-card">
        <main className="score-form">
          <div className="DisplayFeedback">{message}</div>
          {displayForm}
          <div className="DisplayScore">
            <p className="total-score-quest-fb">{`Total Score: ${this.state.totalScore}`}</p>
          </div>
          <div className="DisplayWordData">
            WORD STATS:
            {wordData}
          </div>
        </main>
      </div>
    );
  }
}

export default LearningRoute;
