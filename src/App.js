import './App.css';
import React from "react";
import Home from './components/Home';
import About from './components/About';
// import Alert from './components/Alert';
import Navbar from './components/Navbar';
import NoteState from './context/notes/noteState';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import {
  BrowserRouter as Router,
  Routes,  // In older version Routes is used as Switch
  Route
} from "react-router-dom";


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {/* <Alert message="A simple danger alert—check it out!"/> */}
          <div className='container'>
            <Routes >
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
