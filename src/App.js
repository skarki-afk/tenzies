import React from "react";
import Dice from "./Dice";
import {nanoid} from "nanoid"

const App =()=>{
  const generateNewDie =()=>{
    return {
      value: Math.floor(Math.random() * 6 ) + 1,
      isHeld: true,
      id: nanoid()
    }
  } 
  const dieValue =()=>{
    const newArr = []
    for (let i =0; i < 10; i++){
      newArr.push(generateNewDie())
    }
    return newArr;
  }
  
  
  const [dice,setDice] = React.useState(dieValue())
  

  
  const diceElements = dice.map(
    die => <Dice 
        key = {die.id}
        isHeld = {die.isHeld} 
        value = {die.value}
        id={die.id}/>   
      
    )

  
  
  return(
    <main>
      <div className="app-body">
        <h2>Tenzies</h2>
        <p>Roll until all dice are same. Click each die to freeze it at its current value between rolls.</p>
        <div className="die-body">
          {diceElements}    
        </div>

        <button className="btn"> 
          Roll
        </button>

      </div>
    </main>
  )
}

export default App