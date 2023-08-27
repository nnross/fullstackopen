import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value, mark }) => {
  return(
    <tbody>
      <tr>
        <td>{text} </td>
        <td>{value} </td>
        <td>{mark} </td>
      </tr>
    </tbody>
  )
}

const Statistics = ({ good, bad, neutral, average }) => {
  const sum = good+bad+neutral
  const allaverage = average/sum
  const positive = (good/sum)*100
  if (good == 0 && bad == 0 && neutral == 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return(
  <table>
    <StatisticLine text='good' value={good} mark=''/>
    <StatisticLine text='neutral' value={neutral} mark=''/>
    <StatisticLine text='bad' value={bad} mark=''/>
    <StatisticLine text='all' value={sum} mark=''/>
    <StatisticLine text='average' value={allaverage} mark=''/>
    <StatisticLine text='positive' value={positive} mark='%'/>
  </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAverage = average + 1
    setGood(updatedGood)
    setAverage(updatedAverage)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAverage = average - 1
    setBad(updatedBad)
    setAverage(updatedAverage)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} average={average}/>
    </div>
  )
}

export default App