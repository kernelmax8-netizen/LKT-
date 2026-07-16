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
import { useAuth } from '../context/AuthContext';
import {
  createOrder,
  generateQuotesForOrder,
  acceptQuote,
  placeOrder,
  saveAddress,
  subscribeToQuotes,
} from '../services/orderService';

const initialOrder = {
  woodTypes: [],
  quantity: '',
  unit: 'Quintal',
  purpose: '',
  deliveryPreference: '',
  deliveryDate: '',
  notes: '',
  address: null,
  contact: null,
  selectedVendorId: null,
  selectedQuoteId: null,
  paymentMethod: 'cod',
  orderId: null,
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
  const { user, profile } = useAuth();
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState(initialOrder);
  const [quotesReceived, setQuotesReceived] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [placedOrderId, setPlacedOrderId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  useEffect(() => {
    if (!order.orderId || step !== 3) return undefined;
    const unsub = subscribeToQuotes(order.orderId, (list) => {
      setQuotes(list);
      if (list.length > 0) setQuotesReceived(true);
    });
    return unsub;
  }, [order.orderId, step]);

  const updateOrder = (patch) => setOrder((prev) => ({ ...prev, ...patch }));

  const goTo = (n) => setStep(n);
  const previous = () => setStep((s) => Math.max(s - 1, 1));

  const handleStep2Next = async (payload) => {
    setBusy(true);
    setError('');
    try {
      const { address, contact, saveForFuture, landmark } = payload;
      const fullAddress = landmark ? { ...address, landmark } : address;
      updateOrder({ address: fullAddress, contact });

      if (saveForFuture && user) {
        await saveAddress(user.uid, {
          label: address.label || 'Home',
          ...fullAddress,
          isDefault: true,
        });
      }

      const created = await createOrder(user.uid, {
        ...order,
        address: fullAddress,
        contact,
      });

      updateOrder({ orderId: created.id, address: fullAddress, contact });
      setQuotesReceived(false);
      setQuotes([]);
      setStep(3);

      const generated = await generateQuotesForOrder(created.id, {
        ...order,
        address: fullAddress,
        contact,
      });
      setQuotes(generated);
      if (generated.length > 0) setQuotesReceived(true);
    } catch (err) {
      setError(err.message?.replace('Firebase: ', '') || 'Could not create order');
    } finally {
      setBusy(false);
    }
  };

  const handleAcceptQuote = async (vendorId, quoteId) => {
    if (!order.orderId) return;
    setBusy(true);
    setError('');
    try {
      await acceptQuote(order.orderId, quoteId, vendorId);
      updateOrder({ selectedVendorId: vendorId, selectedQuoteId: quoteId });
    } catch (err) {
      setError(err.message?.replace('Firebase: ', '') || 'Could not accept quote');
    } finally {
      setBusy(false);
    }
  };

  const handlePlaceOrder = async ({ paymentMethod, subtotal, deliveryCharge, grandTotal }) => {
    if (!order.orderId) return;
    setBusy(true);
    setError('');
    try {
      await placeOrder(order.orderId, { paymentMethod, subtotal, deliveryCharge, grandTotal });
      updateOrder({ paymentMethod });
      setPlacedOrderId(order.orderId);
      setOrderPlaced(true);
    } catch (err) {
      setError(err.message?.replace('Firebase: ', '') || 'Could not place order');
    } finally {
      setBusy(false);
    }
  };

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
            <p className="text-sm text-gray-500 mb-2">
              Your order has been confirmed. The vendor has been notified and will prepare your delivery shortly.
            </p>
            {placedOrderId && (
              <p className="text-xs text-gray-400 mb-6 font-mono">Order ID: {placedOrderId}</p>
            )}
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

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {step === 1 && <Step1Requirements order={order} updateOrder={updateOrder} onNext={() => setStep(2)} />}
          {step === 2 && (
            <Step2DeliveryDetails
              order={order}
              updateOrder={updateOrder}
              onNext={handleStep2Next}
              onPrevious={previous}
              onEditStep1={() => goTo(1)}
              busy={busy}
              defaultContact={{
                name: profile?.name || '',
                mobile: profile?.phone || '',
                altMobile: '',
              }}
            />
          )}
          {step === 3 && (
            <Step3GetQuotations
              order={order}
              updateOrder={updateOrder}
              onNext={() => setStep(4)}
              onPrevious={previous}
              onEditStep1={() => goTo(1)}
              quotesReceived={quotesReceived}
              setQuotesReceived={setQuotesReceived}
              quotes={quotes}
              setQuotes={setQuotes}
              onAcceptQuote={handleAcceptQuote}
              busy={busy}
            />
          )}
          {step === 4 && (
            <Step4ChooseVendor
              order={order}
              updateOrder={updateOrder}
              onNext={() => setStep(5)}
              onPrevious={previous}
              onEditStep1={() => goTo(1)}
              quotes={quotes}
              onAcceptQuote={handleAcceptQuote}
            />
          )}
          {step === 5 && (
            <Step5ConfirmOrder
              order={order}
              quotes={quotes}
              onPrevious={previous}
              onEditStep1={() => goTo(1)}
              onEditStep2={() => goTo(2)}
              onPlaceOrder={handlePlaceOrder}
              busy={busy}
            />
          )}
        </div>
      </div>
    </>
  );
}
