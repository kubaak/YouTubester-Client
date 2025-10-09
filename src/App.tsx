import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RepliesPage } from "./pages/RepliesPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/replies" replace />} />
          <Route path="/replies" element={<RepliesPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
