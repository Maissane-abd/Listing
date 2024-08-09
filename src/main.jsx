// Importation des bibliothèques et composants nécessaires
import React from 'react'; // Import de la bibliothèque React
import ReactDOM from 'react-dom/client'; // Import de la fonction pour rendre l'application dans le DOM
import App from './App.jsx'; // Import du composant principal de l'application
import { BrowserRouter as Router } from 'react-router-dom'; // Import du routeur pour la gestion des routes
import { AppProvider } from './context/context.jsx'; // Import du fournisseur de contexte pour la gestion de l'état global

// Création de la racine pour rendre l'application dans le DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 
      React.StrictMode est un outil de développement qui aide à identifier les problèmes dans l'application,
      comme les composants non sécurisés ou les pratiques obsolètes.
    */}
    
    {/* 
      AppProvider enveloppe l'application avec le contexte global, ce qui permet aux composants descendants
      d'accéder à l'état et aux fonctions définis dans AppProvider.
    */}
    <AppProvider> 

      {/* 
        Router est utilisé pour la gestion des routes dans l'application. Il permet de définir différentes routes
        et de rendre les composants correspondants selon l'URL actuelle.
      */}
      <Router>
        {/* Le composant principal de l'application qui inclut les routes et autres composants */}
        <App />
      </Router>

    </AppProvider>
  </React.StrictMode>,
);
