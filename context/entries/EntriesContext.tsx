import { createContext } from 'react';

import { Entry } from '@/interfaces';

interface ContextProps {
    entries: Entry[];

    //Methods
    addEntry: (description: string) => void;
    updateEntry: (entries: Entry, showSnackbar?: boolean) => void;
    deleteEntry: (id: string) => void;
}

export const EntriesContext = createContext({} as ContextProps);