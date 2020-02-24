import React, { Component } from "react";
import LangService from "../../services/lang-service";
import { Link } from "react-router-dom";
import Word from "../../components/Word/Word";
import TotalScore from "../../components/TotalScore/TotalScore";
import LangContext from "../../contexts/LangContext";
import "./DashboardRoute.css";
import Tooltip from '../../components/Tooltip/Tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class DashboardRoute extends Component {
  state = {
    languageId: null,
    language: "",
    words: [],
    nextWordId: null,
    totalScore: null
  };
static contextType=LangContext

  componentDidMount() {
    LangService.getUserLanguage().then(res => {
      console.log('here');
      this.setState({
        languageId: res.language.id,
        language: res.language.name,
        totalScore: res.language.total_score,
        words: [...res.words]
      }, () => {
          console.log(this.state)
      });
    });
  }

  generateWordList = words => {
    let wordList = words.map((item, index) => {
      return (
        <li key={index}>
          <Link to={`/word/${item.id}`}>
          
          <Word
            id={item.id}
            original={item.original}
            correct_count={item.correct_count}
            incorrect_count={item.incorrect_count}
              />
                

            </Link>
        </li>
      );
    });
    return wordList;
  };
  
  render() {
    let wordList = this.generateWordList(this.state.words);

    

    return (
   
        <main>
          <div className="DashboardPage">
            <div className="NameContainer">
              <h2 className="lang-name">{this.state.language}</h2>
            </div>
            <div className="ScoreContainer">
              <TotalScore score={this.state.totalScore} />
            </div>
            <div className='StartBtnContainer'>

              <Link to={`/learn`}>
                <button className="start-pract-btn">
                  <FontAwesomeIcon icon='play-circle' size='6x'><p>Start practicing</p></FontAwesomeIcon>
                
            </button>
              </Link>
            </div>
            <div className="ListContainer">
              <h3 className="list-msg">Words to practice</h3>
                <ul className="word-list">
                  {wordList}
              <li className='word-card'>

              <Link to={'/add-word'} >
                  <button className='add-word-btn'>
                    <Tooltip message='add a word to list'>
                      <FontAwesomeIcon size='lg' icon='plus'/>
                    </Tooltip>
                  </button>
                </Link>
              </li>
                </ul>
            </div>
          </div>
        </main>
    
    );
  }
}

export default DashboardRoute;
