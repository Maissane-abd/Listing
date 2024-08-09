import React from 'react'; // Import de la bibliothèque React pour créer des composants
import { useGlobalContext } from '../context/context'; // Import du hook personnalisé pour accéder au contexte global

function Search() {
  // Destructuration des valeurs nécessaires depuis le contexte global
  const { query, setQuery, isError } = useGlobalContext();

  return (
    <section className='search-section'>
      {/* Titre de la section de recherche */}
      <h2>Recherchez votre film préféré</h2>
      {/* Formulaire de recherche */}
      <form action="#" onSubmit={(e) => e.preventDefault()}> 
        <div>
          {/* Champ de saisie pour la recherche */}
          <input 
            type="text" 
            placeholder='Rechercher ici' // Texte de remplacement affiché lorsqu'aucune valeur n'est saisie
            value={query} // Valeur actuelle de la recherche provenant du contexte global
            onChange={(e) => setQuery(e.target.value)} // Met à jour la requête de recherche lorsque l'utilisateur tape
          />
        </div>
      </form>
      {/* Section pour afficher les messages d'erreur */}
      <div className='card-error'>
        {/* Affiche le message d'erreur si une erreur est présente */}
        <p>{isError.show && isError.msg}</p>
      </div>
    </section>
  );
}

export default Search;

