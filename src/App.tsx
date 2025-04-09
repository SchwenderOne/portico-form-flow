
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrandSettingsProvider } from "@/context/BrandSettingsContext";
import { TeamProvider } from "@/context/TeamContext";
import { BrandSettingsApplier } from "@/components/branding/BrandSettingsApplier";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import NotFound from "./pages/NotFound";
import FormBuilder from "./pages/FormBuilder";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrandSettingsProvider>
        <TeamProvider>
          {/* Apply brand settings globally */}
          <BrandSettingsApplier />
          
          <Toaster />
          <Sonner />
          
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/distribute" element={<NotFound />} />
              <Route path="/analytics" element={<NotFound />} />
              <Route path="/branding" element={<Index />} /> {/* Redirects to Index but will open Brand Settings panel */}
              <Route path="/team" element={<Index />} /> {/* Redirects to Index but will open Team Management panel */}
              <Route path="/history" element={<NotFound />} />
              <Route path="/compliance" element={<NotFound />} />
              <Route path="/settings" element={<NotFound />} />
              <Route path="/form-builder" element={<FormBuilder />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TeamProvider>
      </BrandSettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
