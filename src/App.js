import React from "react"
import "./App.css"

import Header from "./components/Header"
import ExchangeCard from "./components/ExchangeCard"
import FavoriteList from "./components/FavoriteList"

const App = () => {
  return (
    <div>
      <Header />
      <ExchangeCard />
      <FavoriteList />
    </div>
  )
}

export default App
