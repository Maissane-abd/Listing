// Importation des composants nécessaires
import Home from './pages/Home';  // Composant pour la page d'accueil
import Error from './components/Error';  // Composant pour afficher une page d'erreur (404)
import { Routes, Route } from "react-router-dom";  // Composants de routing de React Router
import "./App.css";  // Style pour le composant App

// Définition du composant principal de l'application
function App() {
  return (
    <>
      {/* Définition des routes de l'application */}
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Route de secours pour toutes les autres routes non définies */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;  // Exportation du composant App pour utilisation dans d'autres fichiers
