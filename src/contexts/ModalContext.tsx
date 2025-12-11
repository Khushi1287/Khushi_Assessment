import React, { createContext, useContext, useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Search, Monitor, Moon, Bell, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ModalType = 'search' | 'settings' | 'ai' | 'help' | null

interface ModalContextType {
    openModal: (type: ModalType) => void
    closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [activeModal, setActiveModal] = useState<ModalType>(null)

    const closeModal = () => setActiveModal(null)

    return (
        <ModalContext.Provider value={{ openModal: setActiveModal, closeModal }}>
            {children}

            {/* Search Modal */}
            <Modal isOpen={activeModal === 'search'} onClose={closeModal} className="max-w-2xl p-0 overflow-hidden">
                <div className="flex items-center px-4 py-3 border-b border-[#37352F]/10">
                    <Search className="h-5 w-5 text-[#37352F]/40 mr-3" />
                    <input
                        className="flex-1 bg-transparent border-none outline-none text-[16px] placeholder:text-[#37352F]/40"
                        placeholder="Search for something..."
                        autoFocus
                    />
                    <div className="text-[12px] px-1.5 py-0.5 rounded border border-[#37352F]/10 text-[#37352F]/40 bg-[#F7F7F5]">ESC</div>
                </div>
                <div className="p-2 min-h-[300px]">
                    <div className="text-[13px] font-medium text-[#37352F]/40 px-3 py-2">Suggested</div>
                    <div className="px-2 space-y-1">
                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-[#F7F7F5] rounded-md cursor-pointer transition-colors">
                            <div className="h-8 w-8 rounded bg-white border border-[#37352F]/10 flex items-center justify-center">
                                <span className="text-[14px]">📝</span>
                            </div>
                            <div className="text-[14px] text-[#37352F]">Project Notes</div>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-[#F7F7F5] rounded-md cursor-pointer transition-colors">
                            <div className="h-8 w-8 rounded bg-white border border-[#37352F]/10 flex items-center justify-center">
                                <span className="text-[14px]">✅</span>
                            </div>
                            <div className="text-[14px] text-[#37352F]">To-dos</div>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Settings Modal */}
            <Modal isOpen={activeModal === 'settings'} onClose={closeModal} title="Settings">
                <div className="space-y-6">
                    <div className="flex items-center gap-4 py-2">
                        <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium">BB</div>
                        <div>
                            <div className="font-medium text-[#37352F]">BinaryBeam.Be</div>
                            <div className="text-[13px] text-[#37352F]/60">user@example.com</div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center justify-between px-3 py-2 hover:bg-[#F7F7F5] rounded-lg cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                                <Moon className="h-4 w-4 text-[#37352F]/60" />
                                <span className="text-[14px] text-[#37352F]">Appearance</span>
                            </div>
                            <span className="text-[13px] text-[#37352F]/40">Light</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 hover:bg-[#F7F7F5] rounded-lg cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                                <Bell className="h-4 w-4 text-[#37352F]/60" />
                                <span className="text-[14px] text-[#37352F]">Notifications</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 hover:bg-[#F7F7F5] rounded-lg cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                                <Monitor className="h-4 w-4 text-[#37352F]/60" />
                                <span className="text-[14px] text-[#37352F]">App Settings</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-[#37352F]/10">
                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-red-50 text-red-600 rounded-lg cursor-pointer transition-colors">
                            <LogOut className="h-4 w-4" />
                            <span className="text-[14px] font-medium">Log out</span>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* AI Modal */}
            <Modal isOpen={activeModal === 'ai'} onClose={closeModal} className="max-w-2xl h-[500px] flex flex-col p-0">
                <div className="flex-1 bg-white p-6 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                        <span className="text-2xl">✨</span>
                    </div>
                    <h3 className="text-[18px] font-semibold text-[#37352F]">Lekh AI Assistant</h3>
                    <p className="text-[14px] text-[#37352F]/60 max-w-sm">I can help you write, edit, and brainstorm. What would you like to do today?</p>
                </div>
                <div className="p-4 border-t border-[#37352F]/10 bg-[#F7F7F5]/50">
                    <div className="relative">
                        <input
                            className="w-full h-10 pl-4 pr-10 rounded-lg border border-[#37352F]/10 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            placeholder="Ask AI to write something..."
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="h-6 w-6 rounded bg-[#37352F] flex items-center justify-center">
                                <span className="text-white text-[10px]">↵</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Help Modal */}
            <Modal isOpen={activeModal === 'help'} onClose={closeModal} title="Help & Support">
                <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-[#F7F7F5] border border-[#37352F]/5 space-y-2">
                        <div className="text-[14px] font-medium text-[#37352F]">Documentation</div>
                        <p className="text-[13px] text-[#37352F]/60">Learn how to use Lekh and get the most out of your workspace.</p>
                        <Button variant="outline" className="h-8 text-[12px] w-full justify-center">View Guides</Button>
                    </div>
                    <div className="p-4 rounded-lg bg-[#F7F7F5] border border-[#37352F]/5 space-y-2">
                        <div className="text-[14px] font-medium text-[#37352F]">Contact Support</div>
                        <p className="text-[13px] text-[#37352F]/60">Have a question? Our team is here to help you.</p>
                        <Button variant="outline" className="h-8 text-[12px] w-full justify-center">Send Message</Button>
                    </div>
                    <div className="flex justify-center pt-2">
                        <span className="text-[12px] text-[#37352F]/40">Lekh v1.0.0</span>
                    </div>
                </div>
            </Modal>

        </ModalContext.Provider>
    )
}

export function useModal() {
    const context = useContext(ModalContext)
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}
