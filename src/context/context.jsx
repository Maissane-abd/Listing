import React, { useContext, useEffect, useState } from "react"; // Importation des hooks React nécessaires
import { movies$ } from "../../Etude-de-cas-front-movies-data"; // Importation des données de films

// Création du contexte global pour l'application
const AppContext = React.createContext();

// Composant fournisseur de contexte
const AppProvider = ({ children }) => {

  // États locaux pour gérer les données et les états de l'application
  const [isLoading, setIsLoading] = useState(true); // État pour indiquer si les données sont en cours de chargement
  const [movies, setMovies] = useState([]); // État pour stocker les films
  const [filteredMovies, setFilteredMovies] = useState([]); // État pour stocker les films filtrés
  const [isError, setIsError] = useState({ show: false, msg: "" }); // État pour gérer les erreurs
  const [query, setQuery] = useState(""); // État pour stocker la requête de recherche
  const [categories, setCategories] = useState([]); // État pour stocker les catégories de films
  const [selectedCategories, setSelectedCategories] = useState([]); // État pour stocker les catégories sélectionnées
  const [currentPage, setCurrentPage] = useState(1); // État pour gérer la page actuelle de la pagination
  const [itemsPerPage, setItemsPerPage] = useState(4); // État pour gérer le nombre d'articles par page

  // Fonction pour récupérer les films depuis une source de données
  const getMovies = async () => {
    try {
      const data = await movies$; // Récupération des données de films

      // Ajout des états de "like" et "dislike" pour chaque film
      const moviesWithStates = data.map(movie => ({
        ...movie,
        likedByUser: false,
        dislikedByUser: false,
      }));
      setMovies(moviesWithStates); // Mise à jour de l'état des films
      setFilteredMovies(moviesWithStates); // Mise à jour de l'état des films filtrés

      // Extraction des catégories uniques des films
      const uniqueCategories = [...new Set(data.map(movie => movie.category))];
      setCategories(uniqueCategories); // Mise à jour de l'état des catégories
      setIsLoading(false); // Indication que le chargement est terminé
    } catch (error) {

      // Gestion des erreurs lors de la récupération des films
      setIsError({ show: true, msg: "Une erreur est survenue lors de la récupération des données." });
      console.log(error); // Affichage de l'erreur dans la console
    }
  };

  // Hook useEffect pour récupérer les films au chargement du composant
  useEffect(() => {
    let timerOut = setTimeout(() => {
      getMovies(); // Appel de la fonction pour récupérer les films
    }, 300);
    return () => clearTimeout(timerOut); // Nettoyage du timer lors du démontage du composant
  }, []);

  // Hook useEffect pour filtrer les films en fonction de la recherche et des catégories sélectionnées
  useEffect(() => {
    let filtered = movies; // Copie des films
    if (query) {

      // Filtrage par titre de film si une requête est présente
      filtered = filtered.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
    }
    if (selectedCategories.length > 0) {
      
      // Filtrage par catégories sélectionnées
      filtered = filtered.filter(movie => selectedCategories.includes(movie.category));
    }
    setFilteredMovies(filtered); // Mise à jour de l'état des films filtrés
  }, [query, selectedCategories, movies]);

  // Calcul des indices pour la pagination
  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Fonction pour changer de page dans la pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fonction pour gérer le changement du nombre d'articles par page
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value)); // Mise à jour du nombre d'articles par page
    setCurrentPage(1); // Réinitialisation à la première page lorsque le nombre d'articles par page change
  };

  // Fonction pour gérer le toggle du like d'un film
  const toggleLike = (id) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === id
          ? {
              ...movie,
              likedByUser: !movie.likedByUser,
              likes: !movie.likedByUser ? movie.likes + 1 : movie.likes - 1
            }
          : movie
      )
    );
  };
  
  // Fonction pour gérer le toggle du dislike d'un film
  const toggleDislike = (id) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === id
          ? {
              ...movie,
              dislikedByUser: !movie.dislikedByUser,
              dislikes: !movie.dislikedByUser ? movie.dislikes + 1 : movie.dislikes - 1
            }
          : movie
      )
    );
  };

  // Rendu du composant fournisseur de contexte
  return (
    <AppContext.Provider value={{
      isLoading,
      isError,
      movies: currentMovies,
      filteredMovies,
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
      paginate,
      toggleLike,
      toggleDislike,
    }}>
      {children} {/* Affichage des enfants du fournisseur de contexte */}
    </AppContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte global
const useGlobalContext = () => {
  return useContext(AppContext);
};

// Exportation du contexte, du fournisseur et du hook personnalisé pour utilisation dans d'autres parties de l'application
export { AppContext, AppProvider, useGlobalContext };
