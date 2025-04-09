
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
import { SelectedTemplateProvider } from "@/context/SelectedTemplateContext";
import { BrandSettingsApplier } from "@/components/branding/BrandSettingsApplier";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import NotFound from "./pages/NotFound";
import FormBuilder from "./pages/FormBuilder";
import Compliance from "./pages/Compliance";
import FormMetadata from "./pages/FormMetadata";
import Analytics from "./pages/Analytics";
import Automations from "./pages/Automations";
import Distribute from "./pages/Distribute";
import Branding from "./pages/Branding";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Security from "./pages/Security";
import Auth from "./pages/Auth";
import RequireAuth from "./components/auth/RequireAuth";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import FormsV2 from "./pages/FormsV2";

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
                  <SelectedTemplateProvider>
                    {/* Apply brand settings globally */}
                    <BrandSettingsApplier />
                    
                    <Toaster />
                    <Sonner />
                    
                    <BrowserRouter>
                      <Routes>
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
                        <Route path="/templates" element={<RequireAuth><Templates /></RequireAuth>} />
                        <Route path="/distribute" element={<RequireAuth><Distribute /></RequireAuth>} />
                        <Route path="/analytics" element={<RequireAuth><Analytics /></RequireAuth>} />
                        <Route path="/automations" element={<RequireAuth><Automations /></RequireAuth>} />
                        <Route path="/branding" element={<RequireAuth><Branding /></RequireAuth>} />
                        <Route path="/team" element={<RequireAuth><Index /></RequireAuth>} />
                        <Route path="/history" element={<RequireAuth><History /></RequireAuth>} />
                        <Route path="/compliance" element={<RequireAuth><Compliance /></RequireAuth>} />
                        <Route path="/metadata" element={<RequireAuth><FormMetadata /></RequireAuth>} />
                        <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
                        <Route path="/security" element={<RequireAuth><Security /></RequireAuth>} />
                        <Route path="/form-builder" element={<RequireAuth><FormBuilder /></RequireAuth>} />
                        <Route path="/forms-v2" element={<RequireAuth><FormsV2 /></RequireAuth>} />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </SelectedTemplateProvider>
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
