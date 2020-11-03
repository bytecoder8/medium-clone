import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes'
import { Navbar } from './components/Navbar'

import './App.css'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
