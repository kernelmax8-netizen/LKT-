import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTABanner() {
  return (
    <section
      className="py-10"
      style={{ background: 'linear-gradient(120deg, #3B1F0A 0%, #5C3D1E 45%, #3B1F0A 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Left: image + text */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 hidden sm:block">
              <img
                src="/wood-charcoal-nobg.png"
                alt="Wood and charcoal"
                className="w-[130px] h-[110px] object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-2 leading-snug">
                Lakdi Chahiye?{' '}
                <span className="text-brand-orange">Best Price</span>{' '}
                Yahi Paayenge!
              </h2>
              <p className="text-sm text-gray-300 max-w-md leading-relaxed">
                Join thousands of happy customers who trust{' '}
                <span className="text-brand-orange font-semibold">LakdiKiTaal</span>{' '}
                for their wood and charcoal needs.
              </p>
            </div>
          </div>

          {/* Right: CTA buttons */}
          <div className="flex flex-wrap gap-4 flex-shrink-0">
            <Link
              to="/book-lakdi"
              className="flex items-center gap-2 bg-brand-orange text-white font-bold px-6 py-3.5 rounded-xl hover:bg-brand-orange-dark transition-colors duration-200 shadow-lg whitespace-nowrap"
            >
              Order Lakdi Now
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/vendor-onboarding"
              className="flex items-center gap-2 border-2 border-white text-white font-bold px-6 py-3.5 rounded-xl hover:bg-white hover:text-gray-900 transition-colors duration-200 whitespace-nowrap"
            >
              Join as Vendor
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
