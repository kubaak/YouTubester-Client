import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '@/contexts/AuthContext';
import { AuthGuard } from '@/components/AuthGuard';
import Layout from '@/components/Layout';
import { WriteAuthBootstrap } from '@/auth/authStore';

import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import RepliesPage from '@/pages/RepliesPage';
import VideoTemplatePage from '@/pages/VideoTemplatePage';
import SettingsPage from '@/pages/SettingsPage';
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
        <WriteAuthBootstrap>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected routes */}
              <Route
                path="/*"
                element={
                  <AuthGuard>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/replies" element={<RepliesPage />} />
                        <Route path="/videoTemplate" element={<VideoTemplatePage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/faq" element={<FaqPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/privacy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms" element={<TermsOfServicePage />} />
                        <Route path="/help" element={<HelpPage />} />
                      </Routes>
                    </Layout>
                  </AuthGuard>
                }
              />
            </Routes>
          </BrowserRouter>
        </WriteAuthBootstrap>
      </AuthProvider>
    </QueryClientProvider>
  );
}
