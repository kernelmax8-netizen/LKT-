import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VendorOnboardingPage from './pages/VendorOnboardingPage';
import BookLakdiPage from './pages/BookLakdiPage';

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vendor-onboarding" element={<VendorOnboardingPage />} />
        <Route path="/book-lakdi" element={<BookLakdiPage />} />
      </Routes>
    </div>
  );
}
