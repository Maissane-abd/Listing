import React from 'react'; // Importation de la bibliothèque React
import { useGlobalContext } from '../context/context'; // Importation du hook personnalisé pour accéder au contexte global

function CategoryFilter() {
  // Déstructuration des valeurs nécessaires depuis le contexte global
  const { categories, selectedCategories, setSelectedCategories } = useGlobalContext();

  // Fonction pour gérer les changements dans les cases à cocher des catégories
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target; // Récupération de la valeur et de l'état de la case (cochée ou non)
    
    // Mise à jour des catégories sélectionnées en fonction de l'état de la case
    setSelectedCategories(prev =>
      checked ? [...prev, value] : prev.filter(category => category !== value)
    );
  };

  return (
    <section className='category-filter'>
      {/* Titre de la section de filtrage */}
      <h2>Filtrer par Catégorie</h2>
      
      {/* Conteneur pour les options de filtrage */}
      <div className='filter-options'>

        {/* Itération sur toutes les catégories disponibles */}
        {categories.map(category => (
          <label key={category}>
            
            {/* Case à cocher pour chaque catégorie */}
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)} // Marque la case comme cochée si la catégorie est dans les catégories sélectionnées
              onChange={handleCategoryChange} // Appelle la fonction de gestion des changements lors de la modification de l'état de la case
            />
            {category} {/* Nom de la catégorie affiché à côté de la case à cocher */}
          </label>
        ))}
      </div>
    </section>
  );
}

export default CategoryFilter; // Exportation du composant pour utilisation dans d'autres parties de l'application
