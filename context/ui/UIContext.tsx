// Este es las properties que tiene este componente
// aqui se van a guardar funciones que van a modificar el estado global de la aplicación, o metodos
// El context nos sirve para crear el Provider y el Consumer

import { createContext } from 'react';


interface ContextProps {
    sideMenuOpen: boolean;
    isAdding: boolean;
    isDragging: boolean;

    // Methods
    openSideBar: () => void;
    closeSideBar: () => void;
    setIsAddingEntryStatus: (isAdding: boolean) => void;
    startDragging: () => void;
    endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);