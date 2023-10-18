import { useState } from "react";

const Statistic = ({text, value}) => {  
  return (    
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </>
    )
  }

  const all = good + neutral + bad
  const average = (good - bad) / all;
  const positive = (good / all)*100;  

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="neutral" value={neutral}></Statistic>
          <Statistic text="bad" value={bad}></Statistic>
          <Statistic text="all" value={all}></Statistic>
          <Statistic text="average" value={average}></Statistic>
          <Statistic text="positive" value={positive}></Statistic>
        </tbody>
      </table>
    </>
  )
}

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newGood = good+1
    setGood(newGood)
  }

  const handleNeutral = () => {
    const newNeutral = neutral+1
    setNeutral(newNeutral)
  }

  const handleBad = () => {
    const newBad = bad+1
    setBad(newBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={handleGood} text={"good"}/>
      <Button clickHandler={handleNeutral} text={"neutral"}/>
      <Button clickHandler={handleBad} text={"bad"}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;