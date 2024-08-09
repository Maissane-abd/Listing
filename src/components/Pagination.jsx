import React from 'react'; // Import de la bibliothèque React pour créer des composants
import { useGlobalContext } from '../context/context'; // Import du hook personnalisé pour accéder au contexte global

const Pagination = () => {
  // Destructuration des valeurs nécessaires depuis le contexte global
  const { currentPage, itemsPerPage, filteredMovies, setCurrentPage, handleItemsPerPageChange } = useGlobalContext();

  // Tableau pour stocker les numéros de page
  const pageNumbers = [];
  // Vérifie si les films filtrés existent et s'ils ne sont pas vides
  if (filteredMovies && filteredMovies.length > 0) {
    // Calcul du nombre total de pages nécessaires en fonction du nombre de films et d'éléments par page
    for (let i = 1; i <= Math.ceil(filteredMovies.length / itemsPerPage); i++) {
      pageNumbers.push(i); // Ajoute chaque numéro de page au tableau
    }
  }

  // Fonction pour passer à la page suivante
  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) { // Vérifie si la page actuelle est inférieure au nombre total de pages
      setCurrentPage(currentPage + 1); // Passe à la page suivante
    }
  };

  // Fonction pour revenir à la page précédente
  const handlePrevPage = () => {
    if (currentPage > 1) { // Vérifie si la page actuelle est supérieure à 1
      setCurrentPage(currentPage - 1); // Reviens à la page précédente
    }
  };

  // Fonction pour changer de page en cliquant sur un numéro de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pagination">
      {/* Sélecteur pour choisir le nombre d'éléments par page */}
      <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
        <option value={4}>4 par page</option>
        <option value={8}>8 par page</option>
        <option value={12}>12 par page</option>
      </select>

      {/* Bouton pour passer à la page précédente */}
      <button onClick={handlePrevPage} disabled={currentPage === 1}>Précédent</button>

      {/* Boutons pour les numéros de pages */}
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)} // Change de page lorsqu'on clique sur un numéro de page
          className={number === currentPage ? 'active' : ''} // Applique une classe 'active' pour la page actuellement sélectionnée
        >
          {number}
        </button>
      ))}

      {/* Bouton pour passer à la page suivante */}
      <button onClick={handleNextPage} disabled={currentPage === pageNumbers.length}>Suivant</button>
    </div>
  );
};

export default Pagination;
