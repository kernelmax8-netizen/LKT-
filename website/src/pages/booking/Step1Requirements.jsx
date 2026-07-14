import { Check, Truck, Calendar, CalendarDays, ArrowRight, Lock } from 'lucide-react';
import { woodTypeOptions } from '../../data/woodTypes';
import OrderSummaryCard from '../../components/booking/OrderSummaryCard';
import WhyBookWithUs from '../../components/booking/WhyBookWithUs';
import NeedHelpCard from '../../components/booking/NeedHelpCard';

const purposes = ['Restaurant', 'Wedding / Function', 'Personal / Household', 'Hotel', 'Bakery', 'Other'];

const deliveryPrefs = [
  { key: 'Same Day', label: 'Same Day', desc: 'Within a few hours', icon: Truck },
  { key: 'Tomorrow', label: 'Tomorrow', desc: 'Next day delivery', icon: Calendar },
  { key: 'Select Date', label: 'Select Date', desc: 'Choose a specific date', icon: CalendarDays },
];

const inputClass =
  'w-full bg-[#FBF8F2] border border-[#EDE2CD] rounded-lg px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors';

export default function Step1Requirements({ order, updateOrder, onNext }) {
  const toggleWood = (opt) => {
    const exists = order.woodTypes.some((w) => w.key === opt.key);
    const next = exists ? order.woodTypes.filter((w) => w.key !== opt.key) : [...order.woodTypes, opt];
    updateOrder({ woodTypes: next });
  };

  const canProceed = order.woodTypes.length > 0 && order.quantity && order.purpose && order.deliveryPreference;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 min-w-0 bg-white border border-[#F1E7D4] rounded-2xl p-6 sm:p-8">
      {/* 1. Wood types */}
      <section className="mb-8">
        <h3 className="text-base font-bold text-gray-900 mb-1">1. What type of lakdi do you need?</h3>
        <p className="text-xs text-gray-500 mb-4">Select one or more types</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {woodTypeOptions.map((opt) => {
            const Icon = opt.icon;
            const checked = order.woodTypes.some((w) => w.key === opt.key);
            return (
              <button
                type="button"
                key={opt.key}
                onClick={() => toggleWood(opt)}
                className={`relative flex flex-col items-center gap-2 border rounded-xl py-5 px-3 text-center transition-colors ${
                  checked
                    ? 'border-brand-green bg-brand-green/5'
                    : 'border-[#EDE2CD] bg-[#FBF8F2] hover:border-brand-green/40'
                }`}
              >
                <span
                  className={`absolute top-2.5 right-2.5 w-4 h-4 rounded border flex items-center justify-center ${
                    checked ? 'bg-brand-green border-brand-green' : 'border-gray-300 bg-white'
                  }`}
                >
                  {checked && <Check size={11} className="text-white" strokeWidth={3} />}
                </span>
                <Icon size={32} className="text-brand-brown" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-gray-800">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Quantity */}
      <section className="mb-8">
        <h3 className="text-base font-bold text-gray-900 mb-1">2. Quantity</h3>
        <p className="text-xs text-gray-500 mb-4">Enter the quantity you need</p>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
          <div className="w-full sm:w-40">
            <input
              type="number"
              min="1"
              value={order.quantity}
              onChange={(e) => updateOrder({ quantity: e.target.value })}
              placeholder="0"
              className={inputClass}
            />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1.5">Unit</p>
            <div className="flex gap-2">
              {['Quintal', 'Kg', 'Ton'].map((u) => (
                <button
                  type="button"
                  key={u}
                  onClick={() => updateOrder({ unit: u })}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    order.unit === u
                      ? 'border-brand-green bg-brand-green/5 text-brand-green'
                      : 'border-[#EDE2CD] text-gray-600'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      order.unit === u ? 'border-brand-green' : 'border-gray-300'
                    }`}
                  >
                    {order.unit === u && <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />}
                  </span>
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Purpose */}
      <section className="mb-8">
        <h3 className="text-base font-bold text-gray-900 mb-1">3. Purpose</h3>
        <p className="text-xs text-gray-500 mb-4">What is this order for?</p>
        <select
          value={order.purpose}
          onChange={(e) => updateOrder({ purpose: e.target.value })}
          className={`sm:w-1/2 ${inputClass}`}
        >
          <option value="">Select purpose</option>
          {purposes.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </section>

      {/* 4. Delivery preference */}
      <section className="mb-8">
        <h3 className="text-base font-bold text-gray-900 mb-1">4. Delivery Preference</h3>
        <p className="text-xs text-gray-500 mb-4">When do you need the delivery?</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {deliveryPrefs.map((d) => {
            const Icon = d.icon;
            const active = order.deliveryPreference === d.key;
            return (
              <button
                type="button"
                key={d.key}
                onClick={() => updateOrder({ deliveryPreference: d.key })}
                className={`flex flex-col items-center gap-1.5 border rounded-xl py-5 px-3 text-center transition-colors ${
                  active ? 'border-brand-green bg-brand-green/5' : 'border-[#EDE2CD] bg-[#FBF8F2]'
                }`}
              >
                <Icon size={22} className={active ? 'text-brand-green' : 'text-gray-400'} />
                <span className={`text-sm font-semibold ${active ? 'text-brand-green' : 'text-gray-800'}`}>
                  {d.label}
                </span>
                <span className="text-xs text-gray-500">{d.desc}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. Notes */}
      <section className="mb-8">
        <h3 className="text-base font-bold text-gray-900 mb-1">
          5. Additional Notes <span className="text-gray-400 font-normal text-sm">(Optional)</span>
        </h3>
        <p className="text-xs text-gray-500 mb-4">Add any special instructions for vendors</p>
        <textarea
          rows={3}
          maxLength={300}
          value={order.notes}
          onChange={(e) => updateOrder({ notes: e.target.value })}
          placeholder="e.g. Need dry wood, easy unloading, small vehicle preferred..."
          className={`${inputClass} resize-none`}
        />
        <p className="text-right text-xs text-gray-400 mt-1">{order.notes.length}/300</p>
      </section>

      <button
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className="w-full bg-brand-green hover:bg-brand-green-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
      >
        Next
        <ArrowRight size={16} />
      </button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-3">
        <Lock size={12} />
        Your information is secure and will only be shared with relevant vendors.
      </p>
      </div>

      <aside className="w-full lg:w-80 flex-shrink-0 space-y-5">
        <OrderSummaryCard order={order} />
        <WhyBookWithUs />
        <NeedHelpCard />
      </aside>
    </div>
  );
}
