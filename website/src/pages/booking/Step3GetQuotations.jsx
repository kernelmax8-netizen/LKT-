import { useState } from 'react'
import { Store, Search, CheckCircle2, Loader2, Bell, Clock, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react'
import { quoteToVendorView } from '../../services/orderService'
import { totalAmount } from '../../services/catalogService'
import VendorAvatar from '../../components/booking/VendorAvatar'
import OrderSummaryCard from '../../components/booking/OrderSummaryCard'
import WhyBookWithUs from '../../components/booking/WhyBookWithUs'
import NeedHelpCard from '../../components/booking/NeedHelpCard'

const filters = ['Recommended', 'Lowest Price', 'Fastest Delivery', 'Nearest', 'Highest Rating']

function sortVendors(list, filter) {
  const arr = [...list]
  switch (filter) {
    case 'Lowest Price':
      return arr.sort((a, b) => a.pricePerQuintal - b.pricePerQuintal)
    case 'Nearest':
      return arr.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    case 'Highest Rating':
      return arr.sort((a, b) => b.rating - a.rating)
    case 'Fastest Delivery':
      return arr.sort((a, b) => a.deliveryTime.includes('Day After') - b.deliveryTime.includes('Day After'))
    default:
      return arr.sort((a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0))
  }
}

export default function Step3GetQuotations({
  order,
  onNext,
  onPrevious,
  onEditStep1,
  quotesReceived,
  setQuotesReceived,
  quotes = [],
  onAcceptQuote,
  busy,
}) {
  const [filter, setFilter] = useState('Recommended')
  const quantity = Number(order.quantity) || 1
  const vendors = quotes.map(quoteToVendorView)
  const sorted = sortVendors(vendors, filter)

  if (!quotesReceived) {
    return (
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 min-w-0 bg-white border border-[#F1E7D4] rounded-2xl p-6 sm:p-10">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-14 h-14 rounded-full border border-[#EDE2CD] bg-white flex items-center justify-center">
              <Store size={22} className="text-brand-brown" />
            </div>
            <div className="relative w-28 h-28 rounded-full bg-[#F0ECDD] flex items-center justify-center">
              <img src="/wood-charcoal-nobg.png" alt="" className="w-20 object-contain" />
              <Search size={26} className="absolute bottom-1 right-1 text-brand-green bg-white rounded-full p-1 shadow" />
            </div>
            <div className="w-14 h-14 rounded-full border border-[#EDE2CD] bg-white flex items-center justify-center">
              <Store size={22} className="text-brand-brown" />
            </div>
          </div>

          <h3 className="text-xl font-extrabold text-gray-900 text-center mb-1">Finding the best vendors for you...</h3>
          <p className="text-sm text-gray-500 text-center max-w-md mx-auto mb-8">
            We've sent your request to nearby verified vendors. They will review and send their best quotations shortly.
          </p>

          <div className="border border-[#F1E7D4] rounded-xl divide-y divide-[#F1E7D4] mb-8">
            <div className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-brand-green" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Finding nearby vendors</p>
                  <p className="text-xs text-gray-500">Searching vendors in your area</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-brand-green">Completed</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                <Loader2 size={18} className="text-brand-orange animate-spin" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Matching inventory &amp; availability</p>
                  <p className="text-xs text-gray-500">Checking stock, quantity &amp; delivery</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-brand-orange">In Progress</span>
            </div>
          </div>

          {vendors.length > 0 && (
            <>
              <h4 className="text-sm font-bold text-gray-900 mb-3">Vendors we've contacted</h4>
              <div className="space-y-2 mb-6">
                {vendors.map((v) => (
                  <div key={v.id} className="flex items-center justify-between border border-[#F1E7D4] rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <VendorAvatar type={v.iconType} size={36} />
                      <div>
                        <p className="text-sm font-bold text-gray-900">{v.name}</p>
                        <p className="text-xs text-gray-500">
                          {v.distance} &middot; {v.area}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Loader2 size={13} className="animate-spin" />
                      Waiting for response
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="border border-[#F1E7D4] rounded-xl p-6 text-center">
            <div className="w-9 h-9 rounded-full border-2 border-brand-green text-brand-green flex items-center justify-center mx-auto mb-2">
              <Clock size={16} />
            </div>
            <p className="text-xs text-gray-500">Waiting for quotations</p>
            <p className="text-xl font-extrabold text-brand-green mb-1">Live matching…</p>
            <p className="text-xs text-gray-500 mb-4">Quotations appear here as soon as vendors respond.</p>
            {vendors.length > 0 && (
              <button
                type="button"
                onClick={() => setQuotesReceived(true)}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 mb-3"
              >
                <Bell size={15} />
                View quotations ({vendors.length})
              </button>
            )}
            <button type="button" onClick={onPrevious} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mx-auto">
              <ArrowLeft size={13} />
              Back to Previous Step
            </button>
          </div>
        </div>

        <aside className="w-full lg:w-80 flex-shrink-0 space-y-5">
          <OrderSummaryCard order={order} editable onEdit={onEditStep1} showDeliverTo />
          <WhyBookWithUs />
          <NeedHelpCard />
        </aside>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 min-w-0 bg-white border border-[#F1E7D4] rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-3 bg-[#EEF3E4] border border-[#DCE7C8] rounded-lg px-4 py-3 mb-6">
          <CheckCircle2 size={18} className="text-brand-green mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-gray-900">
              Great! We received quotations from {vendors.length} verified vendors.
            </p>
            <p className="text-xs text-gray-500">Compare and choose the best offer for your requirements.</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="text-base font-bold text-gray-900">Quotations Received ({vendors.length})</h3>
        </div>

        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
                filter === f
                  ? 'bg-brand-green/10 border-brand-green text-brand-green'
                  : 'border-[#EDE2CD] text-gray-500 hover:border-brand-green/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-6">
          {sorted.map((v) => {
            const total = v.total ?? totalAmount(v, quantity)
            const accepted = order.selectedVendorId === v.id
            return (
              <div
                key={v.quoteId || v.id}
                className={`border rounded-xl overflow-hidden ${
                  v.recommended ? 'border-brand-green' : 'border-[#F1E7D4]'
                }`}
              >
                {v.recommended && (
                  <div className="bg-brand-green text-white text-[11px] font-bold px-4 py-1">Recommended</div>
                )}
                <div className="p-4">
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
                        <p className="text-xs text-gray-500">
                          {v.rating} ★ ({v.reviews}) &middot; {v.distance}
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
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F1E7D4]">
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
                      <span>Stock: {v.stock}</span>
                      <span>Delivery: {v.deliveryTime}</span>
                      <span>Vehicle: {v.vehicleType}</span>
                      <span>Payment: {v.payment}</span>
                    </div>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => onAcceptQuote(v.id, v.quoteId)}
                      className={`text-sm font-bold px-5 py-2 rounded-lg transition-colors duration-200 flex-shrink-0 ${
                        accepted
                          ? 'bg-brand-green-dark text-white'
                          : 'bg-brand-green hover:bg-brand-green-dark text-white'
                      }`}
                    >
                      {accepted ? 'Quote Accepted ✓' : 'Accept Quote'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex items-start gap-2 bg-[#FBF1DC] border border-[#F0DFB4] rounded-lg px-4 py-3 mb-6 text-xs text-gray-600">
          <ShieldCheck size={15} className="text-brand-orange mt-0.5 flex-shrink-0" />
          All prices are final quotes from verified vendors. No hidden charges.
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
            onClick={onNext}
            disabled={!order.selectedVendorId || !order.selectedQuoteId}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors duration-200 shadow-md"
          >
            Continue to Choose Vendor
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <aside className="w-full lg:w-80 flex-shrink-0 space-y-5">
        <OrderSummaryCard order={order} editable onEdit={onEditStep1} showDeliverTo />
        <WhyBookWithUs />
        <NeedHelpCard />
      </aside>
    </div>
  )
}
