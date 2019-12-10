import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import SelectionPage from './components/SelectionPage'
import './styles/app.scss'

class App extends React.Component {
  render() {
    return (
      <div className='app_container'>
        <Router>
          <Route path="/" exact component={LandingPage} />
          <Route path="/selectionpage" exact component={SelectionPage}/>
        </Router>
      </div>
    )
  }
}

export default App