import { HandCoins, ShieldCheck, Layers, Truck, Lock } from 'lucide-react';

const reasons = [
  { icon: HandCoins, title: 'Best Price Quotes', desc: 'Compare and choose the best offer' },
  { icon: ShieldCheck, title: 'Verified Vendors', desc: 'Only trusted & quality vendors' },
  { icon: Layers, title: 'Transparent Process', desc: 'No hidden charges, no surprises' },
  { icon: Truck, title: 'On-time Delivery', desc: 'Timely delivery at your doorstep' },
  { icon: Lock, title: 'Secure & Safe', desc: 'Your data and payments are always safe' },
];

export default function WhyBookWithUs() {
  return (
    <div className="bg-white border border-[#F1E7D4] rounded-2xl p-5">
      <h3 className="text-sm font-bold text-gray-900 mb-4">Why book with us?</h3>
      <div className="space-y-3.5">
        {reasons.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0">
                <Icon size={15} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">{r.title}</p>
                <p className="text-xs text-gray-500 leading-snug">{r.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
