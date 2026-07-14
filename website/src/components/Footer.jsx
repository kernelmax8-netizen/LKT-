import { Link } from 'react-router-dom';
import LogoIcon from './LogoIcon';

const footerLinks = [
  { label: 'About Us', href: '/#about' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'For Vendors', href: '/vendor-onboarding' },
  { label: 'FAQs', href: '/#faqs' },
  { label: 'Contact Us', href: '/#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <LogoIcon size={34} />
            <span className="text-lg font-extrabold tracking-tight">
              <span className="text-white">Lakdi</span>
              <span className="text-brand-green-light">Ki</span>
              <span className="text-brand-orange">Taal</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © 2024 LakdiKiTaal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
