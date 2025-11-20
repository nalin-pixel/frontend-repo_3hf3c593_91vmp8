import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const isBuilder = location.pathname === '/builder'
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-800 font-semibold">
            <span className="inline-flex w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-sm" />
            <span>Resume Builder</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                !isBuilder ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/builder"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isBuilder ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Start Building
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
