import React, { Component } from 'react'
import AddWordForm from '../../components/AddWordForm/AddWordForm'
import './AddWordRoute.css'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button' 
import LangService from '../../services/lang-service'
import LangContext from '../../contexts/LangContext'
export default class AddWordRoute extends Component {
     
    static defaultProps = {
    history: {
      push: () => { }
    },
    }
    EnglishInput = React.createRef;
    static contextType = LangContext
    
    state = {
        original: '',
        translation: '',
        memory_value: '',
        
        language:'',
        languageId:'',    
        formValid: false,
        validationMessages: {}
    }

    componentDidMount() {
        console.log(this.context, '<------------context')
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

    handleSubmit = (e) => {
        e.preventDefault()
        let word = {}
        // trimming and form validation happens here
        // make a lang service post call here
        LangService.postNewWord(word)
            .then(res => {
            this.props.history.push('/')
        })
    }

   

    render() {
        console.log(this.context)
        let userLanguage = this.context.language
        return (
            <section className='AddNewWord'> 
                <h2>Add a new word to your list</h2>
            <AddWordForm onSubmit={this.handleSubmit}>

            <Label htmlFor='translation-word-input'>
                    English:
                    </Label>
                    <Input name='translation'
                        id='translation-word-input'
                        required
                        onChange={this.handleChange}
                    />
                      <Label htmlFor='original-word-input'>
                {userLanguage}
                        </Label>
                    <Input name='original'
                        id='original-word-input'
                        required
                        onChange={this.handleChange}
                    />
                 
                    <Button type='submit' onClick={(e)=>{}} > Add </Button>
                </AddWordForm>
                
              
        </section>
    )
}
}