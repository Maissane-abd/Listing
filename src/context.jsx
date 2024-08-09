import React, { useContext, useEffect, useState } from "react";
import { movies$ } from "../Etude-de-cas-front-movies-data"; 

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("pulp");

  const getMovies = async () => {
    try {
      const data = await movies$;
      setMovies(data);
      setFilteredMovies(data); 
      setIsLoading(false);
    } catch (error) {
      setIsError({
        show: false,
        msg: "",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    let timerOut = setTimeout(()=>{
        getMovies();
    }, 300);
    return ()=> clearTimeout(timerOut);
    
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [query, movies]);

  return (
    <AppContext.Provider value={{ isLoading, isError, movies: filteredMovies, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
