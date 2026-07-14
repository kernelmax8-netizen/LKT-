import { HandCoins, ShieldCheck, MapPin, Layers, Headphones, Leaf } from 'lucide-react';
// NOTE: leaf.png.png is missing from src/assets — using a temporary lucide
// leaf icon in its place until the original artwork is re-added.

const features = [
  {
    icon: <HandCoins size={26} />,
    title: 'Best Prices',
    desc: 'Get competitive quotes from multiple verified vendors near you.',
    solid: false,
    iconColor: 'text-brand-orange',
  },
  {
    icon: <ShieldCheck size={26} className="text-white" />,
    title: 'Verified Vendors',
    desc: 'All vendors are verified for quality, reliability and trust.',
    solid: true,
  },
  {
    icon: <MapPin size={26} />,
    title: 'Nearby & Fast',
    desc: 'Connect with nearby vendors for quick response and delivery.',
    solid: false,
    iconColor: 'text-brand-green',
  },
  {
    icon: <Layers size={26} />,
    title: 'Wide Range',
    desc: 'Firewood, raw wood, charcoal and more — all in one place.',
    solid: false,
    iconColor: 'text-brand-brown',
  },
  {
    icon: <Headphones size={26} />,
    title: 'Support',
    desc: 'We are here to help you at every step of your order.',
    solid: false,
    iconColor: 'text-gray-800',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative leaves */}
        <div className="relative">
          <Leaf
            className="hidden sm:block absolute -top-6 right-6 w-10 h-10 text-green-500 opacity-60 select-none rotate-12"
            strokeWidth={1.5}
          />
          <Leaf
            className="hidden sm:block absolute -bottom-2 -left-8 w-9 h-9 text-green-500 opacity-50 select-none rotate-[200deg]"
            strokeWidth={1.5}
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose <span className="text-brand-green">LakdiKi</span><span className="text-brand-orange">Taal</span>?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#FDF8F0] rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div
                className={
                  feature.solid
                    ? 'w-14 h-14 rounded-full bg-brand-green flex items-center justify-center mb-4'
                    : `w-14 h-14 rounded-full bg-white border-2 border-[#F0E4D0] flex items-center justify-center mb-4 ${feature.iconColor}`
                }
              >
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm">{feature.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
