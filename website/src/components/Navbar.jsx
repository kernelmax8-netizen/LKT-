import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import LogoIcon from './LogoIcon';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'For Vendors', href: '/vendor-onboarding' },
  { label: 'FAQs', href: '/#faqs' },
  { label: 'Contact Us', href: '/#contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <LogoIcon size={38} />
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-brand-brown">Lakdi</span>
              <span className="text-brand-green">Ki</span>
              <span className="text-brand-orange">Taal</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              const className = `text-sm font-medium transition-colors duration-200 relative pb-0.5 ${
                active
                  ? 'text-brand-green border-b-2 border-brand-green'
                  : 'text-gray-600 hover:text-brand-green border-b-2 border-transparent hover:border-brand-green'
              }`;

              return (
                <Link key={link.label} to={link.href} className={className}>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Login / Sign Up */}
          <a
            href="#login"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-full px-4 py-2 hover:border-brand-green hover:text-brand-green transition-colors duration-200"
          >
            <User size={14} />
            Login / Sign Up
          </a>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-brand-green">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
