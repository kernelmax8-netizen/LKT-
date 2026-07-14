export default function LogoIcon({ size = 38 }) {
  return (
    <div style={{ width: size, height: size }} className="relative flex-shrink-0">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#2D6A2D"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="230.9 33"
          transform="rotate(-55 50 50)"
        />
      </svg>
      <img
        src="/wood-charcoal-nobg.png"
        alt="LakdiKiTaal logo"
        className="absolute"
        style={{ width: '84%', left: '48%', top: '32%', transform: 'translateX(-50%)' }}
      />
    </div>
  );
}
