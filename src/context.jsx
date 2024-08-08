import React, { useContext, useEffect, useState } from "react";
import { movies$ } from "../Etude-de-cas-front-movies-data"; // Assurez-vous d'importer correctement votre fichier

const AppContext = React.createContext(); 

const AppProvider = ({ children }) => { 

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: false, msg: "" });

    const getMovies = async () => {
        try {
            const data = await movies$;
            setIsLoading(false);
            setMovie(data);
        } catch (error) {
            setIsError({
                show: true,
                msg: "An error occurred while fetching data.",
            });
            console.log(error);
        }
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <AppContext.Provider value={{ isLoading, isError, movie }}> 
            {children}
        </AppContext.Provider>
    );
}; 

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
