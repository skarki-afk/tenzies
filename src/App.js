import React from "react";
import Dice from "./Dice";
import {nanoid} from "nanoid"

const App =()=>{
  const generateNewDie =()=>{
    return {
      value: Math.floor(Math.random() * 6 ) + 1,
      isHeld: false,
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
  const [tenzies,setTenzies] = React.useState(false)

  React.useEffect( ()=>{
    const allHeld = dice.every(die=> die.isHeld)
    const firstValue = dice[0].value
    const allValue = dice.every(die=>die.value===firstValue)
    if(allHeld && allValue){
      console.log("You Won!!")
      setTenzies(true)
    }else{
      setTenzies(false)
    }
  },
  [dice])
  const holdDice =(id)=>{
    setDice(prevDice => prevDice.map(die=>
      id === die.id? 
      {...die,
      isHeld:!die.isHeld}:
      die
      ))
  }

  const diceElements = dice.map(
    die => <Dice 
        key = {die.id}
        isHeld = {die.isHeld} 
        value = {die.value}
        id={die.id}
        onClick={()=>holdDice(die.id)}/>   
      
    )

  const rollDice=()=>{
    if(!tenzies)
    {setDice(prevDice => prevDice.map(die=>
      die.isHeld?
      die :
      generateNewDie()
      ))}else{
        setTenzies(false)
        setDice(dieValue())
      }
  }
  
  
  return(
    <main>
      <div className="app-body">
        <h2>Tenzies</h2>
        <p>Roll until all dice are same. Click each die to freeze it at its current value between rolls.</p>
        <div 
        className="die-body"
        >
          {diceElements}    
        </div>

        <button
          onClick={rollDice}
         className="btn"> 
          {tenzies? "New Game" : "Roll"}
        </button>

      </div>
    </main>
  )
}

export default App