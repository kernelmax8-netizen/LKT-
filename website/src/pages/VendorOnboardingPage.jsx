import Navbar from '../components/Navbar';
import VendorSidebar from '../components/vendor/VendorSidebar';
import VendorForm from '../components/vendor/VendorForm';
import VendorFooter from '../components/vendor/VendorFooter';

export default function VendorOnboardingPage() {
  return (
    <>
      <Navbar />
      <section className="bg-brand-cream py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            <VendorSidebar />
            <VendorForm />
          </div>
        </div>
      </section>
      <VendorFooter />
    </>
  );
}
