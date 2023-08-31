// El provider ayuda a que los componentes hijos puedan acceder a los datos del contexto, 
// es decir, a los datos que se encuentran en el estado global de la aplicación.
// Va a guardar valores booleanos, strings, objetos, etc.

import { useReducer } from 'react';
import { UIContext, uiReducer } from '.';
import { IsAddingEntryStatus } from '../../interfaces/entry';


interface UIProviderProps {
    children: React.ReactNode;
}

export interface UIState {
    sideMenuOpen: boolean;
    isAdding: boolean;
    isDragging: boolean;
    isOnLightTheme: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAdding: false,
    isDragging: false,
    isOnLightTheme: false,
}

export const UIProvider = ({ children }: UIProviderProps) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideBar = () => { dispatch({ type: 'OPEN_SIDEBAR' }) }
    const closeSideBar = () => { dispatch({ type: 'CLOSE_SIDEBAR' }) }

    const setIsAddingEntryStatus = (isAdding: boolean) => {
        dispatch({ type: 'IS-ADDING-ENTRY', payload: isAdding, })

    }

    const setTheme = () => { state.isOnLightTheme ? dispatch({ type: 'DARK-THEME' }) : dispatch({ type: 'LIGHT-THEME' }) }


    // Dragging
    const startDragging = () => { dispatch({ type: 'START-DRAGGING' }) }
    const endDragging = () => { dispatch({ type: 'END-DRAGGING' }) }

    return (
        <UIContext.Provider value={{
            ...state,
            // Methods
            openSideBar,
            closeSideBar,
            setIsAddingEntryStatus,
            setTheme,

            startDragging,
            endDragging,
        }}>
            {children}
        </UIContext.Provider>
    )

}
