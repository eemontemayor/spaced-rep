import React, { Component } from 'react'
// import AddWord from '../../components/AddWord/AddWord'
import './AddWordRoute.css'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button' 
import LangService from '../../services/lang-service'

export default class AddWordRoute extends Component {
    state = {
        original: '',
        translation: '',
        memory_value: '',
        
        language:'',
        languageId:'',    
        formValid: false,
        validationMessages: {}
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
            
        })
    }

   

    render() {
        
        return (
            <div>
            <form onSubmit={this.handleSubmit}>

            <Label htmlFor='new-word-input'>

            </Label>
                    <Input name='original'
                        required
                        onChange={this.handleChange}
                    />
                    <Input name='translation'
                        required
                        onChange={this.handleChange}
                    />
                    <Button type='submit'> Add </Button>
                </form>
                
                <h1>This feature will be coming soon!</h1>
        </div>
    )
}
}