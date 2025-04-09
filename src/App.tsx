
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrandSettingsProvider } from "@/context/BrandSettingsContext";
import { TeamProvider } from "@/context/TeamContext";
import { ComplianceProvider } from "@/context/ComplianceContext";
import { FormMetadataProvider } from "@/context/FormMetadataContext";
import { AuthProvider } from "@/context/AuthContext";
import { BrandSettingsApplier } from "@/components/branding/BrandSettingsApplier";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import NotFound from "./pages/NotFound";
import FormBuilder from "./pages/FormBuilder";
import Compliance from "./pages/Compliance";
import FormMetadata from "./pages/FormMetadata";
import Analytics from "./pages/Analytics";
import Automations from "./pages/Automations";
import Auth from "./pages/Auth";
import RequireAuth from "./components/auth/RequireAuth";
import ErrorBoundary from "@/components/common/ErrorBoundary";

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
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrandSettingsProvider>
            <TeamProvider>
              <ComplianceProvider>
                <FormMetadataProvider>
                  {/* Apply brand settings globally */}
                  <BrandSettingsApplier />
                  
                  <Toaster />
                  <Sonner />
                  
                  <BrowserRouter>
                    <Routes>
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
                      <Route path="/templates" element={<RequireAuth><Templates /></RequireAuth>} />
                      <Route path="/distribute" element={<RequireAuth><NotFound /></RequireAuth>} />
                      <Route path="/analytics" element={<RequireAuth><Analytics /></RequireAuth>} />
                      <Route path="/automations" element={<RequireAuth><Automations /></RequireAuth>} />
                      <Route path="/branding" element={<RequireAuth><Index /></RequireAuth>} /> {/* Redirects to Index but will open Brand Settings panel */}
                      <Route path="/team" element={<RequireAuth><Index /></RequireAuth>} /> {/* Redirects to Index but will open Team Management panel */}
                      <Route path="/history" element={<RequireAuth><NotFound /></RequireAuth>} />
                      <Route path="/compliance" element={<RequireAuth><Compliance /></RequireAuth>} />
                      <Route path="/metadata" element={<RequireAuth><FormMetadata /></RequireAuth>} />
                      <Route path="/settings" element={<RequireAuth><NotFound /></RequireAuth>} />
                      <Route path="/form-builder" element={<RequireAuth><FormBuilder /></RequireAuth>} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </FormMetadataProvider>
              </ComplianceProvider>
            </TeamProvider>
          </BrandSettingsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
