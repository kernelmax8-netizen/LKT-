import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { User, LogOut, Menu, X } from 'lucide-react'
import LogoIcon from './LogoIcon'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'For Vendors', href: '/vendor-onboarding' },
  { label: 'FAQs', href: '/#faqs' },
  { label: 'Contact Us', href: '/#contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { isAuthenticated, profile, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0" onClick={closeMenu}>
            <LogoIcon size={38} />
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-brand-brown">Lakdi</span>
              <span className="text-brand-green">Ki</span>
              <span className="text-brand-orange">Taal</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = pathname === link.href
              const className = `text-sm font-medium transition-colors duration-200 relative pb-0.5 ${
                active
                  ? 'text-brand-green border-b-2 border-brand-green'
                  : 'text-gray-600 hover:text-brand-green border-b-2 border-transparent hover:border-brand-green'
              }`

              return (
                <Link key={link.label} to={link.href} className={className}>
                  {link.label}
                </Link>
              )
            })}
          </div>

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-gray-700">Hi, {profile?.name?.split(' ')[0] || 'User'}</span>
              <button
                type="button"
                onClick={() => signOut()}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-full px-4 py-2 hover:border-brand-green hover:text-brand-green transition-colors duration-200"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-full px-4 py-2 hover:border-brand-green hover:text-brand-green transition-colors duration-200"
            >
              <User size={14} />
              Login / Sign Up
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-brand-green"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {navLinks.map((link) => {
              const active = pathname === link.href
              const className = `block px-2 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                active ? 'text-brand-green bg-brand-green/5' : 'text-gray-600 hover:text-brand-green hover:bg-gray-50'
              }`

              return (
                <Link key={link.label} to={link.href} className={className} onClick={closeMenu}>
                  {link.label}
                </Link>
              )
            })}

            <div className="pt-2 px-2">
              {isAuthenticated ? (
                <div className="flex items-center justify-between gap-3 py-1">
                  <span className="text-sm text-gray-700">Hi, {profile?.name?.split(' ')[0] || 'User'}</span>
                  <button
                    type="button"
                    onClick={() => {
                      signOut()
                      closeMenu()
                    }}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-full px-4 py-2 hover:border-brand-green hover:text-brand-green transition-colors duration-200"
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-brand-green rounded-full px-4 py-2.5 hover:bg-brand-green-dark transition-colors duration-200"
                >
                  <User size={14} />
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
