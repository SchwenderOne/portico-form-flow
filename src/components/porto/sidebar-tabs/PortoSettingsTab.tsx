
import React, { useState } from "react";
import { usePorto } from "../context/PortoContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Settings,
  User2,
  Shield,
  FileOutput,
  Building2,
  Languages,
  Workflow,
  Send,
  ShieldAlert,
  KeyRound,
  Database,
  ToggleLeft,
  Calendar,
  Brain
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

export const PortoSettingsTab: React.FC = () => {
  const { 
    formTitle, 
    setFormTitle, 
    formDescription, 
    setFormDescription,
    saveForm 
  } = usePorto();
  
  const [activeTab, setActiveTab] = useState("general");
  const [enableGDPR, setEnableGDPR] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState("Submit");
  const [thankYouMessage, setThankYouMessage] = useState("Thank you for your submission!");
  const [enableEmailNotifications, setEnableEmailNotifications] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState("");
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState("90");
  const [enableAnalytics, setEnableAnalytics] = useState(true);
  const [enableSmartAssist, setEnableSmartAssist] = useState(true);

  const handleSaveSettings = () => {
    saveForm();
    toast.success("Form settings saved successfully");
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="general">
              <Settings className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="h-4 w-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <Database className="h-4 w-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="formTitle">Form Title</Label>
              <Input
                id="formTitle"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="formDescription">Form Description</Label>
              <Textarea
                id="formDescription"
                rows={3}
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="submitButtonText">Submit Button Text</Label>
              <Input
                id="submitButtonText"
                value={submitButtonText}
                onChange={(e) => setSubmitButtonText(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="thankYouMessage">Thank You Message</Label>
              <Textarea
                id="thankYouMessage"
                rows={2}
                value={thankYouMessage}
                onChange={(e) => setThankYouMessage(e.target.value)}
              />
            </div>
            
            <Accordion type="single" collapsible>
              <AccordionItem value="form-expiry">
                <AccordionTrigger>Form Availability</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="toggle-expiry">Enable Form Expiry</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Set a date when the form will no longer accept submissions
                        </p>
                      </div>
                      <Switch id="toggle-expiry" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="expiry-date">Expiry Date</Label>
                        <Input
                          id="expiry-date"
                          type="date"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiry-time">Expiry Time</Label>
                        <Input
                          id="expiry-time"
                          type="time"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expiry-message">Expiry Message</Label>
                      <Textarea
                        id="expiry-message"
                        rows={2}
                        placeholder="This form is no longer accepting responses."
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="form-localization">
                <AccordionTrigger>Localization</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="toggle-localization">Enable Multiple Languages</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Allow users to switch between languages
                        </p>
                      </div>
                      <Switch id="toggle-localization" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Available Languages</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="justify-start">
                          <Languages className="h-4 w-4 mr-2" />
                          English
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Languages className="h-4 w-4 mr-2" />
                          French
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Languages className="h-4 w-4 mr-2" />
                          German
                        </Button>
                        <Button variant="outline" className="justify-start text-muted-foreground">
                          <Languages className="h-4 w-4 mr-2" />
                          Add Language
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="toggle-gdpr">Enable GDPR Compliance</Label>
                <p className="text-[0.8rem] text-muted-foreground">
                  Add GDPR consent checkbox and privacy policy link
                </p>
              </div>
              <Switch 
                id="toggle-gdpr" 
                checked={enableGDPR}
                onCheckedChange={setEnableGDPR}
              />
            </div>
            
            {enableGDPR && (
              <div className="space-y-2">
                <Label htmlFor="gdpr-text">GDPR Consent Text</Label>
                <Textarea
                  id="gdpr-text"
                  rows={3}
                  defaultValue="I consent to having this website store my submitted information so they can respond to my inquiry."
                />
                
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="privacy-url">Privacy Policy URL</Label>
                    <Input
                      id="privacy-url"
                      placeholder="https://example.com/privacy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="terms-url">Terms of Service URL</Label>
                    <Input
                      id="terms-url"
                      placeholder="https://example.com/terms"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="toggle-data-retention">Data Retention Policy</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    Set how long form submission data should be stored
                  </p>
                </div>
                <Switch id="toggle-data-retention" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="data-retention-period">Retention Period (days)</Label>
                <Input
                  id="data-retention-period"
                  type="number"
                  min="1"
                  value={dataRetentionPeriod}
                  onChange={(e) => setDataRetentionPeriod(e.target.value)}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="toggle-data-anonymization">Data Anonymization</Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    Anonymize or hash sensitive data after submission
                  </p>
                </div>
                <Switch id="toggle-data-anonymization" />
              </div>
              
              <div className="space-y-2">
                <Label>Fields to Anonymize:</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Name</Button>
                  <Button variant="outline" size="sm">Email</Button>
                  <Button variant="outline" size="sm">Phone</Button>
                  <Button variant="outline" size="sm">Address</Button>
                  <Button variant="outline" size="sm">IP Address</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4 mt-4">
            <Accordion type="single" collapsible defaultValue="notifications">
              <AccordionItem value="notifications">
                <AccordionTrigger>Email Notifications</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="toggle-email-notifications">Enable Notifications</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Receive email notifications for new submissions
                        </p>
                      </div>
                      <Switch 
                        id="toggle-email-notifications" 
                        checked={enableEmailNotifications}
                        onCheckedChange={setEnableEmailNotifications}
                      />
                    </div>
                    
                    {enableEmailNotifications && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="notification-email">Notification Email</Label>
                          <Input
                            id="notification-email"
                            type="email"
                            placeholder="your@email.com"
                            value={notificationEmail}
                            onChange={(e) => setNotificationEmail(e.target.value)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="toggle-responder">Auto-Responder</Label>
                            <p className="text-[0.8rem] text-muted-foreground">
                              Send confirmation email to form submitters
                            </p>
                          </div>
                          <Switch id="toggle-responder" />
                        </div>
                      </>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="form-logic">
                <AccordionTrigger>Form Logic & Branching</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="toggle-form-logic">Enable Conditional Logic</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Show or hide fields based on user input
                        </p>
                      </div>
                      <Switch id="toggle-form-logic" />
                    </div>
                    
                    <div className="p-3 border rounded-md bg-accent/10">
                      <p className="text-sm text-muted-foreground">
                        Use the Form Canvas to set up conditional logic for individual fields.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Workflow className="h-4 w-4 mr-2" />
                        Logic Editor
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="integrations">
                <AccordionTrigger>Integrations</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                        <Database className="h-5 w-5 mb-2" />
                        <span className="text-xs">Database</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                        <Send className="h-5 w-5 mb-2" />
                        <span className="text-xs">Email Service</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                        <ShieldAlert className="h-5 w-5 mb-2" />
                        <span className="text-xs">CAPTCHA</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                        <KeyRound className="h-5 w-5 mb-2" />
                        <span className="text-xs">API Auth</span>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="ai-features">
                <AccordionTrigger>AI Features</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="toggle-smart-assist">Enable Smart Assist</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Use AI to improve form completion rates
                        </p>
                      </div>
                      <Switch 
                        id="toggle-smart-assist" 
                        checked={enableSmartAssist}
                        onCheckedChange={setEnableSmartAssist}
                      />
                    </div>
                    
                    {enableSmartAssist && (
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="toggle-smart-defaults" defaultChecked />
                          <Label htmlFor="toggle-smart-defaults">Smart Defaults</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="toggle-fatigue-detection" defaultChecked />
                          <Label htmlFor="toggle-fatigue-detection">Form Fatigue Detection</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="toggle-content-recommendations" defaultChecked />
                          <Label htmlFor="toggle-content-recommendations">Content Recommendations</Label>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="analytics">
                <AccordionTrigger>Analytics & Tracking</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="toggle-analytics">Enable Analytics</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Track form views, submissions, and completion rate
                        </p>
                      </div>
                      <Switch 
                        id="toggle-analytics" 
                        checked={enableAnalytics}
                        onCheckedChange={setEnableAnalytics}
                      />
                    </div>
                    
                    {enableAnalytics && (
                      <div className="space-y-2">
                        <Label>Tracking Options:</Label>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center space-x-2">
                            <Switch id="toggle-completion-time" defaultChecked />
                            <Label htmlFor="toggle-completion-time">Form Completion Time</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="toggle-drop-off" defaultChecked />
                            <Label htmlFor="toggle-drop-off">Field Drop-off Points</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="toggle-user-devices" defaultChecked />
                            <Label htmlFor="toggle-user-devices">User Devices & Browsers</Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
        
        <Separator />
        
        <Button onClick={handleSaveSettings} className="w-full">
          Save Settings
        </Button>
      </div>
    </ScrollArea>
  );
};
