import React from 'react';
import { useGlobalContext } from './context';

// Composant Movies qui affiche une liste de films en utilisant les données fournies par le contexte global
function Movies() {
  // Utilisation du hook personnalisé useGlobalContext pour accéder aux films depuis le contexte global
  const { movie } = useGlobalContext();

  return (
    <>
      {/* Boucle sur l'ensemble des films récupérés et rend un élément pour chacun */}
      {movie.map((curMovie) => {
        return (
          <div key={curMovie.id} className="movie-item">
            {/* Affiche le titre du film */}
            <h2>{curMovie.title}</h2>
            {/* Affiche la catégorie du film */}
            <p>Category: {curMovie.category}</p>
            {/* Affiche le nombre de likes du film */}
            <p>Likes: {curMovie.likes}</p>
            {/* Affiche le nombre de dislikes du film */}
            <p>Dislikes: {curMovie.dislikes}</p>
          </div>
        );
      })}
    </>
  );
}

export default Movies;

