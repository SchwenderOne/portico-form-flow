
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Plus, Zap } from "lucide-react";
import { Automation } from "@/types/automation";
import { toast } from "sonner";
import EmptyState from "@/components/automations/EmptyState";
import AutomationsList from "@/components/automations/AutomationsList";
import AutomationBuilder from "@/components/automations/AutomationBuilder";
import { 
  getAllAutomations, 
  createAutomation, 
  updateAutomation, 
  deleteAutomation, 
  toggleAutomationStatus, 
  mockFormElements 
} from "@/services/automations-service";

const Automations = () => {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBuilder, setShowBuilder] = useState(false);
  const [currentAutomation, setCurrentAutomation] = useState<Automation | undefined>(undefined);

  useEffect(() => {
    loadAutomations();
  }, []);

  const loadAutomations = async () => {
    setLoading(true);
    try {
      const data = await getAllAutomations();
      setAutomations(data);
    } catch (error) {
      console.error("Error loading automations:", error);
      toast.error("Failed to load automations");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAutomation = () => {
    setCurrentAutomation(undefined);
    setShowBuilder(true);
  };

  const handleEditAutomation = (automation: Automation) => {
    setCurrentAutomation(automation);
    setShowBuilder(true);
  };

  const handleDeleteAutomation = async (id: string) => {
    try {
      await deleteAutomation(id);
      setAutomations(automations.filter(a => a.id !== id));
      toast.success("Automation deleted successfully");
    } catch (error) {
      console.error("Error deleting automation:", error);
      toast.error("Failed to delete automation");
    }
  };

  const handleToggleAutomation = async (id: string, enabled: boolean) => {
    try {
      const updated = await toggleAutomationStatus(id, enabled);
      setAutomations(automations.map(a => a.id === id ? updated : a));
      toast.success(`Automation ${enabled ? 'enabled' : 'disabled'} successfully`);
    } catch (error) {
      console.error("Error toggling automation:", error);
      toast.error("Failed to update automation status");
    }
  };

  const handleSaveAutomation = async (automation: Automation) => {
    try {
      if (currentAutomation) {
        // Update existing automation
        const updated = await updateAutomation(automation);
        setAutomations(automations.map(a => a.id === updated.id ? updated : a));
        toast.success("Automation updated successfully");
      } else {
        // Create new automation
        const created = await createAutomation(automation);
        setAutomations([...automations, created]);
        toast.success("Automation created successfully");
      }
      setShowBuilder(false);
      setCurrentAutomation(undefined);
    } catch (error) {
      console.error("Error saving automation:", error);
      toast.error("Failed to save automation");
    }
  };

  const handleCancelAutomation = () => {
    setShowBuilder(false);
    setCurrentAutomation(undefined);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Form Automations</h1>
          </div>
          <div className="flex items-center justify-center h-64">
            <p>Loading automations...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Form Automations</h1>
          </div>
          {!showBuilder && automations.length > 0 && (
            <Button onClick={handleCreateAutomation}>
              <Plus className="mr-2 h-4 w-4" />
              Create Automation
            </Button>
          )}
        </div>

        {showBuilder ? (
          <AutomationBuilder
            automation={currentAutomation}
            formElements={mockFormElements}
            onSave={handleSaveAutomation}
            onCancel={handleCancelAutomation}
          />
        ) : automations.length === 0 ? (
          <EmptyState onCreateAutomation={handleCreateAutomation} />
        ) : (
          <AutomationsList
            automations={automations}
            onEdit={handleEditAutomation}
            onDelete={handleDeleteAutomation}
            onToggle={handleToggleAutomation}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Automations;
