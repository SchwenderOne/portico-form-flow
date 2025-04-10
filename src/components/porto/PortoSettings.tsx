
import React, { useState } from "react";
import { usePorto } from "./context/PortoContext";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Settings, 
  User, 
  Clock, 
  Shield, 
  Server, 
  Users, 
  Bell, 
  Languages,
  FileJson
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const PortoSettings: React.FC = () => {
  const { setActiveSection, formTitle, formDescription } = usePorto();
  const [activeTab, setActiveTab] = useState("general");
  
  const [formData, setFormData] = useState({
    formTitle,
    formDescription,
    owner: "Current User",
    createdAt: new Date().toLocaleDateString(),
    lastEdited: new Date().toLocaleDateString(),
    publishStatus: "Draft",
    autoSave: true,
    versionHistory: true,
    dataPrivacy: "High",
    dataRetention: "90 days",
    gdprCompliant: true,
    formLocking: false,
    accessControl: "Team Members",
    notifications: true,
    languageSupport: ["English"],
  });
  
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
    setActiveSection("editor");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-12 border-b flex items-center justify-between px-4 bg-background">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setActiveSection("editor")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Editor
          </Button>
        </div>
        
        <h2 className="font-medium text-base flex items-center">
          <Settings className="h-4 w-4 mr-2" />
          Form Settings
        </h2>
        
        <div className="flex-1"></div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex">
            <div className="w-64 pr-4 shrink-0">
              <TabsList className="flex flex-col w-full h-auto space-y-1">
                <TabsTrigger value="general" className="justify-start w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger value="users" className="justify-start w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Access Control
                </TabsTrigger>
                <TabsTrigger value="history" className="justify-start w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Version History
                </TabsTrigger>
                <TabsTrigger value="privacy" className="justify-start w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy & Compliance
                </TabsTrigger>
                <TabsTrigger value="integration" className="justify-start w-full">
                  <Server className="h-4 w-4 mr-2" />
                  Integrations
                </TabsTrigger>
                <TabsTrigger value="notifications" className="justify-start w-full">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="localization" className="justify-start w-full">
                  <Languages className="h-4 w-4 mr-2" />
                  Localization
                </TabsTrigger>
                <TabsTrigger value="advanced" className="justify-start w-full">
                  <FileJson className="h-4 w-4 mr-2" />
                  Advanced
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1">
              <Card>
                <TabsContent value="general" className="m-0">
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure basic form settings and metadata
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="formTitle">Form Title</Label>
                        <Input 
                          id="formTitle" 
                          value={formData.formTitle}
                          onChange={(e) => setFormData({...formData, formTitle: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="formDescription">Form Description</Label>
                        <Input 
                          id="formDescription" 
                          value={formData.formDescription}
                          onChange={(e) => setFormData({...formData, formDescription: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Form Information</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Owner</p>
                          <p className="text-sm font-medium">{formData.owner}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Created</p>
                          <p className="text-sm font-medium">{formData.createdAt}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Last Edited</p>
                          <p className="text-sm font-medium">{formData.lastEdited}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Status</p>
                          <p className="text-sm font-medium">{formData.publishStatus}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Options</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="autosave" className="text-sm">Auto-Save</Label>
                          <p className="text-xs text-muted-foreground">
                            Automatically save changes as you edit
                          </p>
                        </div>
                        <Switch 
                          id="autosave" 
                          checked={formData.autoSave}
                          onCheckedChange={(checked) => setFormData({...formData, autoSave: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="versionHistory" className="text-sm">Version History</Label>
                          <p className="text-xs text-muted-foreground">
                            Track changes and maintain previous versions
                          </p>
                        </div>
                        <Switch 
                          id="versionHistory" 
                          checked={formData.versionHistory}
                          onCheckedChange={(checked) => setFormData({...formData, versionHistory: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="formLocking" className="text-sm">Form Locking</Label>
                          <p className="text-xs text-muted-foreground">
                            Prevent other users from editing simultaneously
                          </p>
                        </div>
                        <Switch 
                          id="formLocking" 
                          checked={formData.formLocking}
                          onCheckedChange={(checked) => setFormData({...formData, formLocking: checked})}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveSection("editor")}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveSettings}>
                      Save Changes
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="users" className="m-0">
                  <CardHeader>
                    <CardTitle>Access Control</CardTitle>
                    <CardDescription>
                      Manage who can view and edit this form
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Current User</p>
                          <p className="text-xs text-muted-foreground">Owner</p>
                        </div>
                      </div>
                      <Button size="sm" variant="secondary" disabled>
                        Owner
                      </Button>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Team Member 1</p>
                          <p className="text-xs text-muted-foreground">Editor</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Change
                      </Button>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Team Member 2</p>
                          <p className="text-xs text-muted-foreground">Viewer</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Change
                      </Button>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        <Users className="h-4 w-4 mr-2" />
                        Add Team Members
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings} className="w-full">
                      Save Changes
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="privacy" className="m-0">
                  <CardHeader>
                    <CardTitle>Privacy & Compliance</CardTitle>
                    <CardDescription>
                      Configure data privacy and regulatory compliance settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="gdprCompliant" className="text-sm">GDPR Compliance</Label>
                        <p className="text-xs text-muted-foreground">
                          Enable features required for GDPR compliance
                        </p>
                      </div>
                      <Switch 
                        id="gdprCompliant" 
                        checked={formData.gdprCompliant}
                        onCheckedChange={(checked) => setFormData({...formData, gdprCompliant: checked})}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="dataRetention">Data Retention Period</Label>
                      <select
                        id="dataRetention"
                        className="w-full h-9 rounded-md border border-input px-3"
                        value={formData.dataRetention}
                        onChange={(e) => setFormData({...formData, dataRetention: e.target.value})}
                      >
                        <option value="30 days">30 days</option>
                        <option value="90 days">90 days</option>
                        <option value="1 year">1 year</option>
                        <option value="3 years">3 years</option>
                        <option value="Indefinite">Indefinite</option>
                      </select>
                      <p className="text-xs text-muted-foreground">
                        How long form submission data will be stored
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="dataPrivacy">Data Privacy Level</Label>
                      <select
                        id="dataPrivacy"
                        className="w-full h-9 rounded-md border border-input px-3"
                        value={formData.dataPrivacy}
                        onChange={(e) => setFormData({...formData, dataPrivacy: e.target.value})}
                      >
                        <option value="Standard">Standard</option>
                        <option value="High">High</option>
                        <option value="Maximum">Maximum</option>
                      </select>
                      <p className="text-xs text-muted-foreground">
                        Controls encryption and access restrictions
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 rounded-md p-3 flex items-start">
                      <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="ml-2 text-sm">
                        <p className="font-medium">Privacy Scan Results</p>
                        <p className="text-muted-foreground text-xs mt-1">
                          Your form is configured for GDPR compliance and high data privacy. No issues detected.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings} className="w-full">
                      Save Privacy Settings
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                {/* Placeholder content for other tabs */}
                {["history", "integration", "notifications", "localization", "advanced"].map(tab => (
                  <TabsContent key={tab} value={tab} className="m-0">
                    <CardHeader>
                      <CardTitle>{tab.charAt(0).toUpperCase() + tab.slice(1)} Settings</CardTitle>
                      <CardDescription>
                        Configure {tab} settings for your form
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px] flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-muted-foreground mb-2">
                          {tab.charAt(0).toUpperCase() + tab.slice(1)} settings panel
                        </p>
                        <Button onClick={handleSaveSettings}>
                          Save Settings
                        </Button>
                      </div>
                    </CardContent>
                  </TabsContent>
                ))}
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
