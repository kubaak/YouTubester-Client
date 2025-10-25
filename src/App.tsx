import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import RepliesPage from "./pages/RepliesPage";
import VideoTemplatePage from "./pages/VideoTemplatePage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/replies" element={<RepliesPage />} />
            <Route path="/videoTemplate" element={<VideoTemplatePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
