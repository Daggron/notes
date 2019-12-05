import React from 'react';
import './App.css';
import ResponsiveDrawer from './components/drawer'
import {BrowserRouter as Router , Route  } from 'react-router-dom';
import Notes from './components/addnotes/notes'
import Home from './home';
import AddNotes from './components/addnotes/add-notes';

function App() {
  return (
    <div className="App">
        <Router>
            <ResponsiveDrawer />
            <Route exact path="/" component={Home} />
            <Route path="/notes" component={Notes} />
            <Route path="/add" component={AddNotes}/>
        </Router>
    </div>
  );
}

export default App;
