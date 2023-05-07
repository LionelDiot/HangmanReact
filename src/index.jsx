import React from 'react';
import ReactDOM from 'react-dom';
import HangmanGame from './Components/HangmanGame';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <div className="container">
    <h1>Welcome to the hangman game ! </h1>
    <HangmanGame />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

