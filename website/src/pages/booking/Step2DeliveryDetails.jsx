import { useEffect, useState } from 'react'
import { Home, MapPin, Plus, Minus, LocateFixed, ChevronRight, ArrowLeft, ArrowRight, Lock, ShieldCheck } from 'lucide-react'
import OrderSummaryCard from '../../components/booking/OrderSummaryCard'
import WhyBookWithUs from '../../components/booking/WhyBookWithUs'
import NeedHelpCard from '../../components/booking/NeedHelpCard'
import { useAuth } from '../../context/AuthContext'
import { fetchAddresses } from '../../services/orderService'

const states = ['Telangana', 'Andhra Pradesh', 'Karnataka', 'Maharashtra', 'Tamil Nadu']

const inputClass =
  'w-full bg-[#FBF8F2] border border-[#EDE2CD] rounded-lg px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors'

function Label({ children }) {
  return <label className="block text-xs font-bold text-gray-800 mb-1.5">{children}</label>
}

export default function Step2DeliveryDetails({
  order,
  updateOrder,
  onNext,
  onPrevious,
  onEditStep1,
  busy,
  defaultContact,
}) {
  const { user } = useAuth()
  const [mode, setMode] = useState('new')
  const [savedAddresses, setSavedAddresses] = useState([])
  const [selectedSavedId, setSelectedSavedId] = useState(null)
  const [newAddress, setNewAddress] = useState({
    house: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [contact, setContact] = useState({
    name: defaultContact?.name || '',
    mobile: defaultContact?.mobile || '',
    altMobile: '',
  })
  const [saveForFuture, setSaveForFuture] = useState(true)

  useEffect(() => {
    if (!user) return
    fetchAddresses(user.uid)
      .then((list) => {
        setSavedAddresses(list)
        if (list.length > 0) {
          setMode('saved')
          const def = list.find((a) => a.isDefault) || list[0]
          setSelectedSavedId(def.id)
        }
      })
      .catch(() => {})
  }, [user])

  const setField = (field, value) => setNewAddress((prev) => ({ ...prev, [field]: value }))
  const selectedSaved = savedAddresses.find((a) => a.id === selectedSavedId)

  const canProceed =
    Boolean(contact.name && contact.mobile) &&
    (mode === 'saved'
      ? Boolean(selectedSaved)
      : Boolean(newAddress.house && newAddress.street && newAddress.city && newAddress.state && newAddress.pincode))

  const handleNext = () => {
    const address =
      mode === 'saved' && selectedSaved
        ? {
            label: selectedSaved.label || 'Saved',
            line1: selectedSaved.line1,
            city: selectedSaved.city,
            state: selectedSaved.state,
            pincode: selectedSaved.pincode,
            landmark: selectedSaved.landmark || '',
          }
        : {
            label: 'Home',
            line1: `${newAddress.house}, ${newAddress.street}`,
            city: newAddress.city,
            state: newAddress.state,
            pincode: newAddress.pincode,
            landmark: newAddress.landmark,
          }

    onNext({
      address,
      contact,
      saveForFuture: mode === 'new' && saveForFuture,
      landmark: address.landmark,
    })
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 min-w-0 bg-white border border-[#F1E7D4] rounded-2xl p-6 sm:p-8">
        <section className="mb-8">
          <h3 className="text-base font-bold text-gray-900 mb-1">1. Delivery Address</h3>
          <p className="text-xs text-gray-500 mb-4">Where should we deliver your lakdi?</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              onClick={() => setMode('saved')}
              disabled={savedAddresses.length === 0}
              className={`flex items-center gap-3 border rounded-xl p-4 text-left transition-colors disabled:opacity-50 ${
                mode === 'saved' ? 'border-brand-green bg-brand-green/5' : 'border-[#EDE2CD] bg-[#FBF8F2]'
              }`}
            >
              <Home size={18} className={mode === 'saved' ? 'text-brand-green' : 'text-gray-400'} />
              <div>
                <p className="text-sm font-bold text-gray-900">Use Saved Address</p>
                <p className="text-xs text-gray-500">
                  {savedAddresses.length ? `${savedAddresses.length} saved` : 'No saved addresses yet'}
                </p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMode('new')}
              className={`flex items-center gap-3 border rounded-xl p-4 text-left transition-colors ${
                mode === 'new' ? 'border-brand-green bg-brand-green/5' : 'border-[#EDE2CD] bg-[#FBF8F2]'
              }`}
            >
              <MapPin size={18} className={mode === 'new' ? 'text-brand-green' : 'text-gray-400'} />
              <div>
                <p className="text-sm font-bold text-gray-900">Add New Address</p>
                <p className="text-xs text-gray-500">Add a new delivery address</p>
              </div>
            </button>
          </div>

          {savedAddresses.map((addr) => (
            <button
              key={addr.id}
              type="button"
              onClick={() => {
                setMode('saved')
                setSelectedSavedId(addr.id)
              }}
              className={`w-full flex items-start gap-3 border rounded-xl p-4 text-left transition-colors mb-3 ${
                mode === 'saved' && selectedSavedId === addr.id
                  ? 'border-brand-green bg-brand-green/5'
                  : 'border-[#EDE2CD]'
              }`}
            >
              <span
                className={`w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  mode === 'saved' && selectedSavedId === addr.id ? 'border-brand-green' : 'border-gray-300'
                }`}
              >
                {mode === 'saved' && selectedSavedId === addr.id && (
                  <span className="w-2 h-2 rounded-full bg-brand-green" />
                )}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-900">{addr.label || 'Address'}</p>
                  {addr.isDefault && (
                    <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  {addr.line1}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
              </div>
              <ChevronRight size={16} className="text-gray-400 mt-1 flex-shrink-0" />
            </button>
          ))}

          <div onFocus={() => setMode('new')} onClick={() => setMode('new')}>
            <p className="text-sm font-bold text-gray-900 mb-3 mt-4">Add New Address</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>House / Flat / Building No.</Label>
                <input
                  value={newAddress.house}
                  onChange={(e) => setField('house', e.target.value)}
                  placeholder="e.g. 12-5-678"
                  className={inputClass}
                />
              </div>
              <div>
                <Label>Street / Area</Label>
                <input
                  value={newAddress.street}
                  onChange={(e) => setField('street', e.target.value)}
                  placeholder="e.g. Road No. 3, Banjara Hills"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mb-4">
              <Label>Landmark (Optional)</Label>
              <input
                value={newAddress.landmark}
                onChange={(e) => setField('landmark', e.target.value)}
                placeholder="e.g. Near Shiva Temple"
                className={inputClass}
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>City</Label>
                <input
                  value={newAddress.city}
                  onChange={(e) => setField('city', e.target.value)}
                  placeholder="e.g. Hyderabad"
                  className={inputClass}
                />
              </div>
              <div>
                <Label>State</Label>
                <select
                  value={newAddress.state}
                  onChange={(e) => setField('state', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select state</option>
                  {states.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>PIN Code</Label>
                <input
                  value={newAddress.pincode}
                  onChange={(e) => setField('pincode', e.target.value)}
                  placeholder="e.g. 500034"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-base font-bold text-gray-900 mb-1">2. Select Location on Map</h3>
          <p className="text-xs text-gray-500 mb-3">Drag the pin to your exact delivery location</p>

          <div className="relative w-full h-56 rounded-xl overflow-hidden border border-[#EDE2CD] bg-[#E9ECE3]">
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  'linear-gradient(#D6DBC9 1px, transparent 1px), linear-gradient(90deg, #D6DBC9 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <MapPin
              size={36}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[85%] text-brand-green fill-brand-green drop-shadow"
              strokeWidth={1.5}
            />
            <button
              type="button"
              className="absolute right-3 top-3 flex items-center gap-1.5 bg-white rounded-lg shadow px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <LocateFixed size={13} />
              Use Current Location
            </button>
            <div className="absolute right-3 bottom-3 flex flex-col bg-white rounded-lg shadow overflow-hidden">
              <button type="button" className="w-8 h-8 flex items-center justify-center text-gray-600 border-b border-gray-100 hover:bg-gray-50">
                <Plus size={14} />
              </button>
              <button type="button" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                <Minus size={14} />
              </button>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-base font-bold text-gray-900 mb-1">3. Delivery Contact</h3>
          <p className="text-xs text-gray-500 mb-4">Who should we contact for delivery-related updates?</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div>
              <Label>Contact Person Name</Label>
              <input
                value={contact.name}
                onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <Label>Mobile Number</Label>
              <input
                value={contact.mobile}
                onChange={(e) => setContact((prev) => ({ ...prev, mobile: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <Label>Alternative Number (Optional)</Label>
              <input
                value={contact.altMobile}
                onChange={(e) => setContact((prev) => ({ ...prev, altMobile: e.target.value }))}
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </div>
          </div>
          {mode === 'new' && (
            <label className="flex items-center gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={saveForFuture}
                onChange={(e) => setSaveForFuture(e.target.checked)}
                className="w-4 h-4 accent-brand-green rounded"
              />
              Save this address for future orders
            </label>
          )}
        </section>

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
            disabled={!canProceed || busy}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors duration-200 shadow-md"
          >
            {busy ? 'Finding vendors…' : 'Next'}
            <ArrowRight size={16} />
          </button>
        </div>
        <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-3">
          <Lock size={12} />
          Your address is secure and will only be shared with the selected vendor.
        </p>
      </div>

      <aside className="w-full lg:w-80 flex-shrink-0 space-y-5">
        <OrderSummaryCard order={order} editable onEdit={onEditStep1} variant="compact" />
        <div className="flex items-start gap-2 bg-[#EEF3E4] border border-[#DCE7C8] rounded-xl px-4 py-3.5">
          <ShieldCheck size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-700">
            We'll find the best vendors near your location and send you the best quotes.
          </p>
        </div>
        <WhyBookWithUs />
        <NeedHelpCard />
      </aside>
    </div>
  )
}
