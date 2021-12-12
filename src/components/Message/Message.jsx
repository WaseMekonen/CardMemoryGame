import React from "react";
import './Message.css'

export default function Message(props) {
  return (
    <div>
        <button className="start-button" onClick={props.startGame}>Start Game</button>
      <h2>Timer: {props.timer}</h2>
      <h2>Turns: {props.turns}</h2>
      <div className="wining-message" style={{display: props.isPlayerWon ? 'block' : 'none' }}>
            <h1>Game Over</h1>
            <h2>You Won--your time is {props.timer} sec</h2>
            <h2>You did after {props.turns} times</h2>
      </div>
    </div>
  );
}



