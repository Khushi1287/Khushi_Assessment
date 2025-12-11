import {
    Search,
    Plus,
    Trash,
    HelpCircle,
    MessageSquare,
    Monitor,
    Calendar,
    Settings2,
    ArrowUpDown,
    Shell,
    Rss,
    Video,
    Loader,
    Text,
    AtSign,
    Library,
    MoreHorizontal,
    LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { useNavigate } from 'react-router-dom'
import { useModal } from '@/contexts/ModalContext'
import { useToast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useNotes } from '@/contexts/NotesContext'

export function Sidebar({ className }: { className?: string }) {
    const navigate = useNavigate()
    const { openModal } = useModal()
    const { showToast } = useToast()
    const { signOut } = useAuth()
    const { notes } = useNotes()

    const handleLogout = async () => {
        await signOut()
        navigate('/')
        showToast('Logged out successfully', 'success')
    }

    return (
        <aside className={cn("w-[240px] flex flex-col bg-[#F7F7F5] h-screen text-[#37352F] border-r border-[#E9E9E7]", className)}>
            {/* Header: User Profile */}
            <div
                onClick={() => openModal('settings')}
                className="h-12 flex items-center justify-between px-3 hover:bg-[#EFEFEF] cursor-pointer transition-colors m-1 rounded-sm"
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    <Avatar
                        className="h-5 w-5 rounded-sm bg-orange-400 text-white text-[10px]"
                        src="/placeholder.png"
                        fallback="BB"
                        alt="BinaryBeam.Be"
                    />
                    <span className="text-sm font-medium truncate">BinaryBeam.Be</span>
                </div>
                <div className="flex items-center text-[#9B9A97]">
                    <ArrowUpDown className="h-3.5 w-3.5 hover:text-[#37352F]" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-1 py-1 space-y-4">
                {/* Core Navigation */}
                <div className="space-y-[1px]">
                    <NavItem icon={Search} label="Search" onClick={() => openModal('search')} />
                    <NavItem icon={Shell} label="Home" onClick={() => navigate('/dashboard')} active={window.location.pathname === '/dashboard'} />
                    <div
                        onClick={() => openModal('ai')}
                        className="group flex items-center justify-between px-3 py-1 min-h-[28px] text-sm rounded-lg hover:bg-[#EFEFEF] text-[#5F5E5B] hover:text-[#37352F] cursor-pointer"
                    >
                        <div className="flex items-center gap-2.5">
                            <Loader className="h-4 w-4 shrink-0 text-[#9B9A97] group-hover:text-[#5F5E5B]" />
                            <span className="truncate">Lekh AI</span>
                        </div>
                        <span className="text-[10px] text-primary px-1 rounded-sm font-medium">New</span>
                    </div>
                    <NavItem icon={Rss} label="Inbox" onClick={() => showToast('No new notifications', 'info')} />
                    {/* Meetings with Badge */}
                    <NavItem icon={Video} label="Meetings" onClick={() => navigate('/meetings')} active={window.location.pathname === '/meetings'} />
                </div>

                {/* Shared Section */}
                <div className="space-y-[1px]">
                    <SectionLabel label="Shared" />
                    <NavItem
                        icon={Plus}
                        label="Start collaborating"
                        iconClassName="text-[#9B9A97]"
                        onClick={() => {
                            showToast('Invited team members', 'success')
                        }}
                    />
                </div>

                {/* Private Section */}
                <div className="space-y-[1px] group/section">
                    <SectionLabel
                        label="Private"
                        hasActions
                        onAction={() => navigate('/documents/new')}
                    />
                    {notes.map(note => (
                        <NavItem
                            key={note.id}
                            icon={Text}
                            label={note.title || 'Untitled'}
                            onClick={() => navigate(`/documents/${note.id}`)}
                            active={window.location.pathname === `/documents/${note.id}`}
                        />
                    ))}
                    <NavItem
                        icon={Plus}
                        label="Add new"
                        iconClassName="text-[#9B9A97]"
                        onClick={() => navigate('/documents/new')}
                    />
                </div>

                {/* Notion Apps */}
                <div className="space-y-[1px]">
                    <SectionLabel label="Notion apps" />
                    <NavItem icon={AtSign} label="Lekh Mail" onClick={() => showToast('Opening Lekh Mail...', 'info')} />
                    <NavItem icon={Calendar} label="Lekh Calendar" onClick={() => showToast('Opening Lekh Calendar...', 'info')} />
                    <NavItem icon={Monitor} label="Lekh Desktop" onClick={() => showToast('Opening Lekh Desktop...', 'info')} />
                </div>

                {/* Footer Actions */}
                <div className="space-y-[1px] mt-6">
                    <NavItem icon={Settings2} label="Settings" onClick={() => openModal('settings')} />
                    <NavItem icon={Library} label="Marketplace" onClick={() => showToast('Marketplace coming soon!', 'info')} />
                    <NavItem icon={Trash} label="Trash" onClick={() => showToast('Trash is empty', 'info')} />
                    <NavItem icon={LogOut} label="Log out" onClick={handleLogout} />
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="p-2 border-t border-[#E9E9E7] flex items-center gap-1">
                <Button onClick={() => openModal('help')} variant="ghost" size="icon" className="h-7 w-7 text-[#5F5E5B] hover:bg-[#EFEFEF] hover:text-[#37352F]">
                    <HelpCircle className="h-4 w-4" />
                </Button>
                <Button onClick={() => openModal('help')} variant="ghost" size="icon" className="h-7 w-7 text-[#5F5E5B] hover:bg-[#EFEFEF] hover:text-[#37352F]">
                    <MessageSquare className="h-4 w-4" />
                </Button>
            </div>
        </aside>
    )
}

function NavItem({
    icon: Icon,
    label,
    active,
    iconClassName,
    onClick
}: {
    icon: any,
    label: string,
    active?: boolean,
    iconClassName?: string,
    onClick?: () => void
}) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "group flex items-center px-3 py-1 min-h-[28px] text-[14px] rounded-lg cursor-pointer transition-colors",
                active ? "bg-[#EFEFEF] text-[#37352F] font-medium" : "text-[#5F5E5B] hover:bg-[#EFEFEF] hover:text-[#37352F]"
            )}
        >
            <div className="flex items-center gap-2.5 w-full">
                <Icon className={cn("h-4 w-4 shrink-0 text-[#9B9A97]", active ? "text-[#37352F]" : "group-hover:text-[#5F5E5B]", iconClassName)} />
                <span className="truncate">{label}</span>
            </div>
        </div>
    )
}

function SectionLabel({ label, hasActions, onAction }: { label: string, hasActions?: boolean, onAction?: () => void }) {
    return (
        <div className="group flex items-center justify-between px-3 py-1 mt-3 mb-0.5 min-h-[24px] hover:bg-[#EFEFEF] rounded-sm cursor-pointer transition-colors">
            <h3 className="text-xs font-medium text-[#9B9A97] group-hover:text-[#5F5E5B] transition-colors">{label}</h3>
            {hasActions && (
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 group-hover/section:opacity-100 transition-opacity">
                    <div role="button" className="h-5 w-5 flex items-center justify-center text-black/40 hover:text-black transition-colors">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                    </div>
                    <div
                        role="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            onAction?.()
                        }}
                        className="h-5 w-5 flex items-center justify-center text-black/40 hover:text-black transition-colors"
                    >
                        <Plus className="h-3.5 w-3.5" />
                    </div>
                </div>
            )}
        </div>
    )
}
