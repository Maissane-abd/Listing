import React from 'react'; // Import de la bibliothèque React pour créer des composants
import { useGlobalContext } from '../context/context'; // Import du hook personnalisé pour accéder au contexte global
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import du composant pour utiliser les icônes FontAwesome
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'; // Import des icônes pour les boutons de like et dislike

function Movies() {
  // Utilisation du hook personnalisé pour obtenir les données et fonctions du contexte global
  const { movies, toggleLike, toggleDislike, isLoading, setMovies } = useGlobalContext();

  // Fonction pour gérer la suppression d'un film en filtrant celui avec l'id correspondant
  const handleDelete = (id) => {
    const updatedMovies = movies.filter(movie => movie.id !== id);
    setMovies(updatedMovies);
  };

  // Affichage d'un message de chargement si les données sont encore en cours de chargement
  if (isLoading) {
    return (
      <div className='movie-section'>
        <div className='loading'>Chargement...</div>
      </div>
    );
  }

  // Affichage d'un message si aucun film n'est trouvé
  if (movies.length === 0) {
    return <div>Aucun film trouvé</div>;
  }

  return (
    <section className='movie-page'>
      {/* Section principale pour afficher la liste des films */}
      <div className='grid grid-4-col'>
        {movies.map((curMovie) => {
          // Déstructuration des propriétés du film courant
          const { id, title, category, likes, dislikes, likedByUser, dislikedByUser } = curMovie;
          return (
            <div className='card' key={id}>
              <div className='card-info'>
                {/* Affichage du titre du film */}
                <h2><strong>{title}</strong></h2>
                {/* Affichage de la catégorie du film */}
                <p>Catégorie: {category}</p>
                {/* Section pour les boutons de like et dislike */}
                <div className="like-dislike-buttons">
                  {/* Bouton pour aimer le film */}
                  <button
                    onClick={() => toggleLike(id)}
                    className={likedByUser ? 'active' : ''} // Classe 'active' si le film est aimé par l'utilisateur
                  >
                    <FontAwesomeIcon icon={faThumbsUp} /> {likes}
                  </button>
                  {/* Bouton pour ne pas aimer le film */}
                  <button
                    onClick={() => toggleDislike(id)}
                    className={dislikedByUser ? 'active' : ''} // Classe 'active' si le film est détesté par l'utilisateur
                  >
                    <FontAwesomeIcon icon={faThumbsDown} /> {dislikes}
                  </button>
                </div>
                {/* Bouton pour supprimer le film */}
                <button className="delete-button" onClick={() => handleDelete(id)}>
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Movies;
