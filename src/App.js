import React from "react"
import "./App.css"
import { Heading } from "@chakra-ui/react"

import Header from "./components/Header"
import ExchangeCard from "./components/ExchangeCard"

const App = () => {
  return (
    <div>
      <Header />
      <ExchangeCard />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Heading as='h2' size='lg'>
        My exchangerate-api key is {process.env.REACT_APP_API_KEY}
      </Heading>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default App
