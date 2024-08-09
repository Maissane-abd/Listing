// Importation des composants nécessaires pour la page d'accueil
import CategoryFilter from '../components/CategoryFilter.jsx'; // Composant pour filtrer les films par catégorie
import Movies from '../components/Movies.jsx'; // Composant pour afficher la liste des films
import Pagination from '../components/Pagination.jsx'; // Composant pour gérer la pagination
import Search from '../components/Search.jsx'; // Composant pour la recherche de films

// Composant principal pour la page d'accueil
function Home() {

  return (
    <>
      {/* Composant de recherche de films */}
      <Search/>

      {/* Composant pour filtrer les films par catégorie */}
      <CategoryFilter/>

      {/* Composant pour afficher la liste des films */}
      <Movies/>

      {/* Composant pour gérer la pagination des films */}
      <Pagination/>
    </>
  )
}

// Exportation du composant Home pour qu'il puisse être utilisé dans d'autres parties de l'application
export default Home;
