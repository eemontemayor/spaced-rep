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
    postWord(guess){
      return fetch(`${config.API_ENDPOINT}/language/guess`, {
        method: 'POST',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
              'content-type': 'application/json',
            },
            body: JSON.stringify({guess})
      })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      ) 
    },


}

export default LangService