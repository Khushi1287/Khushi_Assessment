import React, { createContext, useContext, useState, useEffect } from 'react'
import { Todo } from '../types/todo'

interface TodoContextType {
    todos: Todo[]
    addTodo: (text: string) => void
    toggleTodo: (id: string) => void
    deleteTodo: (id: string) => void
    updateTodo: (id: string, text: string) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const saved = localStorage.getItem('todos')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: Date.now(),
        }
        setTodos(prev => [newTodo, ...prev])
    }

    const toggleTodo = (id: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id))
    }

    const updateTodo = (id: string, text: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, text } : todo
            )
        )
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, updateTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

export function useTodo() {
    const context = useContext(TodoContext)
    if (context === undefined) {
        throw new Error('useTodo must be used within a TodoProvider')
    }
    return context
}
