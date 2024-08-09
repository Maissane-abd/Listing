import React from 'react';
import { useGlobalContext } from './context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function Movies() {
  const { movies, toggleLike, toggleDislike, isLoading, setMovies } = useGlobalContext();

  const handleDelete = (id) => {
    const updatedMovies = movies.filter(movie => movie.id !== id);
    setMovies(updatedMovies);
  };

  if (isLoading) {
    return (
      <div className='movie-section'>
        <div className='loading'>Loading...</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <section className='movie-page'>
      <div className='grid grid-4-col'>
        {movies.map((curMovie) => {
          const { id, title, category, likes, dislikes, likedByUser, dislikedByUser } = curMovie;
          return (
            <div className='card' key={id}>
              <div className='card-info'>
                <h2><strong>{title}</strong></h2>
                <p>Category: {category}</p>
                <div className="like-dislike-buttons">
                  <button
                    onClick={() => toggleLike(id)}
                    className={likedByUser ? 'active' : ''}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} /> {likes}
                  </button>
                  <button
                    onClick={() => toggleDislike(id)}
                    className={dislikedByUser ? 'active' : ''}
                  >
                    <FontAwesomeIcon icon={faThumbsDown} /> {dislikes}
                  </button>
                </div>
                <button className="delete-button" onClick={() => handleDelete(id)}>
                  Delete
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
