import React, { Component } from 'react'
import LangService from '../../services/lang-service'
import { Link } from 'react-router-dom';
import Word from '../../components/Word/Word'
import TotalScore from '../../components/TotalScore/TotalScore'
import LangContext from '../../contexts/LangContext';
import './DashboardRoute.css'

class DashboardRoute extends Component {
  state = {
    languageId:null,
    language:'',
    words: [],
    nextWordId:null,
    totalScore:null,

  }
  


  componentDidMount() {

    LangService.getUserLanguage()
    .then(res => {
      console.log(res);
      this.setState({
        languageId:res.language.id,
        language:res.language.name,
        totalScore: res.language.total_score,
        // nextWordId: res.language.head,
        words:[...res.words]
      }, () => {
          
        console.log(this.state);
      })

    })
  }





  generateWordList=(words)=>{
    
      let wordList= words.map((item,index)=>{
        return <li key={index}>
          <Word
            original={item.original}
            correct_count={item.correct_count}
            incorrect_count={item.incorrect_count}
          />
        </li>
      })
    return wordList
  }

  render() {

   


    let wordList= this.generateWordList(this.state.words);
   

    const value = {
      languageId:this.state.languageId,
      language:this.state.language,    
      words:this.state.words,               
      totalScore:this.state.totalScore
    }



    return (
      <LangContext.Provider value={value} role="main">
      <main> 
        <div className='parent'> 
            
              <div className='NameContainer'>

            <h2 className='lang-name'>{this.state.language}</h2>
              </div>
            <div className='ScoreContainer'>

            <TotalScore score={this.state.totalScore} />         
            </div>
            <div className='StartBtnContainer'>
              
            <button className='start-pract-btn'>
                <Link to={`/learn`}><p>
                  Start practicing
                </p>
                  </Link>
            </button>
          </div>
           
            <div className='ListContainer'>
            <h3 className='list-msg'>
              Words to practice
            </h3>
            <ul className='word-list'>
                {wordList}
            </ul>
           
          </div>
        </div>
      </main>
     </LangContext.Provider>
    );
  }
}

export default DashboardRoute
