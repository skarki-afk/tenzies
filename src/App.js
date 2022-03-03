import React,{useState} from "react";
import Dice from "./Dice";

const App =()=>{
  const generateNewDie =()=>{
    return {
      value: Math.floor(Math.random() * 6 ) + 1,
      isHeld: false
    }
  } 
  
  
  const dieValue =()=>{
    const newArr = []
    for (let i =0; i< 6; i++){
      newArr.push(generateNewDie())
    }
    return newArr;
  }
  const [dice,setDice] = useState(dieValue)
  

  const diceElements = ()=>{
    setDice(prevDice=> prevDice.map(die=>{
      return {
        
      }
    }
       
    ))

  }
  
  return(
    <div className="app-body">
      <Dice/>
    </div>
  )
}

export default App