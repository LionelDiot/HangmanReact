import React, { useState, useEffect } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';

const URL = `https://random-word-api.herokuapp.com/word?number=1`;

const HangmanGame = () => {
  const [gameOn, setGameOn] = useState(false);
  const [lives, setLives] = useState(20);
  const [answer, setAnswer] = useState([]);
  const [progress, setProgress] = useState([]);
  const [tries, setTries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const generateGame = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    const word = data[0].toLowerCase();
    setLives(5);
    setAnswer(word.split(""));
    setProgress(Array(word.length).fill("_"));
    setTries([]);
    setGameOn(true);
    setShowModal(false);
  };

  const handleGuess = (event) => {
    event.preventDefault();
    const guess = event.target.elements.guess.value.toLowerCase();
    if (!guess || !/^[a-z]$/.test(guess)) {
      alert(`"${guess}" is not a valid guess.`);
      return;
    }
    if (tries.includes(guess)) {
      alert(`You already tried "${guess}".`);
      return;
    }
    setTries([...tries, guess]);
    if (answer.includes(guess)) {
      setProgress(
        progress.map((char, index) => {
          if (answer[index] === guess) {
            return guess;
          } else {
            return char;
          }
        })
      );
    } else {
      setLives(lives - 1);
    }
    event.target.reset();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (lives === 0) {
      setModalMessage(`You lost! The answer was "${answer.join('')}".`);
      setShowModal(true);
    } else if (!progress.includes("_")) {
      setModalMessage(`You won! The answer was "${answer.join('')}".`);
      setShowModal(true);
    }
  }, [lives, progress, answer]);

  return (
    <div>
      <Button onClick={generateGame}>Generer une nouvelle partie !</Button>
      {gameOn && (
        <Container>
          
          <h1>{progress.join(' ')}</h1>
          <p>Tu as déjà essayé : {tries.toString()}</p>
          <p>Il te reste {lives.toString()} vies.</p>
          { (lives>=0)&& (<form onSubmit={handleGuess}> 
                            <input type="text" name="guess" maxLength="1" />
                            <Button type="submit">Guess</Button>
                            </form>
                           )
            }
          
        </Container>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={generateGame}>
            New Game
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HangmanGame;
