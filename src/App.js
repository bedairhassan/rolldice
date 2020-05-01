import React, { useState } from 'react';
//https://stackoverflow.com/questions/8810927/showing-an-image-from-an-array-of-images-javascript

const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>
const Results = ({ results }) => results.map(result => <Result result={result} />) // if you destructure here, redundant
const successRate = ({ value1, value2 }) => Math.floor((value1 + value2) / 12 * 100)

const between = (min, max) =>
  Math.floor(
    Math.random() * (max - min) + min
  )

const generateRandomValue = () => between(1,7)

const message = (successRate) => {

  const value = parseInt(successRate)

  return value > 66 ? `He will indeed call you.` : (value > 33) ? (`He might call you.`) : (`You have lost him.`)
}


const Result = ({ result: { value1, value2 } }) => { // destructure once


  

  return <>
    <ul>
      {/* <li>{value1}, {value2}</li> */}
      <img src={require(`./components/dice/${value1}.png`)} width={50} height={50} />
      <img src={require(`./components/dice/${value2}.png`)} width={50} height={50} />

      <li>Success Rate : {successRate({ value1, value2 })}</li>
      <li>Action: {message(successRate({ value1, value2 }))}</li>
    </ul>
  </>
}

const App = () => {

  const [results, setResults] = useState([])

  const [sum, setSum] = useState(0)
  const [length, setLength] = useState(0)

  const [displayResults, setDisplayResults] = useState([])

  // button click
  const Generate2RandomValues = () => {

    const value1 = generateRandomValue()
    const value2 = generateRandomValue()
    const output = { value1, value2 }

    // setResults([...results, output])

    setSum(sum + successRate(output))
    setLength(length + 1)
    console.table(`Average: ${Math.floor(sum/length)}`)

    // console.table({ sum, length })


    // list max length
    if (results.length < 3) {
      results.push(output)
    } else {

      results.shift()
      results.push(output)
    }
  }

  return (
    <>
      <h1>Welcome back, great programmer.</h1>
      <h6>Consistent Practice Matters.</h6>

      Success Rate: {Math.floor(sum / length)} <br/>
      Message: {
        message(Math.floor(sum / length))
      }

      <br />
      <Button onClick={Generate2RandomValues} name={`Roll Dice`} />

      <Results results={results} />

      {/* <img src={require('./components/dice/1.png')} width={50} height={50}/> */}

    </>
  );
}

export default App;
