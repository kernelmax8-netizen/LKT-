import { Link } from 'react-router-dom';
import { Bell, ChevronDown } from 'lucide-react';
import LogoIcon from '../LogoIcon';

const appLinks = [
  { label: 'Dashboard', href: '/book-lakdi' },
  { label: 'My Orders', href: '#orders' },
  { label: 'My Quotations', href: '#quotations' },
  { label: 'My Addresses', href: '#addresses' },
];

export default function AppNavbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <LogoIcon size={36} />
            <span className="text-lg font-extrabold tracking-tight">
              <span className="text-brand-brown">Lakdi</span>
              <span className="text-brand-green">Ki</span>
              <span className="text-brand-orange">Taal</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {appLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-green transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-brand-orange" />
            </button>

            <button type="button" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-green/15 text-brand-green flex items-center justify-center text-xs font-bold flex-shrink-0">
                R
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">Hi, Rahul</span>
              <ChevronDown size={14} className="hidden sm:block text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
