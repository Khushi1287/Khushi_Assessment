import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { TodoProvider } from './contexts/TodoContext.tsx'
import { NotesProvider } from './contexts/NotesContext.tsx'
import { ModalProvider } from './contexts/ModalContext.tsx'
import { ToastProvider } from '@/components/ui/toast.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <TodoProvider>
            <ToastProvider>
              <ModalProvider>
                <App />
              </ModalProvider>
            </ToastProvider>
          </TodoProvider>
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

