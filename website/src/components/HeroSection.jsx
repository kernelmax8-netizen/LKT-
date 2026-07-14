import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import vendorVerifyIcon from '../assets/vendorverifyicon-square.png';
import bestPriceIcon from '../assets/bestpriceicon-square.png';
import timelyIcon from '../assets/timelyicon-square.png';
import reliableIcon from '../assets/relaibaleicon-square.png';

const trustBadges = [
  { icon: vendorVerifyIcon, label: 'Verified Vendors' },
  { icon: bestPriceIcon,    label: 'Best Price Quotes' },
  { icon: timelyIcon,       label: 'Timely Delivery' },
  { icon: reliableIcon,     label: 'Reliable Support' },
];

export default function HeroSection() {
  return (
    <section id="home" className="bg-brand-cream pt-10 pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">

          {/* ── Left: Text ── */}
          <div className="flex-none w-full lg:w-[48%] pt-4">
            <h1 className="text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold leading-[1.18] text-gray-900 mb-5">
              India's Trusted
              <br />
              <span className="text-brand-green">Marketplace</span>{' '}
              <span className="text-gray-900">for</span>
              <br />
              <span className="text-brand-orange">Wood &amp; Charcoal</span>
            </h1>

            <p className="text-gray-500 text-sm lg:text-base mb-8 leading-relaxed max-w-[340px]">
              Get the best prices from nearby Lakdi ke Tal vendors.
              Transparent pricing, real quotes, timely delivery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                to="/book-lakdi"
                className="flex items-center gap-2 bg-brand-green text-white font-semibold px-5 py-3 rounded-xl hover:bg-brand-green-dark transition-colors duration-200 shadow-md"
              >
                <ShoppingCart size={16} />
                <div className="text-left leading-tight">
                  <div className="text-sm font-bold">Order Lakdi</div>
                  <div className="text-[11px] opacity-80">I am a Buyer</div>
                </div>
              </Link>
              <Link
                to="/vendor-onboarding"
                className="flex items-center gap-2 bg-brand-orange text-white font-semibold px-5 py-3 rounded-xl hover:bg-brand-orange-dark transition-colors duration-200 shadow-md"
              >
                <Store size={16} />
                <div className="text-left leading-tight">
                  <div className="text-sm font-bold">Join as Vendor</div>
                  <div className="text-[11px] opacity-80">I want to sell Lakdi</div>
                </div>
              </Link>
            </div>

            {/* Trust Badges — single row */}
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5 text-gray-600 whitespace-nowrap">
                  <img src={badge.icon} alt="" className="w-5 h-5 object-contain flex-shrink-0" />
                  <span className="text-xs font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image (transparent background) ── */}
          <div className="flex-1 flex justify-center lg:justify-end items-center lg:-mt-4">
            <img
              src="/wood-charcoal-nobg.png"
              alt="Wood logs and charcoal"
              className="w-full max-w-[500px] lg:max-w-[560px] object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
