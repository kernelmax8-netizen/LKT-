import { Headphones } from 'lucide-react';

export default function NeedHelpCard() {
  return (
    <div className="bg-white border border-[#F1E7D4] rounded-2xl p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-full border-2 border-brand-green flex items-center justify-center flex-shrink-0">
        <Headphones size={18} className="text-brand-green" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-900">Need Help?</h3>
        <p className="text-xs text-gray-500 mb-1">Our support team is here for you.</p>
        <p className="text-sm font-bold text-brand-green">+91 91234 56789</p>
      </div>
    </div>
  );
}
