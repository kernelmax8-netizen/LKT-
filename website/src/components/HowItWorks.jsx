// NOTE: original placeholder_1.png is missing from src/assets — using a
// generated stand-in (same peach-circle size/color as the other 4 icons)
// until the real artwork is re-added.
import placeOrderIcon from '../assets/placeorder-generated-v2.png';
import getQuotesIcon from '../assets/getqutoesicon-square.png';
import compareIcon from '../assets/comapreicon-square.png';
import orderConfirmedIcon from '../assets/orderconfirmedicon-square.png';
import deliveryIcon from '../assets/deliveryicon-square.png';
import arrowIcon from '../assets/arrpwicon.png';

const steps = [
  {
    icon: placeOrderIcon,
    number: '1',
    title: 'Place Order',
    desc: 'Tell us what you need, quantity, location and delivery date.',
  },
  {
    icon: getQuotesIcon,
    number: '2',
    title: 'Get Quotes',
    desc: 'Nearby vendors receive your request and send quotes.',
  },
  {
    icon: compareIcon,
    number: '3',
    title: 'Compare & Choose',
    desc: 'Compare prices, delivery time and ratings. Choose the best offer.',
  },
  {
    icon: orderConfirmedIcon,
    number: '4',
    title: 'Order Confirmed',
    desc: 'Your order is confirmed and vendor prepares the delivery.',
  },
  {
    icon: deliveryIcon,
    number: '5',
    title: 'Delivery & Payment',
    desc: 'Get your Lakdi delivered on time and make secure payment.',
  },
];

function StepIcon({ step, className }) {
  return <img src={step.icon} alt={step.title} className={`${className} object-contain`} />;
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
          How{' '}
          <span className="text-brand-green">LakdiKi</span>
          <span className="text-brand-orange">Taal</span>{' '}
          Works
        </h2>

        {/* Icons + arrows row */}
        <div className="hidden lg:flex items-center justify-between mb-5">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-center flex-1">
              {/* Icon badge (already includes its own circular background) */}
              <div className="flex-shrink-0 w-16 h-16 mx-auto">
                <StepIcon step={step} className="w-full h-full" />
              </div>

              {/* Arrow — not on last step */}
              {i < steps.length - 1 && (
                <div className="flex-1 flex items-center justify-center">
                  <img src={arrowIcon} alt="" className="w-7 h-8 object-contain" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Text row (desktop) */}
        <div className="hidden lg:flex items-start justify-between">
          {steps.map((step) => (
            <div key={step.number} className="flex-1 flex flex-col items-center text-center px-2">
              <h3 className="font-bold text-gray-900 mb-1 text-sm">
                {step.number}. {step.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[120px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: stacked list */}
        <div className="flex flex-col gap-6 lg:hidden">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="w-14 h-14 flex-shrink-0">
                <StepIcon step={step} className="w-full h-full" />
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-gray-900 text-sm mb-0.5">
                  {step.number}. {step.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
