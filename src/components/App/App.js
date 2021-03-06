import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute'
import LearningRoute from '../../routes/LearningRoute/LearningRoute'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import AddWordRoute from '../../routes/AddWordRoute/AddWordRoute.js'
import WordRoute from '../../routes/WordRoute/WordRoute.js'
import './App.css'
import LangContext from "../../contexts/LangContext";
import LangService from "../../services/lang-service";
import LandingPageRoute from '../../routes/LandingPageRoute/LandingPageRoute'
import DemoRoute from '../../routes/DemoRoute/DemoRoute'
export default class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
    LangService.getUserLanguage().then(res => {
      // console.log(res);
      this.setState({
        languageId: res.language.id,
        language: res.language.name,
        totalScore: res.language.total_score,
        words: [...res.words]
      }, () => {
          console.log(this.state)
      });
    });
  }


  handleAddWord = (word) => {
    this.setState({
      words: [
        ...this.state.words,
        word
      ]
    }, () => {
      console.log('after add word')
        console.log(this.state.words)
    })
  }
  handleDeleteWord = (wordId) => {
    this.setState({
      words:this.state.words.filter(word => word.id !== wordId)
    }, () => {
      console.log('after delete word')
      console.log(this.state.words)
    })
  }



  render() {
    const value = {
      languageId: this.state.languageId,
      language: this.state.language,
      words: this.state.words,
      totalScore: this.state.totalScore,
      addWord: this.handleAddWord,
      delWord:this.handleDeleteWord,
     
    };
    const { hasError } = this.state
    return (
      <div className='App'>
              <LangContext.Provider value={value} role="main">

        <header className='App__Header'>

        <Header  />
        </header>
        <main className='App__Main'>
          {hasError && (
            <p>There was an error! Oh no!</p>
          )}
          <Switch>
            <PrivateRoute
              exact
              path={'/'}
              component={DashboardRoute}
            />
            <PrivateRoute
              path={'/learn'}
              component={LearningRoute}
            />
               <PrivateRoute
              path={'/add-word'}
              component={AddWordRoute}
            />
            <PrivateRoute
              path={'/word/:id'}
              component={WordRoute}
              />
                <PublicOnlyRoute
              path={'/landing'}
              component={LandingPageRoute}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
              />
              <PublicOnlyRoute
                exact
              path={'/demo'}
              component={DemoRoute}
            />
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>
        </LangContext.Provider>
      </div>
    );
  }
}
