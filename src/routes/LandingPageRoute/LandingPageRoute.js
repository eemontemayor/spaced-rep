import React, { Component } from "react";
import {Link} from 'react-router-dom';
import dog from '../../images/dog.png'
import cat from '../../images/cat.png'
import please from '../../images/please.png'
import offer from '../../images/offer.png'
import job from '../../images/job.png'
import './LandingPageRoute.css';

class LandingPageRoute extends Component {


  render() {
    return (
          <div className='tutorial-container'>
            <div className='onboard-header'>
              <h1 className='title'>
              REPS 
          
              </h1>
            </div>
            <div className='tutorial-pics'>
             
              <img src={please} alt='please' />
              <img src={offer} alt='offer' />
              <img src={job} alt='job' />
           
            </div>
            <h3>Get your reps in for the day!</h3>
            <p>
              REPS is a language learning app that will help you learn Spanish using a spaced repetition alogrithm.  
          The more consecutive times you guess the correct translations for a given word the less often you will see said word.
            </p>
        <button className='get-started-btn'>

            <Link to='/register'>GET STARTED</Link>
        </button>
          </div>
    );
  }
}

export default LandingPageRoute;