import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes'
import { Navbar } from './components/Navbar'

import './App.css'
import { CurrentUserProvider } from './context/currentUser'


function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <BrowserRouter>
          <div className="container">
            <Navbar />
            <Routes />
          </div>
        </BrowserRouter>
      </CurrentUserProvider>
    </div>
  );
}

export default App
