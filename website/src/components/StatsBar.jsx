import { Users, PackageCheck, Star, MapPin } from 'lucide-react';

const stats = [
  {
    icon: <Users size={22} />,
    value: '1000+',
    label: 'Verified Vendors',
    iconBg: 'bg-green-100',
    iconColor: 'text-brand-green',
  },
  {
    icon: <PackageCheck size={22} />,
    value: '5000+',
    label: 'Orders Delivered',
    iconBg: 'bg-orange-100',
    iconColor: 'text-brand-orange',
  },
  {
    icon: <Star size={22} />,
    value: '4.8/5',
    label: 'Customer Rating',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-500',
  },
  {
    icon: <MapPin size={22} />,
    value: '50+',
    label: 'Cities Covered',
    iconBg: 'bg-green-100',
    iconColor: 'text-brand-green',
  },
];

export default function StatsBar() {
  return (
    <section className="py-10 bg-brand-cream border-t border-brand-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm"
            >
              <div className={`w-12 h-12 rounded-full ${stat.iconBg} flex items-center justify-center flex-shrink-0 ${stat.iconColor}`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-extrabold text-gray-900 leading-tight">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
