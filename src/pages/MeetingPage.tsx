import { Sidebar } from '@/components/Sidebar'
import { Video, Clock, Plus, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MeetingPage() {
    return (
        <div className="flex h-screen bg-white text-[#37352F] font-sans selection:bg-[#2EAADC] selection:text-white">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <div className="flex-1 flex flex-col items-center pt-[120px] px-6 pb-20">
                    <div className="w-full max-w-[840px] space-y-[40px]">

                        {/* Header */}
                        <header className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Video className="h-8 w-8 text-[#37352F]/80" />
                                <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#37352F] leading-tight">Meetings</h1>
                            </div>
                            <Button className="bg-[#0A85D1] hover:bg-[#0A85D1]/90 text-white h-8 text-[13px] font-medium rounded-sm">
                                <Plus className="h-4 w-4 mr-1" />
                                New meeting
                            </Button>
                        </header>

                        <div>
                            <div className="flex items-center gap-4 border-b border-[#37352F]/10 pb-2 mb-4">
                                <div className="text-[14px] font-medium text-[#37352F] border-b-2 border-[#37352F] pb-2 -mb-2.5 px-1">Upcoming</div>
                                <div className="text-[14px] font-medium text-[#37352F]/60 hover:text-[#37352F] transition-colors pb-2 -mb-2 px-1 cursor-pointer">Previous</div>
                                <div className="text-[14px] font-medium text-[#37352F]/60 hover:text-[#37352F] transition-colors pb-2 -mb-2 px-1 cursor-pointer">Recordings</div>
                            </div>

                            <div className="space-y-4">
                                <MeetingCard
                                    title="Team Standup"
                                    time="9:00 AM - 9:30 AM"
                                    date="Today"
                                    attendees={4}
                                    status="Live Now"
                                />
                                <MeetingCard
                                    title="Product Sync"
                                    time="11:00 AM - 12:00 PM"
                                    date="Today"
                                    attendees={2}
                                />
                                <MeetingCard
                                    title="Weekly Retro"
                                    time="4:00 PM - 5:00 PM"
                                    date="Tomorrow"
                                    attendees={8}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

function MeetingCard({ title, time, date, attendees, status }: { title: string, time: string, date: string, attendees: number, status?: string }) {
    return (
        <div className="group flex items-center justify-between p-4 border border-[#37352F]/10 rounded-lg hover:shadow-sm transition-all bg-white hover:bg-[#F7F7F5]/50">
            <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-[#F7F7F5] flex flex-col items-center justify-center border border-[#37352F]/5">
                    <span className="text-[10px] uppercase font-bold text-[#37352F]/40">{date === 'Today' ? 'DEC' : 'DEC'}</span>
                    <span className="text-[16px] font-bold text-[#37352F]">{date === 'Today' ? '10' : '11'}</span>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#37352F]">{title}</h3>
                        {status && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 animate-pulse">
                                {status.toUpperCase()}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3 text-[13px] text-[#37352F]/60 mt-0.5">
                        <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {time}
                        </div>
                        <span>•</span>
                        <div>
                            {attendees} attendees
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" className="h-8 text-[12px] font-medium border-[#37352F]/10 text-[#37352F]/80">
                    Join
                </Button>
                <div className="h-8 w-8 flex items-center justify-center rounded hover:bg-[#37352F]/5 cursor-pointer text-[#37352F]/40 hover:text-[#37352F] transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                </div>
            </div>
        </div>
    )
}
