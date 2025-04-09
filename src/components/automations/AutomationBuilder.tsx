
import React, { useState } from "react";
import { Automation, Trigger, Action } from "@/types/automation";
import { FormElement } from "@/types/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Zap } from "lucide-react";
import TriggerSelector from "./TriggerSelector";
import ActionSelector from "./ActionSelector";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface AutomationBuilderProps {
  automation?: Automation;
  formElements: FormElement[];
  onSave: (automation: Automation) => void;
  onCancel: () => void;
}

const AutomationBuilder: React.FC<AutomationBuilderProps> = ({
  automation,
  formElements,
  onSave,
  onCancel,
}) => {
  const [currentTab, setCurrentTab] = useState("trigger");
  const [name, setName] = useState(automation?.name || "");
  const [trigger, setTrigger] = useState<Trigger>(
    automation?.trigger || {
      id: uuidv4(),
      type: "formSubmission",
      name: "Form is submitted",
    }
  );
  const [actions, setActions] = useState<Action[]>(
    automation?.actions || [
      {
        id: uuidv4(),
        type: "sendEmail",
        name: "Send email",
        config: {
          emailTo: "",
          emailSubject: "",
          emailBody: "",
        },
      },
    ]
  );

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Please enter a name for this automation");
      return;
    }
    
    if (actions.length === 0) {
      toast.error("Please add at least one action");
      return;
    }
    
    // Validate actions
    for (const action of actions) {
      if (action.type === "sendEmail") {
        if (!action.config.emailTo) {
          toast.error("Email recipient is required");
          return;
        }
        if (!action.config.emailSubject) {
          toast.error("Email subject is required");
          return;
        }
      } else if (action.type === "webhook") {
        if (!action.config.webhookUrl) {
          toast.error("Webhook URL is required");
          return;
        }
      } else if (action.type === "tagSubmission") {
        if (!action.config.tagName) {
          toast.error("Tag name is required");
          return;
        }
      }
    }
    
    const newAutomation: Automation = {
      id: automation?.id || uuidv4(),
      name,
      formId: "current-form-id", // In a real app, this would be the current form's ID
      enabled: automation?.enabled ?? true,
      trigger,
      actions,
      createdAt: automation?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    onSave(newAutomation);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-primary" />
          <CardTitle>{automation ? "Edit Automation" : "Create Automation"}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="automationName">Automation Name</Label>
            <Input
              id="automationName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Send notification on form submission"
            />
          </div>

          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="trigger">Trigger</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>
            <TabsContent value="trigger" className="pt-4">
              <TriggerSelector 
                trigger={trigger} 
                formElements={formElements}
                onTriggerChange={setTrigger}
              />
              <div className="flex justify-end mt-4">
                <Button onClick={() => setCurrentTab("actions")}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="actions" className="pt-4">
              <ActionSelector
                actions={actions}
                onActionsChange={setActions}
              />
            </TabsContent>
          </Tabs>

          <div className="bg-muted rounded-md p-4 mt-4">
            <h4 className="font-medium mb-2">Preview</h4>
            <div className="flex items-center">
              <div className="py-2 px-3 bg-background rounded border">
                <span className="text-sm">{trigger.name}</span>
              </div>
              <ArrowRight className="mx-2" />
              <div className="flex-1">
                {actions.map((action, index) => (
                  <div key={action.id} className="py-2 px-3 bg-background rounded border mb-2 last:mb-0">
                    <span className="text-sm">{action.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6 flex justify-between">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save Automation</Button>
      </CardFooter>
    </Card>
  );
};

export default AutomationBuilder;
