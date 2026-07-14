import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import WhoItsFor from '../components/WhoItsFor';
import StatsBar from '../components/StatsBar';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <WhyChooseUs />
      <WhoItsFor />
      <StatsBar />
      <CTABanner />
      <Footer />
    </>
  );
}
