import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import { LanguageProvider } from './i18n/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import { AppLayout } from './components/AppLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { PlatformPage } from './pages/public/PlatformPage';
import { TechnologyPage } from './pages/public/TechnologyPage';
import { ProductsPage } from './pages/public/ProductsPage';
import { ProductDetailPage } from './pages/public/ProductDetailPage';
import { StorePage } from './pages/public/StorePage';
import { CheckoutPage } from './pages/public/CheckoutPage';
import { SolutionsPage } from './pages/public/SolutionsPage';
import { AboutPage } from './pages/public/AboutPage';
import { OurWorkPage } from './pages/public/OurWorkPage';
import { ResourcesPage } from './pages/public/ResourcesPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { PrivacyPage, TermsPage } from './pages/public/LegalPages';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Authenticated Pages
import { OverviewPage } from './pages/app/OverviewPage';
import { FarmsPage } from './pages/app/FarmsPage';
import { FieldsPage } from './pages/app/FieldsPage';
import { DevicesPage } from './pages/app/DevicesPage';
import { WaterTestingPage } from './pages/app/WaterTestingPage';
import { AnalyticsPage } from './pages/app/AnalyticsPage';
import { AlertsPage } from './pages/app/AlertsPage';
import { ReportsPage } from './pages/app/ReportsPage';
import { MaintenancePage } from './pages/app/MaintenancePage';
import { TeamPage } from './pages/app/TeamPage';
import { SettingsPage } from './pages/app/SettingsPage';
import { ProjectsManagePage } from './pages/app/ProjectsManagePage';
import { StoreManagePage } from './pages/app/StoreManagePage';
import { UploadsManagePage } from './pages/app/UploadsManagePage';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="ts-skeleton" style={{ width: '120px', height: '24px' }} />
      </div>
    );
  }
  // Allow unauthenticated exploration with default demo persona if needed, or redirect to login
  if (!user && !localStorage.getItem('agtech_auth_token')) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Marketing Website */}
                <Route path="/" element={<HomePage />} />
                <Route path="/platform" element={<PlatformPage />} />
                <Route path="/technology" element={<TechnologyPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/our-work" element={<OurWorkPage />} />
                <Route path="/work" element={<OurWorkPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/demo" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />

                {/* Authenticated Customer Dashboard (/app) */}
                <Route
                  path="/app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<OverviewPage />} />
                  <Route path="farms" element={<FarmsPage />} />
                  <Route path="fields" element={<FieldsPage />} />
                  <Route path="devices" element={<DevicesPage />} />
                  <Route path="water-testing" element={<WaterTestingPage />} />
                  <Route path="soil-monitoring" element={<Navigate to="/app/water-testing" replace />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="alerts" element={<AlertsPage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="projects" element={<ProjectsManagePage />} />
                  <Route path="store-management" element={<StoreManagePage />} />
                  <Route path="uploads" element={<UploadsManagePage />} />
                  <Route path="maintenance" element={<MaintenancePage />} />
                  <Route path="team" element={<TeamPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>

                {/* 404 Catch-All */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
