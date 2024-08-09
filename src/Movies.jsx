import React from 'react';
import { useGlobalContext } from './context';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';


function Movies() {
  const { movies, isLoading } = useGlobalContext();

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
          const { id, title, category, likes, dislikes } = curMovie;
          return (
            <NavLink to={`movie/${id}`} key={id}>
              <div className='card'>
                <div className='card-info'>
                  <h2><strong>{title}</strong></h2>
                  <p>Category: {category}</p>
                  <div className="like-dislike-buttons">
                  <button onClick={() => handleLike(id)}>
                    <FontAwesomeIcon icon={faThumbsUp} /> {likes}
                  </button>
                  <button onClick={() => handleDislike(id)}>
                    <FontAwesomeIcon icon={faThumbsDown} /> {dislikes}
                  </button>
                </div>
                <button className="delete-button" onClick={() => handleDelete(id)}>
                  Delete
                </button>
                </div>
              </div>
            </NavLink>
          );
          
        })}
        
      </div>
    </section>
  );
}


export default Movies;
