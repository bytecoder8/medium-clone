import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes'
import { Navbar } from './components/Navbar'

import { CurrentUserProvider } from './context/currentUser'
import { CurrentUserSetter } from './components/CurrentUserSetter'

const baseUrl = import.meta.env.BASE_URL

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <CurrentUserSetter>
          <BrowserRouter basename={baseUrl}>
            <div className="container">
              <Navbar />
              <Routes />
            </div>
          </BrowserRouter>
        </CurrentUserSetter>
      </CurrentUserProvider>
    </div>
  );
}

export default App
