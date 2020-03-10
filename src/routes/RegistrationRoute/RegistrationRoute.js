import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import './RegistrationRoute.css'
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
        <button className='demo-btn'>
          <Link to='/demo'>DEMO</Link>
        </button>
      </section>
    );
  }
}

export default RegistrationRoute
