import 'unfetch/polyfill'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faChevronLeft, faTrashAlt, faCheckDouble, faPen,faChevronCircleLeft, faPlayCircle
} from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import App from './components/App/App'
import './setup-icons'
import './index.css'
import * as serviceWorker from './serviceWorker'
library.add(faPlus, faChevronLeft,faChevronCircleLeft, faTrashAlt,faCheckDouble,faPlayCircle, faPen)
ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

serviceWorker.unregister()
