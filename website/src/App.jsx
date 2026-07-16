import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VendorOnboardingPage from './pages/VendorOnboardingPage';
import BookLakdiPage from './pages/BookLakdiPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/vendor-onboarding" element={<VendorOnboardingPage />} />
        <Route
          path="/book-lakdi"
          element={
            <ProtectedRoute>
              <BookLakdiPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
