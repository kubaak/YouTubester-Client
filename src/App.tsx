import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '@/contexts/AuthContext';
import { AuthGuard } from '@/components/AuthGuard';
import Layout from '@/components/Layout';
import PublicLayout from '@/components/PublicLayout';

import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import RepliesPage from '@/pages/RepliesPage';
import VideoTemplatePage from '@/pages/VideoTemplatePage';
import GeneratePage from '@/pages/GeneratePage';
import ReviewPage from '@/pages/ReviewPage';
import SettingsPage from '@/pages/SettingsPage';
import ChannelSettingsPage from '@/pages/ChannelSettingsPage';
import AboutPage from '@/pages/AboutPage';
import FaqPage from '@/pages/FaqPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import HelpPage from '@/pages/HelpPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <AboutPage />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <ContactPage />
                </PublicLayout>
              }
            />
            <Route
              path="/faq"
              element={
                <PublicLayout>
                  <FaqPage />
                </PublicLayout>
              }
            />
            <Route
              path="/help"
              element={
                <PublicLayout>
                  <HelpPage />
                </PublicLayout>
              }
            />
            <Route
              path="/privacy"
              element={
                <PublicLayout>
                  <PrivacyPolicyPage />
                </PublicLayout>
              }
            />
            <Route
              path="/terms"
              element={
                <PublicLayout>
                  <TermsOfServicePage />
                </PublicLayout>
              }
            />

            {/* Protected routes */}
            <Route
              path="/*"
              element={
                <AuthGuard>
                  <Layout>
                    <Routes>
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/replies" element={<RepliesPage />} />
                      <Route path="/videoTemplate" element={<VideoTemplatePage />} />
                      <Route path="/generate" element={<GeneratePage />} />
                      <Route path="/review" element={<ReviewPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/settings/channel" element={<ChannelSettingsPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/faq" element={<FaqPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/help" element={<HelpPage />} />
                    </Routes>
                  </Layout>
                </AuthGuard>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
