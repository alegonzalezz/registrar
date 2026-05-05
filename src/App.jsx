import { Routes, Route, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import Catalogo from './pages/Catalogo'
import Registro from './pages/Registro'
import Goals from './pages/Goals'
import Historial from './pages/Historial'
import Configuracion from './pages/Configuracion'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className="layout">
      <header className="navbar">
        <span className="navbar-brand">Macros</span>
        <nav className="navbar-links">
          <NavLink to="/">Dashboard</NavLink>
          {import.meta.env.DEV && <NavLink to="/catalogo">Catálogo</NavLink>}
          <NavLink to="/registro">Registro</NavLink>
          <NavLink to="/goals">Metas</NavLink>
          <NavLink to="/historial">Historial</NavLink>
          <NavLink to="/config">Config</NavLink>
        </nav>
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(d => !d)}
          aria-label="Cambiar tema"
        >
          {darkMode ? 'Claro' : 'Oscuro'}
        </button>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {import.meta.env.DEV && <Route path="/catalogo" element={<Catalogo />} />}
          <Route path="/registro" element={<Registro />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/config" element={<Configuracion />} />
        </Routes>
      </main>

      <nav className="bottom-nav">
        <NavLink to="/">Dashboard</NavLink>
        {import.meta.env.DEV && <NavLink to="/catalogo">Catálogo</NavLink>}
        <NavLink to="/registro">Registro</NavLink>
        <NavLink to="/goals">Metas</NavLink>
        <NavLink to="/historial">Historial</NavLink>
      </nav>
    </div>
  )
}
