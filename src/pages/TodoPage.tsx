import React, { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { CheckSquare, Trash2, Plus, Pencil } from 'lucide-react'
import { useTodo } from '@/contexts/TodoContext'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function TodoPage() {
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodo()
    const [newTodo, setNewTodo] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault()
        if (newTodo.trim()) {
            addTodo(newTodo)
            setNewTodo('')
        }
    }

    const filteredTodos = todos.filter(todo => {
        const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase())
        if (!matchesSearch) return false
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
    })

    const activeTodos = filteredTodos.filter(t => !t.completed)
    const completedTodos = filteredTodos.filter(t => t.completed)

    return (
        <div className="flex h-screen bg-white text-[#37352F] font-sans selection:bg-[#2EAADC] selection:text-white">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <div className="flex-1 flex flex-col items-center pt-[120px] px-6 pb-20">
                    <div className="w-full max-w-[840px] space-y-[40px]">

                        {/* Header */}
                        <header>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <CheckSquare className="h-8 w-8 text-[#37352F]/80" />
                                    <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#37352F] leading-tight">To-dos</h1>
                                </div>
                                <div className="flex gap-2">
                                    {(['all', 'active', 'completed'] as const).map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className={cn(
                                                "px-3 py-1 rounded-full text-[13px] font-medium transition-colors capitalized",
                                                filter === f
                                                    ? "bg-[#37352F] text-white"
                                                    : "text-[#37352F]/60 hover:bg-[#F7F7F5]"
                                            )}
                                        >
                                            {f.charAt(0).toUpperCase() + f.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <p className='text-[#37352F]/50 font-medium'>Capture your tasks and get things done.</p>
                        </header>

                        <div className="flex gap-4">
                            {/* Add Todo Input */}
                            <form onSubmit={handleAdd} className="relative group flex-1">
                                <Plus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#37352F]/40" />
                                <Input
                                    type="text"
                                    placeholder="Add a new task..."
                                    className="pl-10 h-10 border-none shadow-none bg-transparent hover:bg-[#F7F7F5] focus-visible:ring-0 text-[14px] placeholder:text-[#37352F]/40"
                                    value={newTodo}
                                    onChange={(e) => setNewTodo(e.target.value)}
                                />
                            </form>

                            {/* Search Input */}
                            <div className="relative w-[200px]">
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className="h-10 border-none shadow-none bg-[#F7F7F5]/50 focus-visible:ring-0 text-[14px] placeholder:text-[#37352F]/40"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Todo List */}
                        <div className="space-y-6">
                            {/* Active Todos */}
                            {activeTodos.length > 0 && (
                                <div className="space-y-1">
                                    <h3 className="text-[12px] font-semibold text-[#37352F]/40 uppercase tracking-wider mb-2 pl-2">
                                        {filter === 'completed' ? 'Matches (Active)' : 'Active'}
                                    </h3>
                                    {activeTodos.map(todo => (
                                        <TodoItem
                                            key={todo.id}
                                            todo={todo}
                                            onToggle={() => toggleTodo(todo.id)}
                                            onDelete={() => deleteTodo(todo.id)}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Completed Todos */}
                            {completedTodos.length > 0 && (
                                <div className="space-y-1">
                                    <h3 className="text-[12px] font-semibold text-[#37352F]/40 uppercase tracking-wider mb-2 pl-2">
                                        {filter === 'active' ? 'Matches (Completed)' : 'Completed'}
                                    </h3>
                                    {completedTodos.map(todo => (
                                        <TodoItem
                                            key={todo.id}
                                            todo={todo}
                                            onToggle={() => toggleTodo(todo.id)}
                                            onDelete={() => deleteTodo(todo.id)}
                                        />
                                    ))}
                                </div>
                            )}

                            {filteredTodos.length === 0 && (
                                <div className="text-center py-10 text-[#37352F]/40 text-[14px]">
                                    {searchQuery ? 'No todos match your search.' : 'No tasks yet.'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

function TodoItem({ todo, onToggle, onDelete }: { todo: any, onToggle: () => void, onDelete: () => void }) {
    const { updateTodo } = useTodo()
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.text)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
        }
    }, [isEditing])

    const handleSave = () => {
        if (editText.trim()) {
            updateTodo(todo.id, editText)
            setIsEditing(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave()
        } else if (e.key === 'Escape') {
            setEditText(todo.text)
            setIsEditing(false)
        }
    }

    return (
        <div className="group flex items-center gap-3 px-2 py-1 hover:bg-[#F7F7F5] rounded-lg transition-colors">
            <div
                role="checkbox"
                aria-checked={todo.completed}
                onClick={onToggle}
                className={cn(
                    "flex-shrink-0 h-4 w-4 border border-[#37352F]/30 rounded-[3px] flex items-center justify-center cursor-pointer transition-colors",
                    todo.completed ? "bg-[#2EAADC] border-[#2EAADC]" : "hover:border-[#37352F]/60"
                )}
            >
                {todo.completed && <CheckSquare className="h-3 w-3 text-white" />}
            </div>

            {isEditing ? (
                <div className="flex-1 flex items-center gap-2">
                    <Input
                        ref={inputRef}
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        className="h-6 text-[14px] px-1 py-0 border-none bg-white shadow-sm ring-1 ring-[#37352F]/10 focus-visible:ring-[#2EAADC]"
                    />
                </div>
            ) : (
                <span
                    className={cn(
                        "flex-1 text-[14px] text-[#37352F] cursor-text",
                        todo.completed && "text-[#37352F]/40 line-through"
                    )}
                    onClick={() => setIsEditing(true)}
                >
                    {todo.text}
                </span>
            )}

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-1 hover:bg-[#37352F]/5 rounded text-[#37352F]/40 hover:text-[#37352F] transition-all"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                    </button>
                )}
                <button
                    onClick={onDelete}
                    className="p-1 hover:bg-[#37352F]/5 rounded text-[#37352F]/40 hover:text-red-500 transition-all"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
