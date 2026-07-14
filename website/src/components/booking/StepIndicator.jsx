const steps = [
  { number: 1, label: 'Requirements' },
  { number: 2, label: 'Delivery Details' },
  { number: 3, label: 'Get Quotations' },
  { number: 4, label: 'Choose Vendor' },
  { number: 5, label: 'Confirm Order' },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-start">
      {steps.map((step, i) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        const connectorActive = step.number < currentStep;

        return (
          <div key={step.number} className={`flex items-start ${i === steps.length - 1 ? '' : 'flex-1'}`}>
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  isActive
                    ? 'bg-brand-green text-white'
                    : isCompleted
                    ? 'bg-white border-2 border-brand-green text-brand-green'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.number}
              </div>
              <span
                className={`mt-2 text-xs whitespace-nowrap ${
                  isActive ? 'font-bold text-gray-900' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i !== steps.length - 1 && (
              <div
                className="flex-1 mt-[18px] mx-2 border-t-2 border-dashed"
                style={{ borderColor: connectorActive ? '#2D6A2D' : '#D9D9D9' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
