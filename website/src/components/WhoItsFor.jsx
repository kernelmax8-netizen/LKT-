import {
  Utensils,
  ChefHat,
  Building2,
  Tent,
  ShoppingBag,
  Factory,
  Home,
  MoreHorizontal,
} from 'lucide-react';

const audiences = [
  { icon: <Utensils size={24} />, label: 'Restaurants' },
  { icon: <ChefHat size={24} />, label: 'Caterers' },
  { icon: <Building2 size={24} />, label: 'Hotels' },
  { icon: <Tent size={24} />, label: 'Event Organizers' },
  { icon: <ShoppingBag size={24} />, label: 'Bakeries' },
  { icon: <Factory size={24} />, label: 'Industries' },
  { icon: <Home size={24} />, label: 'Home Users' },
  { icon: <MoreHorizontal size={24} />, label: 'And More...' },
];

export default function WhoItsFor() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Who It's For
        </h2>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-6 justify-items-center">
          {audiences.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-cream border border-brand-cream-dark flex items-center justify-center text-gray-700 group-hover:bg-brand-green group-hover:text-white group-hover:border-brand-green transition-all duration-200 shadow-sm">
                {item.icon}
              </div>
              <span className="text-xs text-gray-600 font-medium text-center leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
