import "./global.css";


import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

// Lazy load large/rarely used pages for faster initial load
const Index = React.lazy(() => import("./pages/Index"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const UserFormPage = React.lazy(() => import("./pages/UserFormPage"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Faq = React.lazy(() => import("./pages/Faq"));
const Payment = React.lazy(() => import("./pages/Payment"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = React.lazy(() => import("./pages/TermsConditions"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-lg">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/userform" element={<UserFormPage />} />
            <Route path="/userform/route" element={<UserFormPage step="route" />} />
            <Route path="/userform/passengers" element={<UserFormPage step="passengers" />} />
            <Route path="/userform/confirmation" element={<UserFormPage step="confirmation" />} />
            <Route path="/userform/search" element={<UserFormPage step="search" />} />
            <Route path="/userform/thankyou" element={<UserFormPage step="thankyou" />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Prevent multiple createRoot calls during HMR
const container = document.getElementById("root")!;
let root = (globalThis as any).__vite_react_root;

if (!root) {
  root = createRoot(container);
  (globalThis as any).__vite_react_root = root;
}

root.render(<App />);
