import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import LogoIcon from '../LogoIcon';

function FacebookIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.3C16.24 4.27 15.36 4.2 14.33 4.2c-2.15 0-3.63 1.31-3.63 3.72V10.5H8v3h2.7V21h2.8z" />
    </svg>
  );
}

function InstagramIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'For Vendors', href: '/vendor-onboarding' },
  { label: 'FAQs', href: '/#faqs' },
  { label: 'Contact Us', href: '/#contact' },
];

const vendorLinks = [
  { label: 'Join as Vendor', href: '/vendor-onboarding' },
  { label: 'Vendor Login', href: '/login?role=vendor' },
  { label: 'Vendor Guide', href: '#guide' },
];

const socialLinks = [
  { icon: MessageCircle, href: '#whatsapp', label: 'WhatsApp' },
  { icon: FacebookIcon, href: '#facebook', label: 'Facebook' },
  { icon: InstagramIcon, href: '#instagram', label: 'Instagram' },
];

function FooterLink({ href, children }) {
  const className = 'text-sm text-gray-300 hover:text-white transition-colors duration-200';
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export default function VendorFooter() {
  return (
    <footer
      className="text-gray-300 pt-14 pb-6"
      style={{ background: 'linear-gradient(160deg, #3B1F0A 0%, #2B1608 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <LogoIcon size={36} />
              <span className="text-lg font-extrabold tracking-tight">
                <span className="text-white">Lakdi</span>
                <span className="text-brand-green-light">Ki</span>
                <span className="text-brand-orange">Taal</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              India's trusted marketplace for wood and charcoal. Connecting buyers with verified Lakdi Ki Taal
              vendors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">For Vendors</h4>
            <ul className="space-y-2.5">
              {vendorLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2.5 mb-5">
              <li className="flex items-center gap-2.5 text-sm text-gray-300">
                <Phone size={15} className="text-brand-orange flex-shrink-0" />
                +91 91234 56789
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-300">
                <Mail size={15} className="text-brand-orange flex-shrink-0" />
                support@lakdikitaal.com
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-300">
                <MapPin size={15} className="text-brand-orange flex-shrink-0" />
                Hyderabad, Telangana, India
              </li>
            </ul>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-gray-300 hover:border-brand-orange hover:text-brand-orange transition-colors duration-200"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2024 LakdiKiTaal. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <a href="#privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <span className="text-gray-600">|</span>
            <a href="#terms" className="hover:text-white transition-colors duration-200">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
