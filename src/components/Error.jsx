import React from 'react';
import { Link } from 'react-router-dom'; // Import pour la navigation

// Composant de la page d'erreur
function Error() {
  return (
    <div className="error-container">
      <h1 className="error-title">404 - Page Non Trouvée</h1>
      <p className="error-message">Oups ! La page que vous cherchez n'existe pas.</p>
      <p className="error-suggestion">Veuillez vérifier l'URL ou retourner à la page d'accueil.</p>
      
      {/* Lien vers la page d'accueil */}
      <Link to="/" className="home-link">Retourner à l'accueil</Link>
    </div>
  );
}

export default Error;
