
import React from "react";
import { Action, ActionType } from "@/types/automation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Tag, Webhook, CheckCircle, Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface ActionSelectorProps {
  actions: Action[];
  onActionsChange: (actions: Action[]) => void;
}

const ActionSelector: React.FC<ActionSelectorProps> = ({
  actions,
  onActionsChange,
}) => {
  const handleAddAction = () => {
    const newAction: Action = {
      id: uuidv4(),
      type: "sendEmail",
      name: "Send email",
      config: {
        emailTo: "",
        emailSubject: "",
        emailBody: "",
      },
    };
    onActionsChange([...actions, newAction]);
  };

  const handleRemoveAction = (id: string) => {
    onActionsChange(actions.filter(action => action.id !== id));
  };

  const handleTypeChange = (id: string, type: ActionType) => {
    let name = "";
    switch (type) {
      case "sendEmail":
        name = "Send email";
        break;
      case "webhook":
        name = "Call webhook";
        break;
      case "showConfirmation":
        name = "Show confirmation screen";
        break;
      case "tagSubmission":
        name = "Tag submission";
        break;
    }

    onActionsChange(
      actions.map(action => 
        action.id === id 
          ? { ...action, type, name, config: getDefaultConfig(type) } 
          : action
      )
    );
  };

  const getDefaultConfig = (type: ActionType) => {
    switch (type) {
      case "sendEmail":
        return { emailTo: "", emailSubject: "", emailBody: "" };
      case "webhook":
        return { webhookUrl: "" };
      case "showConfirmation":
        return { confirmationMessage: "" };
      case "tagSubmission":
        return { tagName: "" };
      default:
        return {};
    }
  };

  const handleConfigChange = (id: string, key: string, value: string) => {
    onActionsChange(
      actions.map(action => 
        action.id === id 
          ? { ...action, config: { ...action.config, [key]: value } } 
          : action
      )
    );
  };

  const getActionIcon = (type: ActionType) => {
    switch (type) {
      case "sendEmail": return <Mail className="h-5 w-5 text-primary" />;
      case "webhook": return <Webhook className="h-5 w-5 text-primary" />;
      case "showConfirmation": return <CheckCircle className="h-5 w-5 text-primary" />;
      case "tagSubmission": return <Tag className="h-5 w-5 text-primary" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-2">
        <h3 className="text-lg font-medium">Actions: Do this...</h3>
      </div>

      {actions.map((action, index) => (
        <Card key={action.id} className="relative">
          <CardContent className="p-4">
            <div className="absolute top-3 right-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveAction(action.id)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove action</span>
              </Button>
            </div>

            <div className="space-y-4 pr-8">
              <div className="flex items-center space-x-2 mb-2">
                {getActionIcon(action.type)}
                <h4 className="font-medium">Action {index + 1}</h4>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`actionType-${action.id}`}>Action Type</Label>
                <Select 
                  value={action.type} 
                  onValueChange={(value) => handleTypeChange(action.id, value as ActionType)}
                >
                  <SelectTrigger id={`actionType-${action.id}`}>
                    <SelectValue placeholder="Select action type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sendEmail">Send Email</SelectItem>
                    <SelectItem value="webhook">Call Webhook</SelectItem>
                    <SelectItem value="showConfirmation">Show Confirmation Screen</SelectItem>
                    <SelectItem value="tagSubmission">Tag Submission</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {action.type === "sendEmail" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor={`emailTo-${action.id}`}>Email To</Label>
                    <Input
                      id={`emailTo-${action.id}`}
                      value={action.config.emailTo || ""}
                      onChange={(e) => handleConfigChange(action.id, "emailTo", e.target.value)}
                      placeholder="recipient@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`emailSubject-${action.id}`}>Subject</Label>
                    <Input
                      id={`emailSubject-${action.id}`}
                      value={action.config.emailSubject || ""}
                      onChange={(e) => handleConfigChange(action.id, "emailSubject", e.target.value)}
                      placeholder="Email subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`emailBody-${action.id}`}>Email Body</Label>
                    <Textarea
                      id={`emailBody-${action.id}`}
                      value={action.config.emailBody || ""}
                      onChange={(e) => handleConfigChange(action.id, "emailBody", e.target.value)}
                      placeholder="Email content"
                      rows={4}
                    />
                  </div>
                </>
              )}

              {action.type === "webhook" && (
                <div className="space-y-2">
                  <Label htmlFor={`webhookUrl-${action.id}`}>Webhook URL</Label>
                  <Input
                    id={`webhookUrl-${action.id}`}
                    value={action.config.webhookUrl || ""}
                    onChange={(e) => handleConfigChange(action.id, "webhookUrl", e.target.value)}
                    placeholder="https://example.com/webhook"
                  />
                </div>
              )}

              {action.type === "showConfirmation" && (
                <div className="space-y-2">
                  <Label htmlFor={`confirmationMessage-${action.id}`}>Confirmation Message</Label>
                  <Textarea
                    id={`confirmationMessage-${action.id}`}
                    value={action.config.confirmationMessage || ""}
                    onChange={(e) => handleConfigChange(action.id, "confirmationMessage", e.target.value)}
                    placeholder="Thank you for your submission!"
                    rows={4}
                  />
                </div>
              )}

              {action.type === "tagSubmission" && (
                <div className="space-y-2">
                  <Label htmlFor={`tagName-${action.id}`}>Tag Name</Label>
                  <Input
                    id={`tagName-${action.id}`}
                    value={action.config.tagName || ""}
                    onChange={(e) => handleConfigChange(action.id, "tagName", e.target.value)}
                    placeholder="high-priority"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button 
        variant="outline" 
        onClick={handleAddAction}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Action
      </Button>
    </div>
  );
};

export default ActionSelector;
