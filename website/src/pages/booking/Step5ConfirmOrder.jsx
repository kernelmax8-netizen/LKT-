import { useState } from 'react';
import {
  Star,
  ArrowLeft,
  Lock,
  Package,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Truck,
  CheckCircle2,
  ShieldAlert,
  Banknote,
  Smartphone,
  CreditCard,
  Wallet,
} from 'lucide-react';
import { vendors, totalAmount } from '../../data/vendors';
import VendorAvatar from '../../components/booking/VendorAvatar';
import NeedHelpCard from '../../components/booking/NeedHelpCard';

const paymentOptions = [
  { key: 'cod', icon: Banknote, label: 'Cash on Delivery', desc: 'Pay when your order is delivered' },
  { key: 'upi', icon: Smartphone, label: 'UPI', desc: 'Pay using any UPI app' },
  { key: 'card', icon: CreditCard, label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Rupay and more' },
  { key: 'wallet', icon: Wallet, label: 'Wallet', desc: 'Pay using your wallet balance' },
];

const nextSteps = [
  { icon: Mail, title: 'Order Confirmed', desc: 'You will receive order confirmation' },
  { icon: Package, title: 'Vendor Notified', desc: 'Vendor will start preparing your order' },
  { icon: Truck, title: 'Out for Delivery', desc: "You will be notified once it's on the way" },
  { icon: CheckCircle2, title: 'Order Delivered', desc: 'Pay on delivery and enjoy!' },
];

function DetailRow({ icon: Icon, label, value, onEdit }) {
  return (
    <div className="flex items-start justify-between gap-3 py-3">
      <div className="flex items-start gap-3">
        <Icon size={15} className="text-brand-green mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-sm font-semibold text-gray-900 whitespace-pre-line">{value}</p>
        </div>
      </div>
      {onEdit && (
        <button type="button" onClick={onEdit} className="text-xs font-semibold text-brand-green hover:underline flex-shrink-0">
          Edit
        </button>
      )}
    </div>
  );
}

export default function Step5ConfirmOrder({ order, onPrevious, onEditStep1, onEditStep2, onPlaceOrder }) {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const quantity = Number(order.quantity) || 1;
  const vendor = vendors.find((v) => v.id === order.selectedVendorId) || vendors.find((v) => v.recommended);
  const price = vendor.pricePerQuintal * quantity;
  const grandTotal = price + vendor.deliveryCharge;
  const woodTypeLabel = order.woodTypes.map((w) => w.label).join(', ');
  const addressLabel = order.address
    ? `${order.address.line1}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`
    : '-';
  const contactLabel = order.contact ? `${order.contact.name} • ${order.contact.mobile}` : '-';

  return (
    <div>
      {/* Selected vendor recap */}
      <div className="bg-white border border-[#F1E7D4] rounded-2xl p-5 mb-6">
        <div className="flex items-start gap-2 mb-4 bg-[#EEF3E4] border border-[#DCE7C8] rounded-lg px-4 py-2.5 text-sm font-semibold text-brand-green-dark">
          You've selected the best offer!
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <VendorAvatar type={vendor.iconType} size={48} />
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-gray-900">{vendor.name}</p>
                <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-1.5 py-0.5 rounded">
                  Verified Vendor
                </span>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Star size={11} className="text-brand-orange fill-brand-orange" />
                {vendor.rating} ({vendor.reviews}) &middot; {vendor.distance}, {vendor.area}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <p className="text-xs text-gray-400">Price / Quintal</p>
              <p className="font-bold text-gray-900">₹{vendor.pricePerQuintal}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Delivery Charges</p>
              <p className="font-bold text-gray-900">₹{vendor.deliveryCharge}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Amount</p>
              <p className="font-extrabold text-gray-900">₹{grandTotal.toLocaleString('en-IN')}</p>
              {vendor.save > 0 && <p className="text-[11px] text-brand-green">You Save ₹{vendor.save}</p>}
            </div>
          </div>
          {vendor.recommended && (
            <div className="bg-brand-green/10 border border-brand-green/30 rounded-lg px-4 py-2 text-xs text-brand-green-dark flex-shrink-0">
              <p className="font-bold mb-1">Best Overall Offer</p>
              <p className="flex items-center gap-1">
                <CheckCircle2 size={12} /> Lowest delivery time
              </p>
              <p className="flex items-center gap-1">
                <CheckCircle2 size={12} /> Great price &amp; service
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left column */}
        <div className="flex-1 min-w-0 space-y-6">
          <div className="bg-white border border-[#F1E7D4] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-gray-900">Order Summary</h3>
            </div>
            <div className="divide-y divide-[#F1E7D4]">
              <DetailRow icon={Package} label="Wood Types" value={woodTypeLabel} onEdit={onEditStep1} />
              <DetailRow icon={Package} label="Quantity" value={`${order.quantity} ${order.unit}`} />
              <DetailRow icon={Package} label="Purpose" value={order.purpose} />
              <DetailRow icon={Calendar} label="Delivery Preference" value={order.deliveryPreference} />
              <DetailRow icon={MapPin} label="Delivery Address" value={addressLabel} onEdit={onEditStep2} />
              <DetailRow icon={Phone} label="Delivery Contact" value={contactLabel} onEdit={onEditStep2} />
            </div>
          </div>

          <div className="bg-white border border-[#F1E7D4] rounded-2xl p-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Price Details</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between text-gray-600">
                <span>
                  Price (₹{vendor.pricePerQuintal} x {quantity} {order.unit})
                </span>
                <span className="font-medium text-gray-900">₹{price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Delivery Charges</span>
                <span className="font-medium text-gray-900">₹{vendor.deliveryCharge}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Loading Charges</span>
                <span className="font-medium text-gray-900">₹0</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Platform Fee</span>
                <span className="font-medium text-gray-900">₹0</span>
              </div>
              <div className="border-t border-[#F1E7D4] pt-2.5 flex items-center justify-between">
                <span className="font-bold text-gray-900">Grand Total</span>
                <span className="font-extrabold text-brand-green text-lg">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              {vendor.save > 0 && (
                <div className="flex items-center justify-between text-brand-green text-xs font-semibold">
                  <span>You Save</span>
                  <span>₹{vendor.save}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-[#F1E7D4] rounded-2xl p-6">
            <h3 className="text-base font-bold text-gray-900 mb-1">Payment Method</h3>
            <p className="text-xs text-gray-500 mb-4">Choose a payment option</p>
            <div className="space-y-3">
              {paymentOptions.map((opt) => {
                const Icon = opt.icon;
                const active = paymentMethod === opt.key;
                return (
                  <button
                    type="button"
                    key={opt.key}
                    onClick={() => setPaymentMethod(opt.key)}
                    className={`w-full flex items-center gap-3 border rounded-xl px-4 py-3.5 text-left transition-colors ${
                      active ? 'border-brand-green bg-brand-green/5' : 'border-[#EDE2CD]'
                    }`}
                  >
                    <span
                      className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        active ? 'border-brand-green' : 'border-gray-300'
                      }`}
                    >
                      {active && <span className="w-2 h-2 rounded-full bg-brand-green" />}
                    </span>
                    <Icon size={18} className="text-brand-brown flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                      <p className="text-xs text-gray-500">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-4">
              <Lock size={12} />
              Your payment is safe and secure. We do not store your card or UPI details.
            </p>
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
              onClick={onPlaceOrder}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3.5 rounded-xl transition-colors duration-200 shadow-md"
            >
              Place Order
            </button>
          </div>
          <p className="text-center text-xs text-gray-400">
            By placing this order, you agree to our{' '}
            <a href="#terms" className="text-brand-green font-semibold hover:underline">
              Terms &amp; Conditions
            </a>
          </p>
        </div>

        {/* Right column */}
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-5">
          <div className="bg-white border border-[#F1E7D4] rounded-2xl p-5">
            <h3 className="text-sm font-extrabold text-gray-900 mb-3">Order Summary (Quick View)</h3>
            <div className="divide-y divide-[#F1E7D4] text-sm">
              <div className="py-2.5">
                <p className="text-xs text-gray-500">Wood Types</p>
                <p className="font-semibold text-gray-900">{woodTypeLabel}</p>
              </div>
              <div className="py-2.5">
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="font-semibold text-gray-900">
                  {order.quantity} {order.unit}
                </p>
              </div>
              <div className="py-2.5">
                <p className="text-xs text-gray-500">Delivery Date &amp; Time</p>
                <p className="font-semibold text-gray-900">{order.deliveryPreference}</p>
              </div>
              <div className="py-2.5">
                <p className="text-xs text-gray-500">Delivery Address</p>
                <p className="font-semibold text-gray-900 whitespace-pre-line">{addressLabel}</p>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-gray-500">Price</span>
                <span className="font-semibold text-gray-900">₹{price.toLocaleString('en-IN')}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-gray-500">Delivery Charges</span>
                <span className="font-semibold text-gray-900">₹{vendor.deliveryCharge}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="font-extrabold text-brand-green">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#EAF1FB] border border-[#CFE0F5] rounded-2xl p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">What happens next?</h3>
            <div className="space-y-3">
              {nextSteps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                        <Icon size={12} /> {s.title}
                      </p>
                      <p className="text-xs text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#FBF1DC] border border-[#F0DFB4] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldAlert size={16} className="text-brand-orange" />
              <h3 className="text-sm font-bold text-gray-900">Cancellation Policy</h3>
            </div>
            <p className="text-xs text-gray-600 mb-1.5">You can cancel your order before the vendor starts processing.</p>
            <a href="#cancellation-policy" className="text-xs font-semibold text-brand-green hover:underline">
              View Cancellation Policy
            </a>
          </div>

          <NeedHelpCard />
        </aside>
      </div>
    </div>
  );
}
