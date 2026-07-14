import { FileText } from 'lucide-react';

function SummaryRow({ label, value, badge }) {
  return (
    <div className="py-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-gray-900">{label}</p>
        {badge && (
          <span className="text-[11px] font-semibold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full whitespace-nowrap">
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-0.5 whitespace-pre-line">{value || '-'}</p>
    </div>
  );
}

function Header({ editable, onEdit }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <FileText size={17} className="text-brand-brown" />
        <h3 className="text-sm font-extrabold text-gray-900">Your Order Summary</h3>
      </div>
      {editable && (
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-semibold text-brand-green border border-[#E3DCC8] rounded-lg px-3 py-1 hover:bg-brand-green/5 transition-colors"
        >
          Edit
        </button>
      )}
    </div>
  );
}

export default function OrderSummaryCard({ order, editable = false, onEdit, showDeliverTo = false, variant = 'detailed' }) {
  const woodTypeLabel = order.woodTypes?.length ? order.woodTypes.map((w) => w.label).join(', ') : null;
  const quantityLabel = order.quantity ? `${order.quantity} ${order.unit}` : null;
  const deliverToLabel = order.address
    ? `${order.address.line1}\n${order.address.city}, ${order.address.state} - ${order.address.pincode}`
    : null;

  const isEmpty = !woodTypeLabel && !quantityLabel && !order.purpose && !order.deliveryPreference;

  if (isEmpty) {
    return (
      <div className="bg-white border border-[#F1E7D4] rounded-2xl p-5">
        <Header editable={editable} onEdit={onEdit} />
        <p className="text-xs text-gray-500 mt-2">This summary will update as you fill the details.</p>
        <div className="relative flex justify-center items-center h-36 my-4">
          <div className="w-32 h-32 rounded-full bg-[#F0ECDD]" />
          <img src="/wood-charcoal-nobg.png" alt="" className="absolute w-44 max-w-none object-contain opacity-40" />
        </div>
        <div className="border-t border-[#F1E7D4] pt-3">
          <SummaryRow label="Wood Type" value={null} />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-white border border-[#F1E7D4] rounded-2xl p-5">
        <Header editable={editable} onEdit={onEdit} />
        <div className="divide-y divide-[#F1E7D4] mt-2">
          <div className="py-3">
            <p className="text-sm font-bold text-gray-900">{woodTypeLabel || '-'}</p>
            <p className="text-sm text-gray-500 mt-0.5">{quantityLabel || '-'}</p>
          </div>
          <SummaryRow label="Purpose" value={order.purpose} />
          <SummaryRow label="Delivery Preference" value={order.deliveryPreference} />
          {order.notes && <SummaryRow label="Additional Notes" value={order.notes} />}
        </div>
        <div className="border-t border-[#F1E7D4] pt-3 mt-1 space-y-2.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Total Items</span>
            <span className="font-semibold text-gray-900">{order.woodTypes?.length || 0} types</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Quantity</span>
            <span className="font-semibold text-gray-900">{quantityLabel || '-'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#F1E7D4] rounded-2xl p-5">
      <Header editable={editable} onEdit={onEdit} />
      <div className="divide-y divide-[#F1E7D4] mt-2">
        <SummaryRow
          label="Wood Types"
          value={woodTypeLabel}
          badge={order.woodTypes?.length ? `${order.woodTypes.length} types` : null}
        />
        <SummaryRow label="Quantity" value={quantityLabel} />
        <SummaryRow label="Purpose" value={order.purpose} />
        <SummaryRow label="Delivery Preference" value={order.deliveryPreference} />
        {showDeliverTo && <SummaryRow label="Deliver to" value={deliverToLabel} />}
        {order.notes && <SummaryRow label="Additional Notes" value={order.notes} />}
      </div>
    </div>
  );
}
