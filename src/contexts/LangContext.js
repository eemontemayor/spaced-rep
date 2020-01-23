import React from 'react'

const LangContext = React.createContext({
 
  words:[],
  language:'',
  nextWord: '',
  prevWord:'',
  // wordCorrectCount: [],
  // wordIncorrectCount: [],
  totalScore: [],
  
 
   
   
  })

  export default LangContext