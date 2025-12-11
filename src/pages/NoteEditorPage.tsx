import { Sidebar } from '@/components/Sidebar'
import {
    MoreHorizontal,
    Mic,
    Drama,
    Plus,
    GripVertical,
    Command,
    Pin,
    ChevronDown,
    Loader,
    Table,
    LayoutList,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    Image as ImageIcon,
    Type,
    TextQuote
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReactNode, useState, useRef, useEffect } from 'react'
import { useNotes } from '@/contexts/NotesContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/toast'

export function NoteEditorPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { saveNote, getNote } = useNotes()
    const { showToast } = useToast()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [showAddMenu, setShowAddMenu] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Load note data if ID is present
    useEffect(() => {
        if (id && id !== 'new') {
            const note = getNote(id)
            if (note) {
                setTitle(note.title)
                setContent(note.content)
            }
        } else {
            // Reset for new note
            setTitle('')
            setContent('')
        }
    }, [id, getNote])

    const handleSave = () => {
        if (!title.trim() && !content.trim()) return

        const noteId = id && id !== 'new' ? id : self.crypto.randomUUID()
        const note = {
            id: noteId,
            title: title || 'Untitled',
            content,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        saveNote(note)

        if (id === 'new' || !id) {
            navigate(`/documents/${noteId}`, { replace: true })
            showToast('Note created', 'success')
        } else {
            showToast('Note saved', 'success')
        }
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowAddMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFormat = (prefix: string) => {
        setContent(prefix)
        setShowAddMenu(false)
    }

    return (
        <div className="flex h-screen bg-white text-[#37352F] font-sans selection:bg-[#2EAADC] selection:text-white">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 bg-white cursor-text">
                {/* Top Navigation Bar */}
                <header className="h-[45px] flex items-center justify-between px-3 sticky top-0 bg-white z-10 shrink-0">
                    <div className="flex items-center gap-1 text-[#37352F] text-[14px] overflow-hidden whitespace-nowrap">
                        <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-[#37352F]/5 rounded-[3px] cursor-pointer transition-colors text-[14px]">
                            <span className="truncate max-w-[150px] font-medium">New page</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#37352F]/50 text-[14px] hover:bg-[#37352F]/5 px-1 py-0.5 rounded-[3px] cursor-pointer transition-colors">
                            <Command className="h-3 w-3" />
                            <span>Private</span>
                            <ChevronDown className="h-3.5 w-3.5" />
                        </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                        <span className="text-[13px] text-[#37352F]/40 mr-3 hidden sm:inline-block">Edited just now</span>
                        {(title || content) && (
                            <Button
                                onClick={handleSave}
                                variant="ghost"
                                className="h-7 w-auto px-2 text-[14px] font-medium text-[#37352F] hover:bg-[#37352F]/5"
                            >
                                Save
                            </Button>
                        )}
                        <Button variant="ghost" className="h-7 w-auto px-2 text-[14px] font-normal text-[#37352F] hover:bg-[#37352F]/5">
                            Share
                        </Button>
                        <Button variant="ghost" className="h-6 w-6 p-0 text-[#37352F] hover:bg-[#37352F]/5">
                            <Pin className="h-[16px] w-[16px]" />
                        </Button>
                        <Button variant="ghost" className="h-7 w-7 p-0 text-[#37352F] hover:bg-[#37352F]/5">
                            <MoreHorizontal className="h-[18px] w-[18px]" />
                        </Button>
                    </div>
                </header>

                {/* Editor Content */}
                <div className="flex-1 overflow-y-auto w-full relative">
                    <div className="max-w-[900px] mx-auto px-24 pb-32 pt-[10vh] pl-[96px]"> {/* Adjusted padding for visual balance */}

                        {/* Title Input */}
                        <div className="relative mb-2 group">
                            <textarea
                                placeholder="Page title"
                                className="w-full bg-transparent border-none outline-none text-[40px] font-bold text-black/70 placeholder:text-black/20 leading-tight p-0 m-0 resize-none overflow-hidden"
                                autoFocus
                                rows={1}
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                            />
                        </div>

                        {/* Main Editor Body Block */}
                        <div className="relative group/block -ml-[2px]">
                            {/* Floating Gutter Controls */}
                            <div className={`absolute -left-[54px] h-6 flex items-center transition-opacity select-none ${content === ''
                                ? 'opacity-0 group-hover/block:opacity-100 group-focus-within/block:opacity-100'
                                : 'opacity-0 pointer-events-none'
                                }`} contentEditable={false}>
                                <div className="flex items-center relative" ref={menuRef}>
                                    <button
                                        onClick={() => setShowAddMenu(!showAddMenu)}
                                        className="h-6 w-6 flex items-center justify-center rounded-[3px] text-[#37352F]/40 hover:text-[#37352F] hover:bg-[#37352F]/5 transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>

                                    {showAddMenu && (
                                        <div className="absolute top-8 left-0 w-[300px] bg-white rounded-lg shadow-xl border border-[#37352F]/10 py-1 z-50 text-[#37352F] max-h-[400px] overflow-y-auto">
                                            <div className="px-3 py-2 text-[11px] font-medium text-[#37352F]/40 uppercase select-none">Basic blocks</div>

                                            <MenuOption icon={<Type className="h-4 w-4" />} label="Text" subLabel="Just start writing with plain text." onClick={() => handleFormat('')} />
                                            <MenuOption icon={<Heading1 className="h-4 w-4" />} label="Heading 1" subLabel="Big section heading." onClick={() => handleFormat('# ')} />
                                            <MenuOption icon={<Heading2 className="h-4 w-4" />} label="Heading 2" subLabel="Medium section heading." onClick={() => handleFormat('## ')} />
                                            <MenuOption icon={<Heading3 className="h-4 w-4" />} label="Heading 3" subLabel="Small section heading." onClick={() => handleFormat('### ')} />
                                            <MenuOption icon={<List className="h-4 w-4" />} label="Bulleted list" subLabel="Create a simple bulleted list." onClick={() => handleFormat('- ')} />
                                            <MenuOption icon={<ListOrdered className="h-4 w-4" />} label="Numbered list" subLabel="Create a list with numbering." onClick={() => handleFormat('1. ')} />
                                            <MenuOption icon={<Quote className="h-4 w-4" />} label="Quote" subLabel="Capture a quote." onClick={() => handleFormat('> ')} />
                                            <MenuOption icon={<Code className="h-4 w-4" />} label="Code" subLabel="Capture a code snippet." onClick={() => handleFormat('``` ')} />
                                            <MenuOption icon={<ImageIcon className="h-4 w-4" />} label="Image" subLabel="Upload or embed with a link." onClick={() => handleFormat('![Image](url) ')} />
                                        </div>
                                    )}
                                    <button className="h-6 w-6 flex items-center justify-center rounded-[3px] cursor-grab text-[#37352F]/40 hover:text-[#37352F]">
                                        <GripVertical className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Content Placeholder */}
                            <textarea
                                className="w-full bg-transparent border-none outline-none text-[18px] text-black/60 placeholder:text-black/20 leading-tight p-0 m-0 resize-none overflow-hidden"
                                placeholder='Write, press space for AI, / for commands...'
                                rows={1}
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                            />
                        </div>

                        {/* "Get started with" Section */}
                        <div className="mt-24 select-none">
                            <h3 className="text-[13px] text-[#37352F]/40 mb-3 px-1">Get started with</h3>
                            <div className="flex flex-wrap gap-2 text-[#37352F]/60">
                                <ActionButton icon={<Loader className="h-4 w-4" />} label="Ask AI" />
                                <ActionButton icon={<Mic className="h-4 w-4" />} label="AI Meeting Notes" />
                                <ActionButton icon={<Table className="h-4 w-4" />} label="Table" />
                                <ActionButton icon={<TextQuote className="h-4 w-4" />} label="Form" />
                                <ActionButton icon={<LayoutList className="h-4 w-4" />} label="Templates" />
                                <button className="h-8 w-8 flex items-center justify-center rounded-full bg-black/[4%] hover:bg-black/[8%] transition-colors text-[#37352F]/50">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Help/Chat Button Bottom Right */}
                <div className="fixed bottom-6 right-6 z-20">
                    <Button className="h-[34px] w-[34px] rounded-full bg-white border border-[rgba(55,53,47,0.16)] shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:bg-[#F7F7F5] text-[#37352F] p-0 flex items-center justify-center">
                        <Drama className="h-4 w-4" />
                    </Button>
                </div>
            </main>
        </div>
    )
}

function ActionButton({ icon, label }: { icon: ReactNode, label: string }) {
    return (
        <button className="h-8 px-3 flex items-center gap-2 rounded-full bg-black/[4%] hover:bg-black/[8%] transition-colors text-[13px] text-[#37352F]/80">
            {icon}
            {label}
        </button>
    )
}

function MenuOption({ icon, label, subLabel, onClick }: { icon: ReactNode, label: string, subLabel: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 px-3 py-1.5 hover:bg-[#37352F]/5 transition-colors text-left"
        >
            <div className="h-10 w-10 flex items-center justify-center rounded-[3px] border border-[#37352F]/10 bg-white shrink-0 text-[#37352F]/80 shadow-sm">
                {icon}
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="text-[14px] font-medium text-[#37352F] truncate">{label}</span>
                <span className="text-[12px] text-[#37352F]/40 truncate">{subLabel}</span>
            </div>
        </button>
    )
}
