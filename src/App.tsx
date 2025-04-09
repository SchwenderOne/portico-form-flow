
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BrandSettingsProvider } from "@/context/BrandSettingsContext";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import NotFound from "./pages/NotFound";
import FormBuilder from "./pages/FormBuilder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrandSettingsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/distribute" element={<NotFound />} />
            <Route path="/analytics" element={<NotFound />} />
            <Route path="/branding" element={<Index />} /> {/* Redirect to Index but will open Brand Settings panel */}
            <Route path="/history" element={<NotFound />} />
            <Route path="/compliance" element={<NotFound />} />
            <Route path="/settings" element={<NotFound />} />
            <Route path="/form-builder" element={<FormBuilder />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BrandSettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
