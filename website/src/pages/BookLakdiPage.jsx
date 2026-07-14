import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppNavbar from '../components/booking/AppNavbar';
import StepIndicator from '../components/booking/StepIndicator';
import Step1Requirements from './booking/Step1Requirements';
import Step2DeliveryDetails from './booking/Step2DeliveryDetails';
import Step3GetQuotations from './booking/Step3GetQuotations';
import Step4ChooseVendor from './booking/Step4ChooseVendor';
import Step5ConfirmOrder from './booking/Step5ConfirmOrder';

const initialOrder = {
  woodTypes: [],
  quantity: '',
  unit: 'Quintal',
  purpose: '',
  deliveryPreference: '',
  notes: '',
  address: null,
  contact: null,
  selectedVendorId: null,
};

const headings = {
  1: { title: 'Book Lakdi', subtitle: "Tell us what you need and we'll get quotations from nearby verified vendors." },
  2: { title: 'Book Lakdi', subtitle: 'Almost there! Tell us where and when you want your lakdi delivered.' },
  3: { title: 'Book Lakdi', subtitle: "We're finding the best vendors for your requirements." },
  '3-received': { title: 'Book Lakdi', subtitle: 'Choose the best quotation from verified vendors.' },
  4: { title: 'Book Lakdi', subtitle: 'Choose the best vendor and review the quotation details.' },
  5: { title: 'Book Lakdi', subtitle: 'Review your order details, choose payment method and confirm your order.' },
};

export default function BookLakdiPage() {
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState(initialOrder);
  const [quotesReceived, setQuotesReceived] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  useEffect(() => {
    if (step !== 3 || quotesReceived) return undefined;
    const timer = setTimeout(() => setQuotesReceived(true), 4500);
    return () => clearTimeout(timer);
  }, [step, quotesReceived]);

  const updateOrder = (patch) => setOrder((prev) => ({ ...prev, ...patch }));

  const goTo = (n) => setStep(n);
  const next = () => setStep((s) => Math.min(s + 1, 5));
  const previous = () => setStep((s) => Math.max(s - 1, 1));

  const headingKey = step === 3 && quotesReceived ? '3-received' : step;
  const heading = headings[headingKey];

  if (orderPlaced) {
    return (
      <>
        <AppNavbar />
        <div className="bg-brand-cream min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-16">
          <div className="bg-white border border-[#F1E7D4] rounded-2xl p-10 max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">Order Placed Successfully!</h2>
            <p className="text-sm text-gray-500 mb-6">
              Your order has been confirmed. The vendor has been notified and will prepare your delivery shortly.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200 shadow-md"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AppNavbar />
      <div className="bg-brand-cream py-8 min-h-[calc(100vh-64px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">{heading.title}</h1>
              <p className="text-sm text-gray-500">{heading.subtitle}</p>
            </div>
            <div className="overflow-x-auto lg:overflow-visible">
              <StepIndicator currentStep={step} />
            </div>
          </div>

          {step === 1 && <Step1Requirements order={order} updateOrder={updateOrder} onNext={next} />}
          {step === 2 && (
            <Step2DeliveryDetails
              order={order}
              updateOrder={updateOrder}
              onNext={next}
              onPrevious={previous}
              onEditStep1={() => goTo(1)}
            />
          )}
          {step === 3 && (
            <Step3GetQuotations
              order={order}
              updateOrder={updateOrder}
              onNext={next}
              onPrevious={previous}
              onEditStep1={() => goTo(1)}
              quotesReceived={quotesReceived}
              setQuotesReceived={setQuotesReceived}
            />
          )}
          {step === 4 && (
            <Step4ChooseVendor
              order={order}
              updateOrder={updateOrder}
              onNext={next}
              onPrevious={previous}
              onEditStep1={() => goTo(1)}
            />
          )}
          {step === 5 && (
            <Step5ConfirmOrder
              order={order}
              onPrevious={previous}
              onEditStep1={() => goTo(1)}
              onEditStep2={() => goTo(2)}
              onPlaceOrder={() => setOrderPlaced(true)}
            />
          )}
        </div>
      </div>
    </>
  );
}
