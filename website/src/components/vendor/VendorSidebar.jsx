import { ShoppingCart, Tag, ClipboardList, TrendingUp, ShieldCheck, Headphones } from 'lucide-react';

const benefits = [
  {
    icon: ShoppingCart,
    title: 'Regular Orders',
    desc: 'Get daily orders from nearby customers looking for wood and charcoal.',
    solid: 'green',
  },
  {
    icon: Tag,
    title: 'Better Prices',
    desc: 'You decide your price. Receive multiple orders and choose what works for you.',
    solid: 'orange',
  },
  {
    icon: ClipboardList,
    title: 'Manage Your Stock',
    desc: 'Update your stock daily and let customers know what you have.',
    solid: 'green',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Business',
    desc: 'Increase your visibility, reach more customers and grow your sales.',
    solid: 'orange',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Secure',
    desc: 'Verified platform, secure payments and reliable support.',
    solid: 'green',
  },
];

export default function VendorSidebar() {
  return (
    <div className="w-full lg:w-[340px] flex-shrink-0">
      <div className="lg:sticky lg:top-24">
        <h1 className="text-[1.9rem] leading-[1.2] font-extrabold mb-4">
          <span className="text-brand-brown">Join Lakdi</span>
          <span className="text-brand-green">Ki</span>
          <span className="text-brand-orange">Taal</span>
          <br />
          <span className="text-gray-900">Grow Your Business</span>
          <br />
          <span className="text-gray-900">with More Orders</span>
        </h1>

        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
          List your wood, reach more customers, get more orders and grow your
          business with India's trusted marketplace.
        </p>

        <div className="relative flex justify-center items-center h-52 mb-10">
          <div className="w-48 h-48 rounded-full bg-[#F0ECDD]" />
          <img
            src="/wood-charcoal-nobg.png"
            alt="Wood and charcoal"
            className="absolute w-64 max-w-none object-contain"
          />
        </div>

        <h2 className="text-xl font-extrabold mb-4">
          <span className="text-gray-900">Why Join </span>
          <span className="text-brand-brown">Lakdi</span>
          <span className="text-brand-green">Ki</span>
          <span className="text-brand-orange">Taal</span>
          <span className="text-gray-900">?</span>
        </h2>

        <div className="space-y-3 mb-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="flex items-start gap-3 bg-white border border-[#F1E7D4] rounded-xl p-4"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    b.solid === 'green' ? 'bg-brand-green' : 'bg-brand-orange'
                  }`}
                >
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-0.5">{b.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-[#EDF2E3] rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-brand-green flex items-center justify-center flex-shrink-0 bg-[#EDF2E3]">
            <Headphones size={20} className="text-brand-green" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Need Help?</h3>
            <p className="text-xs text-gray-500 mb-1">Our team is here to help you.</p>
            <p className="text-sm font-bold text-brand-green">+91 91234 56789</p>
          </div>
        </div>
      </div>
    </div>
  );
}
