import { useState } from 'react';
import {
  Search,
  Plus,
  Minus,
  LocateFixed,
  MapPin,
  Upload,
  Eye,
  EyeOff,
  Check,
  TreeDeciduous,
  TreePine,
  Leaf,
  Sprout,
  Trees,
} from 'lucide-react';

const shopTypes = ['Wholesaler', 'Retailer', 'Both Wholesale & Retail'];
const states = ['Telangana', 'Andhra Pradesh', 'Karnataka', 'Maharashtra', 'Tamil Nadu'];
const capacities = ['Below 10 Quintals', '10 - 50 Quintals', '50 - 100 Quintals', 'Above 100 Quintals'];
const experiences = ['Less than 1 year', '1 - 3 years', '3 - 5 years', '5+ years'];

const woodTypes = [
  { key: 'imli', label: 'Imli Lakdi', icon: TreeDeciduous },
  { key: 'neem', label: 'Neem Lakdi', icon: Trees },
  { key: 'nilgiri', label: 'Nilgiri Lakdi', icon: Leaf },
  { key: 'babul', label: 'Babul Lakdi', icon: Sprout },
  { key: 'geethi', label: 'Geethi Lakdi', icon: TreePine },
  { key: 'paratha', label: 'Paratha Lakdi', icon: TreeDeciduous },
];

const inputClass =
  'w-full bg-[#FBF8F2] border border-[#EDE2CD] rounded-lg px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors';

function SectionHeader({ number, title, required }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-7 h-7 rounded-full bg-brand-green text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
        {number}
      </span>
      <h3 className="text-base font-bold text-gray-900">
        {title} {required && <span className="text-red-500">*</span>}
      </h3>
    </div>
  );
}

function Label({ children, required, optional }) {
  return (
    <label className="block text-xs font-bold text-gray-800 mb-1.5">
      {children}
      {required && <span className="text-red-500"> *</span>}
      {optional && <span className="text-gray-400 font-normal"> (Optional)</span>}
    </label>
  );
}

