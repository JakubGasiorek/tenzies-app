import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [counter, setCounter] = React.useState(0)
  const [bestScore, setBestScore] = React.useState(JSON.parse(localStorage.getItem("best")) || 0);


  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        if (counter < bestScore || bestScore === 0) {
          localStorage.setItem("best", counter);
          setBestScore(counter);
        }
    }
  },[dice])

  function generateNewDice(){
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }
    
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(generateNewDice())
      }
      return newDice
  }

  function rollDice() {
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld
        ? die
        :generateNewDice()
      }))
      setCounter(counter + 1)
    }else{
      setDice(allNewDice())
      setTenzies(false)
      setCounter(0)
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id 
        ? {...die, isHeld: !die.isHeld} 
        :die
    }))
  }

  const diceElements = dice.map(die => (
    <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)}
    />
  ))

  return (
      <main>
        {tenzies && <Confetti/>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
            {diceElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>
        <div className="score">        
          <p>Rolls: {counter}</p>
          <p>Best: {bestScore}</p>
        </div>
      </main>
  )
}