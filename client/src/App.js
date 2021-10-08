import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Toonify from './components/toonify/Toonify';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Toonify}/>
        {/* <Route exact path='/editor' component={Toonify}/> */}
      </Switch>
    </>
  )
}

export default App
