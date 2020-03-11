import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import './RegistrationRoute.css'
import Button from '../../components/Button/Button'
class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <section>
        <h2 className='regist-title'>Sign up</h2>
        <p className='regist-desc'>
          Practice learning a language with the spaced reptition revision technique.
        </p>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
          <Link to='/demo'>
        <Button className='demo-btn'type='click'>
            DEMO
        </Button>
            </Link>
      </section>
    );
  }
}

export default RegistrationRoute
