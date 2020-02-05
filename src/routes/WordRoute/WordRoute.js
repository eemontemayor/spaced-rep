import React from 'react' 
import './WordRoute.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LangService from '../../services/lang-service'
import LangContext from '../../contexts/LangContext'
import Word from '../../components/Word/Word'
export default class WordRoute extends React.Component{
    state = {
        word:''
    }
    static defaultProps = {
        history: {
          goBack: () => { }
        },
        match: {
          params: {}
        }
      }
    static contextType= LangContext
    componentDidMount() {
        //Lang service goes here
        let wordId = this.props.match.params.id
        console.log('WordRoute id',wordId)
        LangService.getWordById(wordId)
            .then(res => {
                console.log('here', res.word)
                this.setState({
                   word:res.word
                })
        })

    }

    goBack = () => {
        this.props.history.push('/')
    }
    render() {
     let word = this.state.word
return (
    <div className='word-card-page'>
        <button  className='back-btn'  type='click' onClick={this.goBack}    >      <FontAwesomeIcon size="6x" icon='chevron-circle-left'/></button>
        <Word
    id={word.id}
    translation={word.translation}
    original={word.original}
    correct_count={word.correct_count}
    incorrect_count={word.incorrect_count}
    />
  
</div>
)
}
}