import { useState } from 'react'

const Heading = (props) => <h1>{props.text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = (props) => (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

   return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="All" value={props.all} />
        <StatisticLine text="Average" value={props.average} />
        <StatisticLine text="Positive" value={`${props.positive}%`} />
      </tbody>
    </table>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Heading text='Give feedback' />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Heading text='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad}  all={good + neutral + bad} average={(good - bad) / (good + neutral + bad) || 0} positive={(good / (good + neutral + bad) || 0) * 100} />

      
    </div>
  )
}

export default App