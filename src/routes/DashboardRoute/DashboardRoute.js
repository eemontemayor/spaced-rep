import React, { Component } from 'react'
import LangService from '../../services/lang-service'
import { Link } from 'react-router-dom';
// import Word from '../../components/Word/Word'
// import TotalScore from '../../components/TotalScore/TotalScore'

class DashboardRoute extends Component {
  state={
    words:[],
    correct_count: 0,
    incorrect_count: 0,

  }
  


  componentDidMount(){
    LangService.getUserLanguage()
    .then(res => {
      console.log(res);
      
      for(const [key,value] of Object.entries(res.language)){
        this.setState({
          [key]:value,
        })
      }
      console.log(this.state)

     
        this.setState({
          words: res.words
        })
      
        console.log(this.state);
     
  
    })
  }



  calcScores = (array) => {
    // let correct_count = array.forEach(i => { return i.correct_count })
    // .reduce((a, b) => { return a + b }) 
      //**REFACTOR   fix edge case , make this an async function ?*/
    let correct_count = array.map(i => { return i.correct_count })
      
     correct_count.some(i => i>0) > 0 ? correct_count.reduce((a, b) => { return a + b }) : correct_count = 0
      
    
        
    let incorrect_count = array.map(i => { return i.incorrect_count })
    incorrect_count.some(i => i>0) > 0 ? incorrect_count.reduce((a, b) => { return a + b }) : incorrect_count = 0
    
    let total_score = correct_count - incorrect_count
console.log('**********')
    console.log(total_score)
    return total_score
    // this.setState({ correct_count, incorrect_count}, () => {
    //   console.log(this.state)

    // })
}



  // renderTotalScore = () => {

    
  // }

  renderWordList=(words)=>{
    
    let word= words.map((item,index)=>{
      return <li key={index}><div className="word-card">
            <h4>{item.original}</h4>        
            <p>correct answer count: {item.correct_count}</p>
            <p>incorrect answer count: {item.incorrect_count}</p>        
        </div></li>
   })
   return word
 }

  render() {

    this.calcScores(this.state.words)//** clean this up dry and kiss */


    let wordList= this.renderWordList(this.state.words);
    // let totalScore = this.renderTotalScore(this.getTotalScore())

    return (
      // <LangContext.Provider value={value} role="main">
      <main> 
        <div> 
          <section>
            <h2>
              {this.state.name}
            </h2>
    
            {/* <TotalScore score={this.state.total_score} />          */}
            Total correct answers: {this.state.total_score} 
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
    // </LangContext.Provider>
    );
  }
}

export default DashboardRoute
