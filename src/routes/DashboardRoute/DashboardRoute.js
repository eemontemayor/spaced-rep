import React, { Component } from 'react'
import LangService from '../../services/lang-service'
import { Link } from 'react-router-dom';
import Word from '../../components/Word/Word'
import TotalScore from '../../components/TotalScore/TotalScore'
import LangContext from '../../contexts/LangContext';


class DashboardRoute extends Component {
  state = {
    languageId:null,
    language:'',
    words: [],
    nextWordId:null,
    total_score:null,

  }
  


  componentDidMount() {

    LangService.getUserLanguage()
    .then(res => {
  
      this.setState({
        languageId:res.language.id,
        language:res.language.name,
        total_score: res.language.total_score,
        nextWordId: res.language.head,
        words:[...res.words]
      })
        console.log(this.state);

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
      total_score:this.state.total_score
    }



    return (
      <LangContext.Provider value={value} role="main">
      <main> 
        <div> 
          <section>
            <h2>
              {this.state.language}
            </h2>
    
            <TotalScore score={this.state.total_score} />         
          
            <h3>
              Words to practice
            </h3>
            <ul>
                {wordList}
            </ul>
            <button>
              <Link to={`/learn`}>Start practicing</Link>
            </button>
          </section>
        </div>
      </main>
     </LangContext.Provider>
    );
  }
}

export default DashboardRoute
