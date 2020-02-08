import React, { Component } from 'react'
import AddWordForm from '../../components/AddWordForm/AddWordForm'
import './AddWordRoute.css'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button' 
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import LangService from '../../services/lang-service'
import LangContext from '../../contexts/LangContext'
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

    
// make sure to add a back button in case there is no submission
    handleChange = e => {
        this.setState({
            [e.target.name]:e.target.value
        }, () => {
                //make a lang service call here to a 3rd party dictionary api
                console.log(this.state)
        })
    }

    setNewWord = (original, translation) => {
        
    }



    handleSubmit = (e) => {
        e.preventDefault()
        let word = {
          
            language_id: this.context.languageId,
            original:this.OriginalInput,
            translation: this.TranslationInput,
            memory_value:1,
           
           
        }
        // trimming and form validation happens here
        // make a lang service post call here
        alert('this feature will be coming soon')


        // LangService.postNewWord(word)
        //     .then(res => {
        //     this.props.history.push('/')
        //     })
        //     .catch(error => {
        //         console.error({ error })
        //       })
    }
    goBack = () => {
        this.props.history.push('/')
    }
   

    render() {
        console.log(this.context)
        let userLanguage = this.context.language
        return (<div>
 <button  className='back-btn'  type='click' onClick={this.goBack}    >      <FontAwesomeIcon size="6x" icon='chevron-circle-left'/></button>
            <section className='AddNewWord'> 
                <h2 className='add-word-msg'>Add a new word to your list</h2>
            <AddWordForm onSubmit={this.handleSubmit}>
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
                        required
                        ref={this.TranslationInput}
                        // onChange={this.handleChange}
                        />
                        </div>
                    <Button type='submit' onClick={(e)=>{}} > Submit </Button>
                </AddWordForm>
                
              
        </section>
                        </div>
    )
}
}