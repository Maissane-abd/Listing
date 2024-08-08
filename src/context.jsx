import React, {useContext} from "react";


const AppContext = React.createContext(); //Création du contexte

const AppProvider = ({children}) => { //AppProvider est un composant fonctionnel qui encapsule les composants enfants

    //Provider permet de passer une valeur (value (ici "Maïssane")) à tous les composants enfants qui consomment ce contexte.
    return <AppContext.Provider value="Maïssane"> 
        {children}
    </AppContext.Provider>;
}; 

const useGlobalContext = () => {
    return useContext(AppContext);
};

export {AppContext, AppProvider, useGlobalContext};;