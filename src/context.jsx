import React, { useContext, useEffect, useState } from "react";
import { movies$ } from "../Etude-de-cas-front-movies-data"; 

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const getMovies = async () => {
    try {
      const data = await movies$;
      setMovies(data);
      setFilteredMovies(data);
      const uniqueCategories = [...new Set(data.map(movie => movie.category))];
      setCategories(uniqueCategories);
      setIsLoading(false);
    } catch (error) {
      setIsError({ show: true, msg: "An error occurred while fetching data." });
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
    let filtered = movies;
    if (query) {
      filtered = filtered.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(movie => selectedCategories.includes(movie.category));
    }
    setFilteredMovies(filtered);
  }, [query, selectedCategories, movies]);

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);  // Reset to first page when items per page changes
  };

  return (
    <AppContext.Provider value={{
      isLoading,
      isError,
      movies: currentMovies,
      filteredMovies,  // Provide filteredMovies here
      setMovies,
      query,
      setQuery,
      categories,
      selectedCategories,
      setSelectedCategories,
      currentPage,
      setCurrentPage,
      itemsPerPage,
      handleItemsPerPageChange,
      paginate
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
