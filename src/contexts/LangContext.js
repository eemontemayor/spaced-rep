import React from 'react'

const LangContext = React.createContext({
  //   language:'',
  //   words:[],
  //   numCorrect:[],
  // numWrong: [],
  language:'',
  nextWord: '',
  wordCorrectCount: [],
  wordIncorrectCount: [],
  totalScore: [],
  words: [],
  nextWord: '',
    correct_count: 0,
  incorrect_count: 0,
    total_score:0,
  })

  export default LangContext