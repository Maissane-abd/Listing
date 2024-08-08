import React, { useContext, useEffect, useState } from "react";
import { movies$ } from "../Etude-de-cas-front-movies-data"; // Assurez-vous d'importer correctement votre fichier

// Crée un contexte pour l'application afin de partager des données globales à travers les composants
const AppContext = React.createContext(); 

// Composant de fournisseur de contexte qui englobe l'application et fournit parte des états partagés
const AppProvider = ({ children }) => { 

    // Déclaration d'états pour gérer le chargement, les films récupérés et les erreurs éventuelles
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: false, msg: "" });

    // Fonction asynchrone pour récupérer les données des films depuis un fichier local
    const getMovies = async () => {
        try {
            // Attente de la résolution de la promesse `movies$` pour obtenir les films
            const data = await movies$;
            setIsLoading(false); // Met à jour l'état de chargement
            setMovie(data); // Stocke les films récupérés dans l'état `movie`
        } catch (error) {
            // En cas d'erreur, met à jour l'état `isError` avec un message approprié
            setIsError({
                show: true,
                msg: "An error occurred while fetching data.",
            });
            console.log(error); // Affiche l'erreur dans la console pour le débogage
        }
    }

    // Utilise l'effet pour exécuter `getMovies` au montage du composant
    useEffect(() => {
        getMovies();
    }, []); // Le tableau vide signifie que l'effet se déclenche une seule fois après le premier rendu

    // Retourne le fournisseur de contexte qui englobe ses enfants et leur passe les valeurs globales
    return (
        <AppContext.Provider value={{ isLoading, isError, movie }}> 
            {children}
        </AppContext.Provider>
    );
}; 

// Hook personnalisé pour accéder facilement aux valeurs du contexte depuis n'importe quel composant enfant
const useGlobalContext = () => {
    return useContext(AppContext);
};

// Exporte les composants et le hook pour qu'ils puissent être utilisés dans d'autres parties de l'application
export { AppContext, AppProvider, useGlobalContext };
