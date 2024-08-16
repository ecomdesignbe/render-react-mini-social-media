import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Connexion from './pages/connexion/Connexion.jsx'
import Inscription from './pages/inscription/Inscription.jsx'
import {Toaster} from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient()

// Création de l'objet browserRouter

const router = createBrowserRouter([
  {
    path : '/',
    element: <Dashboard></Dashboard>
  },
  {
    path : '/connexion',
    element : <Connexion></Connexion>
  },
  {
    path : '/inscription',
    element : <Inscription></Inscription>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
