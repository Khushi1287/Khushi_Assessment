import { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import arrowImage from '@/assets/arrow.png'
import {
    Search,
    CheckSquare,
    Video,
    X,
    ArrowRight,
    Loader,
    Shell,
    Rss,
    Clock9,
    Plus,
    Calendar,
    MoveRight,
    FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { cn, formatRelativeTime } from '@/lib/utils'
import { useModal } from '@/contexts/ModalContext'
import { useToast } from '@/components/ui/toast'
import { useNotes } from '@/contexts/NotesContext'

export function DashboardPage() {
    const { openModal } = useModal()
    const { showToast } = useToast()
    const { notes } = useNotes()
    const navigate = useNavigate()
    const [showBanner, setShowBanner] = useState(true)

    const handleJoinMeeting = () => {
        showToast('Bringing you to the meeting...', 'success')
        setTimeout(() => navigate('/meetings'), 1000)
    }

    return (
        <div className="flex h-screen bg-white text-[#37352F] font-sans selection:bg-primary selection:text-white">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {/* Main Centered Content Container */}
                <div className="flex-1 flex flex-col items-center pt-[120px] px-6 pb-20">
                    <div className="w-full max-w-[840px] space-y-[40px]">

                        {/* Header Section */}
                        <header>
                            <div>
                                <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#37352F] leading-tight">Good evening</h1>
                                <p className='text-[#37352F]/50 font-medium mt-2'>Hi 👋, Here we go—what’s next for you?</p>
                            </div>
                        </header>

                        {/* AI Banner - Pixel Perfect Replica */}
                        {showBanner && (
                            <div className="relative group">
                                <Card className="flex items-stretch border border-[rgba(55,53,47,0.1)] shadow-[0_2px_4px_rgba(55,53,47,0.04)] rounded-2xl overflow-hidden bg-white">
                                    {/* Close Button */}
                                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setShowBanner(false)}
                                            className="p-1 hover:bg-[rgba(55,53,47,0.08)] rounded-full text-[#37352F]/60"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* Left Content */}
                                    <div className="flex-1 p-6 pl-8 flex flex-col justify-center gap-4">
                                        <div>
                                            <h3 className="font-semibold text-[15px] text-[#37352F]">Looking for Lekh AI?</h3>
                                            <p className="text-[13px] text-[#37352F]/50 mt-1 max-w-[300px]">Open the full-page tool from the sidebar and start free.</p>
                                        </div>
                                        <div>
                                            <Button
                                                onClick={() => openModal('ai')}
                                                className="h-8 px-4 text-[13px] font-medium bg-primary hover:bg-primary/90 text-white shadow-none rounded-full"
                                            >
                                                Create now
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Right Content (Visual Mockup) */}
                                    <div
                                        onClick={() => openModal('ai')}
                                        className="w-[340px] bg-[#F7F7F5]/50 border-l border-[rgba(55,53,47,0.1)] p-6 flex flex-col justify-center relative select-none cursor-pointer hover:bg-[#F7F7F5] transition-colors"
                                    >
                                        {/* The stylized arrow pointing to Notion AI */}
                                        <div className="absolute left-[-62px] top-[50%] translate-y-[-50%] z-10 pointer-events-none">
                                            <img src={arrowImage} alt="" className="size-20 opacity-30 mt-3" style={{ rotate: '340deg' }} />
                                        </div>

                                        {/* Mock Sidebar List */}
                                        <div className="space-y-0.5">
                                            <div className="flex items-center gap-3 px-2 py-1.5 text-[#37352F]/60">
                                                <Search className="h-3.5 w-3.5" />
                                                <span className="text-[13px]">Search</span>
                                            </div>
                                            <div className="flex items-center gap-3 px-2 py-1.5 text-[#37352F]/60">
                                                <Shell className="h-3.5 w-3.5" />
                                                <span className="text-[13px]">Home</span>
                                            </div>
                                            <div className="flex items-center gap-3 px-2 py-1.5 bg-white rounded-lg shadow-xs ring-1 ring-[#37352F]/5">
                                                <Loader className="h-3.5 w-3.5 fill-[#37352F]/60" />
                                                <span className="text-[13px] font-medium text-[#37352F] flex-1">Lekh AI</span>
                                                <span className="text-[10px] font-medium text-primary px-1.5 py-0.5 rounded-[3px]">New</span>
                                            </div>
                                            <div className="flex items-center gap-3 px-2 py-1.5 text-[#37352F]/60">
                                                <Rss className="h-3.5 w-3.5" />
                                                <span className="text-[13px]">Inbox</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* Recent Section */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[13px] text-[#37352F]/50 pl-1">
                                <Clock9 className="h-3.5 w-3.5 opacity-70" />
                                Recently created
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <RecentCard
                                    icon={<CheckSquare className="h-[18px] w-[18px] text-[#37352F]/40" />}
                                    title="To-dos"
                                    meta="Just now"
                                    user="Ayush Pandey"
                                />
                                {[...notes]
                                    .sort((a, b) => b.updatedAt - a.updatedAt)
                                    .slice(0, 4)
                                    .map(note => (
                                        <RecentCard
                                            key={note.id}
                                            icon={<FileText className="h-[18px] w-[18px] text-[#37352F]/40" />}
                                            title={note.title || 'Untitled'}
                                            meta={formatRelativeTime(note.updatedAt)}
                                            user="Ayush Pandey"
                                            onClick={() => navigate(`/documents/${note.id}`)}
                                        />
                                    ))}
                                <NewPageCard />
                            </div>
                        </div>

                        {/* Upcoming Events Section */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[13px] text-[#37352F]/50 pl-1">
                                <Calendar className="h-3.5 w-3.5 opacity-70" />
                                Upcoming events
                            </div>
                            <Card className="border border-[rgba(55,53,47,0.09)] shadow-[0_2px_4px_rgba(55,53,47,0.04)] rounded-2xl overflow-hidden bg-white min-h-[300px] flex flex-col md:flex-row">
                                {/* Left Side: Connect Promo */}
                                <div className="p-8 flex-1 flex flex-col justify-center space-y-5 border-b md:border-b-0 md:border-r border-[rgba(55,53,47,0.06)] bg-[#FCFCFA]">
                                    <div className="h-10 w-10 text-[#37352F]/30 mb-1">
                                        <Calendar className="h-full w-full stroke-[1.5]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-[16px] text-[#37352F] leading-snug">Connect AI Meeting Notes<br />with your Calendar events</h3>
                                        <p className="text-[13px] text-[#37352F]/60 leading-relaxed max-w-[280px]">Join calls, transcribe audio, and summarize meetings all in Lekh.</p>
                                    </div>
                                    <Button
                                        onClick={() => showToast('Calendar connected successfully!', 'success')}
                                        variant="link"
                                        className="p-0 h-auto text-primary text-[13px] font-medium hover:no-underline hover:opacity-80 justify-start"
                                    >
                                        Connect Calendar
                                        <MoveRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Right Side: Timeline */}
                                <div className="p-8 flex-[1.2] bg-white rounded-r-2xl">
                                    <div className="flex flex-col h-full justify-center pt-2">
                                        <TimelineItem
                                            date="Dec 10"
                                            title="Team standup"
                                            time="9:00 AM • Office"
                                            action
                                            active
                                            onAction={handleJoinMeeting}
                                        />
                                        <TimelineItem
                                            date="Dec 11"
                                            title="Project check-in"
                                            time="10:00 AM • Office"
                                            isLast
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            {/* Help Button Floating */}
            <div className="fixed bottom-6 right-6">
                <Button
                    onClick={() => openModal('help')}
                    className="h-[34px] w-[34px] rounded-full bg-white border border-[rgba(55,53,47,0.16)] shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:bg-[#F7F7F5] text-[#37352F]/60 p-0 flex items-center justify-center"
                >
                    <span className="text-[16px] font-medium">?</span>
                </Button>
            </div>
        </div>
    )
}

function RecentCard({ icon, title, meta, user, onClick }: { icon: ReactNode, title: string, meta: string, user: string, onClick?: () => void }) {
    const navigate = useNavigate()
    const handleClick = () => {
        if (onClick) {
            onClick()
            return
        }
        if (title === 'To-dos') {
            navigate('/todos')
        }
    }

    return (
        <Card onClick={handleClick} className="w-[160px] p-4 border border-[rgba(55,53,47,0.09)] shadow-[0_1px_2px_rgba(55,53,47,0.04)] hover:bg-[#F7F7F5] transition-colors cursor-pointer flex flex-col justify-between h-[104px] bg-white group rounded-2xl">
            <div className="h-6 w-6 rounded flex items-center justify-center text-[#37352F]">
                {icon}
            </div>
            <div className="space-y-1">
                <h3 className="text-[14px] font-medium text-[#37352F]">{title}</h3>
                <div className="flex items-center gap-2">
                    <Avatar className="h-3.5 w-3.5 mr-0.5" src={`/placeholder.jpg`} fallback={user} />
                    <span className="text-[12px] text-[#37352F]/50">{meta}</span>
                </div>
            </div>
        </Card>
    )
}

function NewPageCard() {
    const navigate = useNavigate()
    return (
        <Card
            onClick={() => navigate('/documents/new')}
            className="w-[160px] p-4 border border-[rgba(55,53,47,0.09)] shadow-[0_1px_2px_rgba(55,53,47,0.04)] hover:bg-[#F7F7F5] transition-colors cursor-pointer flex flex-col items-start gap-4 h-[104px] bg-white group rounded-2xl"
        >
            <div className="h-[24px] w-[24px] bg-transparent rounded flex items-center justify-center text-[#37352F]/40">
                <Plus className="h-[20px] w-[20px] opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[14px] font-medium text-[#37352F]/60 group-hover:text-[#37352F] transition-colors mt-auto">New page</span>
        </Card>
    )
}

function TimelineItem({ date, title, time, action, active, isLast, onAction }: {
    date: string,
    title: string,
    time: string,
    action?: boolean,
    active?: boolean,
    isLast?: boolean,
    onAction?: () => void
}) {
    return (
        <div className="flex gap-4 group">
            {/* Date Column */}
            <div className="w-[48px] flex flex-col items-end pt-0.5">
                <span className="text-[11px] text-[#37352F]/40 leading-none">{date}</span>
            </div>

            {/* Timeline Track */}
            <div className="relative flex flex-col items-center">
                {/* Dot */}
                <div className={cn(
                    "z-10 h-3 w-3 rounded-full border-[2.5px] bg-white transition-all duration-300",
                    active
                        ? "border-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.2)] scale-110"
                        : "border-[rgba(55,53,47,0.15)] group-hover:border-[rgba(55,53,47,0.3)]"
                )} />
                {/* Line */}
                {!isLast && (
                    <div className="w-[1.5px] flex-1 bg-[rgba(55,53,47,0.08)] my-1 rounded-full group-hover:bg-[rgba(55,53,47,0.12)] transition-colors" />
                )}
            </div>

            {/* Content Column */}
            <div className={cn("flex-1 pb-8", isLast ? "pb-0" : "")}>
                <div className="flex flex-col items-start -mt-1">
                    <h4 className={cn("text-[14px] transition-colors", active ? "font-semibold text-[#37352F]" : "font-medium text-[#37352F]/80")}>{title}</h4>
                    <span className="text-[12px] text-[#37352F]/50 mt-1 font-medium">{time}</span>

                    {action && (
                        <div className="mt-3">
                            <button
                                onClick={onAction}
                                className="flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 bg-white border border-[rgba(55,53,47,0.12)] shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-full text-[12px] font-medium text-[#37352F]/80 hover:bg-[#F7F7F5] hover:text-[#37352F] hover:border-[rgba(55,53,47,0.2)] transition-all hover:shadow-[0_2px_6px_rgba(0,0,0,0.04)] active:scale-95 group/btn"
                            >
                                <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                                    <Video className="h-2.5 w-2.5 fill-current" />
                                </div>
                                <span className="transform translate-y-[0.5px]">Join Meeting</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
