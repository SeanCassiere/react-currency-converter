import React from "react"
import "./App.css"
import { Heading } from "@chakra-ui/react"

const App = () => {
  return (
    <div>
      <header className='header'></header>
      <Heading as='h1' size='2xl'>
        Hello World
      </Heading>
      <Heading as='h2' size='lg'>
        My exchangerate-api key is {process.env.REACT_APP_API_KEY}
      </Heading>
    </div>
  )
}

export default App
