import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { AppProvider } from './context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    {/* AppProvider enveloppe l'application avec le contexte global, ce qui permet aux composants descendants d'accéder à l'état et aux fonctions définis dans AppProvider. */}
    <AppProvider> 
    <Router>
    <App />
    </Router>
    </AppProvider>
  </React.StrictMode>,
)
