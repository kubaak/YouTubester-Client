import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RepliesPage from "./pages/RepliesPage";
import VideoTemplatePage from "./pages/VideoTemplatePage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/replies" replace />} />
          <Route path="/replies" element={<RepliesPage />} />
          <Route path="/videoTemplate" element={<VideoTemplatePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
