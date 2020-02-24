import React, { Component } from 'react'
import AddWordForm from '../../components/AddWordForm/AddWordForm'
import './AddWordRoute.css'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button' 
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import LangService from '../../services/lang-service'
import LangContext from '../../contexts/LangContext'
import Translations from '../../components/Translations/Translations'
import Tooltip from '../../components/Tooltip/Tooltip'



export default class AddWordRoute extends Component {
     
    static defaultProps = {
    history: {
      push: () => { }
    },
    }
    
    TranslationInput = React.createRef();
    OriginalInput = React.createRef()

    static contextType = LangContext
    
    state = {
        original: '',
        translation: '',
        originalValid: false,
        translationValid:false,
        validationMessages: {}
    }

    componentDidMount() {
        this.TranslationInput.current.focus() 
    }

    

    handleChange = e => {
        this.setState({
            [e.target.name]:e.target.value
        }, () => {
                
                console.log(this.state)
        })
    }

    goBack = () => {
        this.props.history.push('/')
    }





    handleSubmit = (e) => {
        e.preventDefault()

        
        
        let newWord = {
            
            original:this.state.original,
            translation: this.state.translation,
            language_id: this.context.languageId,
            
            
        }
        console.log(newWord,'<=== new word')
    
        LangService.postNewWord(newWord)
            .then(word => {
                console.log(word)
            // this.context.addWord(word)
            this.props.history.push(`/word/${word.id}`)
            })
            .catch(error => {
                console.error({ error })
              })
    }





    // handleSearchSubmit = (e) => {
    //     e.preventDefault()
    //     console.log(this.state.translation)
    //     console.log(this.TranslationInput.value,'TransInput')
    //     LangService.getTranslations(this.state.translation)
    //     .then(res => {
    //         console.log(res)    
    //         this.setState({
    //             results:res.body.matches
    //         })
    //     })
    // }

    setWord = (orig, trans) => {

        console.log(orig, trans,"<--")

        let original = orig.trim()
        let translation = trans.trim()
        this.setState({original,translation},()=>this.validateWord(original,translation))
    }

    validateWord = (original, translation) => {
        const validationMessages = { ...this.state.validationMessages }
        let originalValid = true;
        let translationValid = true;

        if (original.length < 2 || original.length > 20) {
            validationMessages.original = 'Spanish word must be at least 2 characters long'
            originalValid = false
            console.log(' spanish word error if less than two')
            throw Error
        } else if (translation.length < 2 || translation.length > 20) {
            validationMessages.translation = 'English word must be at least 2 characters long'
            translationValid = false
            console.log('English word error if less than two')
            throw Error
        } else {
            this.setState({validationMessages, originalValid, translationValid}, this.validateForm);

        }
    }
    validateForm = () => {
        this.setState({
            formValid: this.state.originalValid && this.state.translationValid
        })
    }
  
   

    render() {
        console.log(this.context)

        let userLanguage = this.context.language
        return (
        <div>
            <button className='back-btn' type='click' onClick={this.goBack}>
                <FontAwesomeIcon size="6x" icon='chevron-circle-left' />
            </button>

            <section className='AddNewWord'> 
                <h2 className='add-word-msg'>Add a new word to your list</h2>
                <AddWordForm
                    onSubmit={this.handleSubmit}
                >
                    <div className='field-original'>
                        

  
                      <Label htmlFor='original-word-input'>
                {userLanguage}
                        </Label>
                    <Input name='original'
                        id='original-word-input'
                        required
                        ref={this.OriginalInput}
                        // onChange={this.handleChange}
                        
                        />
                    </div>
                    <div className='field-translation'>

                           <Label htmlFor='translation-word-input'>
                    English:
                    </Label>
                    <Input name='translation'
                        id='translation-word-input'
                        ref={this.TranslationInput}
                        // onChange={this.handleChange}
                        required
                        />
                    </div>
                
                        <Button type='submit' onClick={(e) =>this.setWord(this.OriginalInput.current.value, this.TranslationInput.current.value)} > Submit </Button>
                </AddWordForm>
                
              
            </section>
            {/* <div className='translation-container'>
                    <Button className='search-btn' type='click' onClick={this.handleSearchSubmit}><Tooltip message='search for translations'>
                      <FontAwesomeIcon size='lg' icon='search' />
                    </Tooltip></Button>

            {this.state.results && <Translations className='trans-results'results={this.state.results}string={this.state.searchStr}/> }
                    </div> */}
                        </div>
    )
}
}