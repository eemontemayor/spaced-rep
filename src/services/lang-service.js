import config from '../config'
import TokenService from './token-service'

const LangService ={
    getUserLanguage(){
        return fetch(`${config.API_ENDPOINT}/language`, {
            method: 'GET',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
          })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    getHeadWord(){
      return fetch(`${config.API_ENDPOINT}/language/head`, {
        method: 'GET',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
          })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          ) 
        

  },
  getWordById(id) {
    return fetch(`${config.API_ENDPOINT}/language/word/${id}`, {
      method: 'GET',
          headers: {
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
          },
        })
      .then(res =>
          
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        ) 
      
    },
  postNewWord(word) {
    return fetch(`${config.API_ENDPOINT}/language/word`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        word
      })
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  

    postGuess(guess) {
      return fetch(`${config.API_ENDPOINT}/language/guess`, {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          guess
        })
      })
        .then(res => 
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
  },
    
  deleteWordById(id) {
    return fetch(`${config.API_ENDPOINT}/language/word/${id}`, {
        method: 'DELETE',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
          
        },
      })
      .then(res => {
        if (!res.ok) {
          throw new Error()
        }
      }) 
  },
//   getTranslations(str){
//     return fetch(`
//     https://www.dictionaryapi.com/api/v3/references/spanish/json/language?key=0ffaa569-f894-4a84-bfba-935d9e7ab478`,{
//         method:'GET',
//         headers:{
//           'content-type':'application/json',
//         },
        
//       })
//       .then((res) => 
//       {
      
   
//         if (!res.ok)
//           return res.json().then(e => Promise.reject(e))
//         return res.json()
         
//       })
//       .catch(error => {
//         console.error({error})
//       })
   
    
// }
getTranslations(x){
  return fetch(`${config.API_ENDPOINT}/translation?text=${x}`,{
      method:'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
    
  },
      
    })
    .then((res) => 
    {
    
      console.log('from TranServ', res.body)
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
       
    })
    .catch(error => {
      console.error({error})
    })
 
  
}
}

export default LangService