
export interface Entry {
    _id: string;
    description: string;
    created_at: number;
    status: EntryStatus;
}

export interface IsAddingEntryStatus {
    isAddingEntry: boolean;
}

// Podria ser tambien una inteface pero el type es porque en un futuro no lo voy a extender
export type EntryStatus = 'pending' | 'in-progress' | 'done';

