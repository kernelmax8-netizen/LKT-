import { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { vendors, totalAmount } from '../../data/vendors';
import VendorAvatar from '../../components/booking/VendorAvatar';
import OrderSummaryCard from '../../components/booking/OrderSummaryCard';
import NeedHelpCard from '../../components/booking/NeedHelpCard';

const trustPoints = [
  'Quality assured wood',
  'On-time delivery',
  'No hidden charges',
  'Safe & secure transactions',
  'Rated by real customers',
];

export default function Step4ChooseVendor({ order, updateOrder, onNext, onPrevious, onEditStep1 }) {
  const [selected, setSelected] = useState(order.selectedVendorId || vendors.find((v) => v.recommended)?.id);
  const quantity = Number(order.quantity) || 1;

  const handleNext = () => {
    updateOrder({ selectedVendorId: selected });
    onNext();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-[#F1E7D4] rounded-2xl p-6 sm:p-8">
          <h3 className="text-base font-bold text-gray-900 mb-1">Select a Vendor</h3>
          <p className="text-xs text-gray-500 mb-5">Review vendor details and quotation. Choose the best offer for your order.</p>

          <div className="space-y-4">
            {vendors.map((v) => {
              const total = totalAmount(v, quantity);
              const isSelected = selected === v.id;
              return (
                <div
                  key={v.id}
                  className={`border rounded-xl overflow-hidden transition-colors ${
                    isSelected ? 'border-brand-green bg-brand-green/5' : 'border-[#F1E7D4]'
                  }`}
                >
                  {v.recommended && (
                    <div className="bg-brand-green text-white text-[11px] font-bold px-4 py-1">Recommended</div>
                  )}
                  <button type="button" onClick={() => setSelected(v.id)} className="w-full text-left p-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <VendorAvatar type={v.iconType} size={44} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-bold text-gray-900">{v.name}</p>
                            {v.verified && (
                              <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-1.5 py-0.5 rounded">
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Star size={11} className="text-brand-orange fill-brand-orange" />
                            {v.rating} ({v.reviews} Reviews) &middot; {v.distance} &middot; {v.area}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <p className="text-xs text-gray-400">Price / Quintal</p>
                          <p className="font-bold text-gray-900">₹{v.pricePerQuintal}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Delivery Charges</p>
                          <p className="font-bold text-gray-900">₹{v.deliveryCharge}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400">Total Amount</p>
                          <p className="font-extrabold text-gray-900">₹{total.toLocaleString('en-IN')}</p>
                          {v.save > 0 && <p className="text-[11px] text-brand-green">You Save ₹{v.save}</p>}
                        </div>
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'border-brand-green' : 'border-gray-300'
                          }`}
                        >
                          {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-brand-green" />}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F1E7D4]">
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
                        <span>Stock: {v.stock}</span>
                        <span>Delivery: {v.deliveryTime}</span>
                        <span>Vehicle: {v.vehicleType}</span>
                        <span>Payment: {v.payment}</span>
                      </div>
                      <span className="text-xs font-semibold text-brand-green hover:underline">View Vendor Details</span>
                    </div>

                    {v.recommended && (
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-green/20">
                        <p className="text-xs font-semibold text-brand-green">
                          Best Overall Offer — Lowest delivery time with great price
                        </p>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex items-start gap-2 bg-[#EEF3E4] border border-[#DCE7C8] rounded-lg px-4 py-3 mt-6 mb-6 text-xs text-gray-700">
            <ShieldCheck size={15} className="text-brand-green mt-0.5 flex-shrink-0" />
            All vendors are verified and rated by real customers. Your order is safe with us.
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onPrevious}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 font-bold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!selected}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-colors duration-200 shadow-md"
            >
              Continue to Confirm Order
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <aside className="w-full lg:w-80 flex-shrink-0 space-y-5">
        <OrderSummaryCard order={order} editable onEdit={onEditStep1} showDeliverTo />
        <div className="bg-[#EAF1FB] border border-[#CFE0F5] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={16} className="text-blue-600" />
            <h3 className="text-sm font-bold text-gray-900">Why choose verified vendors?</h3>
          </div>
          <div className="space-y-2">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Check size={10} className="text-white" strokeWidth={3} />
                </span>
                <p className="text-xs text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
        <NeedHelpCard />
      </aside>
    </div>
  );
}