function UploadBox({ label, required, optional, cta, full }) {
  return (
    <div className={full ? 'sm:col-span-3' : ''}>
      <Label required={required} optional={optional}>
        {label}
      </Label>
      <label className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-[#EDE2CD] rounded-xl py-6 text-gray-400 cursor-pointer hover:border-brand-green/40 transition-colors bg-[#FBF8F2]">
        <Upload size={18} />
        <span className="text-xs font-medium">{cta}</span>
        <input type="file" className="hidden" accept="image/*,application/pdf" />
      </label>
    </div>
  );
}

export default function VendorForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedWoods, setSelectedWoods] = useState([]);
  const [agreed, setAgreed] = useState(false);

  const toggleWood = (key) => {
    setSelectedWoods((prev) => (prev.includes(key) ? prev.filter((w) => w !== key) : [...prev, key]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 min-w-0">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Join as a Vendor</h2>
      <p className="text-sm text-gray-500 mb-6">Fill in the details below to get started</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 1. Basic Information */}
        <div className="bg-white border border-[#F1E7D4] rounded-2xl p-6">
          <SectionHeader number={1} title="Basic Information" />
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <Label required>Full Name</Label>
              <input type="text" placeholder="Enter your full name" className={inputClass} />
            </div>
            <div>
              <Label required>Mobile Number</Label>
              <div className="flex gap-2">
                <select className={`${inputClass} w-20 flex-shrink-0`} defaultValue="+91">
                  <option>+91</option>
                </select>
                <input type="tel" placeholder="Enter mobile number" className={inputClass} />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <Label required>Email Address</Label>
              <input type="email" placeholder="Enter your email address" className={inputClass} />
            </div>
            <div>
              <Label required>Password</Label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
          <div className="sm:w-1/2 sm:pr-2">
            <Label required>Confirm Password</Label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm your password"
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* 2. Business Information */}
        <div className="bg-white border border-[#F1E7D4] rounded-2xl p-6">
          <SectionHeader number={2} title="Business Information" />
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <Label required>Business / Shop Name</Label>
              <input type="text" placeholder="Enter your shop or business name" className={inputClass} />
            </div>
            <div>
              <Label required>Shop Type</Label>
              <select className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select shop type
                </option>
                {shopTypes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <Label required>Business Address</Label>
            <textarea rows={2} placeholder="Enter complete business address" className={inputClass} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label required>City</Label>
              <input type="text" placeholder="Enter city" className={inputClass} />
            </div>
            <div>
              <Label required>State</Label>
              <select className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select state
                </option>
                {states.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <Label required>Pincode</Label>
              <input type="text" placeholder="Enter pincode" className={inputClass} />
            </div>
          </div>
        </div>

        {/* 3. Select Location on Map */}
        <div className="bg-white border border-[#F1E7D4] rounded-2xl p-6">
          <SectionHeader number={3} title="Select Location on Map" required />
          <p className="text-xs text-gray-500 -mt-3 mb-3 ml-10">Search your area and pin your exact location.</p>

          <div className="relative mb-3">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search your location" className={`${inputClass} pl-10`} />
          </div>

          <div className="relative w-full h-48 rounded-xl overflow-hidden border border-[#EDE2CD] bg-[#E9ECE3]">
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  'linear-gradient(#D6DBC9 1px, transparent 1px), linear-gradient(90deg, #D6DBC9 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <MapPin
              size={34}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[85%] text-brand-green fill-brand-green drop-shadow"
              strokeWidth={1.5}
            />
            <div className="absolute right-3 top-3 flex flex-col bg-white rounded-lg shadow overflow-hidden">
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center text-gray-600 border-b border-gray-100 hover:bg-gray-50"
              >
                <Plus size={14} />
              </button>
              <button type="button" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                <Minus size={14} />
              </button>
            </div>
            <button
              type="button"
              className="absolute right-3 bottom-3 w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow text-gray-600 hover:bg-gray-50"
            >
              <LocateFixed size={14} />
            </button>
          </div>

          <div className="mt-3 flex items-start gap-2 bg-[#EEF3E4] border border-[#DCE7C8] rounded-lg px-4 py-3">
            <MapPin size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-brand-green-dark">Selected Location</p>
              <p className="text-xs text-gray-500">Your selected location will appear here</p>
            </div>
          </div>
        </div>

        {/* 4. Wood Types You Deal In */}
        <div className="bg-white border border-[#F1E7D4] rounded-2xl p-6">
          <SectionHeader number={4} title="Wood Types You Deal In" required />
          <p className="text-xs text-gray-500 -mt-3 mb-4 ml-10">Select all that apply</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {woodTypes.map((w) => {
              const Icon = w.icon;
              const checked = selectedWoods.includes(w.key);
              return (
                <button
                  type="button"
                  key={w.key}
                  onClick={() => toggleWood(w.key)}
                  className={`relative flex flex-col items-center gap-2 border rounded-xl p-4 text-center transition-colors ${
                    checked ? 'border-brand-green bg-brand-green/5' : 'border-[#EDE2CD] bg-[#FBF8F2] hover:border-brand-green/40'
                  }`}
                >
                  <span
                    className={`absolute top-2 right-2 w-4 h-4 rounded border flex items-center justify-center ${
                      checked ? 'bg-brand-green border-brand-green' : 'border-gray-300 bg-white'
                    }`}
                  >
                    {checked && <Check size={11} className="text-white" strokeWidth={3} />}
                  </span>
                  <Icon size={28} className="text-brand-brown" strokeWidth={1.5} />
                  <span className="text-xs font-semibold text-gray-800">{w.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Business Details */}
        <div className="bg-white border border-[#F1E7D4] rounded-2xl p-6">
          <SectionHeader number={5} title="Business Details" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label required>Daily Stock Capacity (in Quintals)</Label>
              <select className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select capacity
                </option>
                {capacities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <Label required>Experience in this business</Label>
              <select className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select experience
                </option>
                {experiences.map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 6. Documents */}
        <div className="bg-white border border-[#F1E7D4] rounded-2xl p-6">
          <SectionHeader number={6} title="Documents" />
          <p className="text-xs text-gray-500 -mt-3 mb-4 ml-10">Please upload clear photos of the documents</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <UploadBox label="Shop Photo" required cta="Upload Photo" />
            <UploadBox label="GST Certificate" optional cta="Upload File" />
            <UploadBox label="Address Proof" required cta="Upload File" />
          </div>
          <UploadBox label="Identity Proof" required cta="Upload File" full />
        </div>

        {/* Terms + Submit */}
        <div className="flex items-start gap-2 px-1">
          <input
            type="checkbox"
            id="agree-terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-brand-green rounded"
          />
          <label htmlFor="agree-terms" className="text-xs text-gray-600">
            I agree to the{' '}
            <a href="#terms" className="text-brand-green font-semibold hover:underline">
              Terms &amp; Conditions
            </a>{' '}
            and{' '}
            <a href="#privacy" className="text-brand-green font-semibold hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-4 rounded-xl transition-colors duration-200 shadow-md"
        >
          Submit &amp; Get Verified
        </button>
        <p className="text-center text-xs text-gray-400 -mt-2">
          Our team will verify your details and get back to you soon.
        </p>
      </form>
    </div>
  );
}
