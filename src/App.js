import React from "react";
import Dice from "./Dice";
import {nanoid} from "nanoid";
import Confetti from "react-confetti"

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
  const [score,setScore] = React.useState(0)
  const [highScore,setHighScore]= React.useState([])
  const [dark,setDark] = React.useState(false)

 

  React.useEffect( ()=>{
    const allHeld = dice.every(die=> die.isHeld)
    const firstValue = dice[0].value
    const allValue = dice.every(die=>die.value===firstValue)
    if(allHeld && allValue){
      setTenzies(true)
      console.log(score)
      // highScore.push(score)
    }else{
      setTenzies(false)
    }
  },
  [dice])


  // React.useEffect( ()=>{
  //   const allHeld = dice.every(die=> die.isHeld)
  //   const firstValue = dice[0].value
  //   const allValue = dice.every(die=>die.value===firstValue)
  //   if(allHeld && allValue){
  //     // setHighScore(prevHighScore => prevHighScore.push(score))
  //     highScore.push(score)
  //   }
  // },
  // [dice])

  // React.useEffect (()=>{
  //   const scores = JSON.parse(localStorage.getItem("scores"))
  //   if(scores){
  //     setHighScore(scores)
  //   }
  // },[])

  // React.useEffect (()=>{
  //   localStorage.setItem("scores",JSON.stringify(highScore))
  //   },[highScore])

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
      onClick={()=>holdDice(die.id)}
      dark={dark}/>   
      
  )

    
  const countScore =()=>{
    setScore(prevScore => prevScore + 1)
    }
    
  

  const rollDice=()=>{
    if(!tenzies)
    {setDice(prevDice => prevDice.map(die=>
      die.isHeld?
      die :
      generateNewDie()
      ))}else{
        setTenzies(false)
        setDice(dieValue())
        setScore(-1)
    }
    }
    // const highScoreNum = setHighScore(prevHighScore => Math.min(...prevHighScore))

    // <h5>High Score:{highScoreNum}{highScoreNum > 1? "turns":"turn"}</h5> 
  // console.log(highScore)
    // console.log(typeof highScore)
    const styles = {
      backgroundColor: dark? "white" : "black"
    }
    const toggleBallStyle ={
      backgroundColor: dark? "black" : "white"
    }

    const darkMode =()=>{
      setDark(prevDark=>!prevDark)
    }
  return(
      <div className="main">
        <div className={dark? "dark" : "app-body" }>
          <div className="navbar">
            <h3>Your Score: {score} {score>1?"turns":"turn"}</h3>
            <div className="toggle-btn">
              <span>Dark Mode:</span>
              <span className="toggle" onClick={darkMode} style={styles}>
                <span className={dark? "toggle-ball-left":"toggle-ball-right"} style={toggleBallStyle}></span>
              </span>
            </div>
          </div>
          <h2>Tenzies</h2>
          <p>{tenzies? "You Won!!!":"Roll until all dice are same. Click each die to freeze it at its current value between rolls."}</p>
          <div 
          className="die-body"
          >
            {diceElements}    
          </div>
          {tenzies && <Confetti/>}
          <button
            onClick={ ()=> 
              {rollDice()
              countScore()}}
          className="btn"> 
            {tenzies? "New Game" : "Roll"}
          </button>

        </div>
      </div>
  )
}

export default App