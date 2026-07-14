import { Trees, TreeDeciduous, Leaf, Sprout } from 'lucide-react';

const iconMap = {
  tree: { Icon: Trees, className: 'bg-brand-green/10 text-brand-green' },
  log: { Icon: TreeDeciduous, className: 'bg-brand-brown/10 text-brand-brown' },
  leaf: { Icon: Leaf, className: 'bg-brand-green/10 text-brand-green' },
  sprout: { Icon: Sprout, className: 'bg-brand-orange/10 text-brand-orange' },
};

export default function VendorAvatar({ type = 'tree', size = 44 }) {
  const { Icon, className } = iconMap[type] || iconMap.tree;
  return (
    <div
      className={`rounded-full flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Icon size={size * 0.5} strokeWidth={1.75} />
    </div>
  );
}
