import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Panel from './pages/Panel'
import { AuthProvider } from './context/AuthContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: '/registro', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/panel', element: <Panel /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
