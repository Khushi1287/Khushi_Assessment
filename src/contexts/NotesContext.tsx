
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Note {
    id: string
    title: string
    content: string
    createdAt: number
    updatedAt: number
}

interface NotesContextType {
    notes: Note[]
    saveNote: (note: Note) => void
    getNote: (id: string) => Note | undefined
    deleteNote: (id: string) => void
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export function NotesProvider({ children }: { children: ReactNode }) {
    const [notes, setNotes] = useState<Note[]>([])

    // Load notes from local storage on mount
    useEffect(() => {
        const savedNotes = localStorage.getItem('notes')
        if (savedNotes) {
            try {
                setNotes(JSON.parse(savedNotes))
            } catch (e) {
                console.error("Failed to parse notes from local storage", e)
            }
        }
    }, [])

    // Update local storage whenever notes change
    useEffect(() => { // Optimization: We might want to avoid writing on initial mount if empty, but for now this ensures consistency.
        // Actually, let's only write if we have loaded?
        // Simpler: Just write whenever `notes` changes. If it initializes to [], it writes [], which is fine (or maybe overwrites existing if init logic is async? No, useEffect runs after paint).
        // The read effect runs once.
        // However, if we write [] immediately, we might overwrite data before the read effect has processed?
        // React 18 strict mode double invoke might be tricky.
        // Better approach: Separate load and save or use a ref to track initialization.
    }, [notes])

    const saveNote = (noteToSave: Note) => {
        setNotes(prevNotes => {
            const existingIndex = prevNotes.findIndex(n => n.id === noteToSave.id)
            let newNotes;
            if (existingIndex >= 0) {
                newNotes = [...prevNotes]
                newNotes[existingIndex] = noteToSave
            } else {
                newNotes = [...prevNotes, noteToSave]
            }
            localStorage.setItem('notes', JSON.stringify(newNotes))
            return newNotes
        })
    }

    const getNote = (id: string) => {
        return notes.find(n => n.id === id)
    }

    const deleteNote = (id: string) => {
        setNotes(prevNotes => {
            const newNotes = prevNotes.filter(n => n.id !== id)
            localStorage.setItem('notes', JSON.stringify(newNotes))
            return newNotes
        })
    }

    return (
        <NotesContext.Provider value={{ notes, saveNote, getNote, deleteNote }}>
            {children}
        </NotesContext.Provider>
    )
}

export function useNotes() {
    const context = useContext(NotesContext)
    if (context === undefined) {
        throw new Error('useNotes must be used within a NotesProvider')
    }
    return context
}
