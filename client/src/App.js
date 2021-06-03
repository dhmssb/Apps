import React from 'react'
import NavBar from './components/Navbar'
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import Createpost from './components/screens/createPost'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path ='/'>
        <Home />
      </Route>
      <Route path ='/signin'>
        <Signin />
      </Route>
      <Route path ='/profile'>
        <Profile />
      </Route>
      <Route path ='/signup'>
        <Signup />
      </Route>
      <Route path ='/create'>
        <Createpost />
      </Route>
    </BrowserRouter>
  );
}

export default App;
