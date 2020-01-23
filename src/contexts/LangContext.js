import React from 'react'

const LangContext = React.createContext({
  //   language:'',
  //   words:[],
  //   numCorrect:[],
  // numWrong: [],
  language:'',
  nextWord: '',
  prevWord:'',
  // wordCorrectCount: [],
  // wordIncorrectCount: [],
  // totalScore: [],
  words: [],
 
    correct_count: 0,
  incorrect_count: 0,
    total_score:0,
  })

  export default LangContext