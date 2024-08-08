import React from 'react';
import { useGlobalContext } from './context';
import { NavLink } from "react-router-dom";

function Movies() {
  const { movies, isLoading } = useGlobalContext();

  if (isLoading) {
    return <div>Loading...</div>;
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
                  <h2>{title}</h2>
                  <p>Category: {category}</p>
                  <p>Likes: {likes}</p>
                  <p>Dislikes: {dislikes}</p>
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
