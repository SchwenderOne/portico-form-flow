
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { usePorto } from "./context/PortoContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const PortoSettings: React.FC = () => {
  const {
    formTitle,
    setFormTitle,
    formDescription,
    setFormDescription,
    saveForm,
  } = usePorto();

  const [formSettings, setFormSettings] = React.useState({
    redirectAfterSubmit: false,
    redirectUrl: "",
    collectEmailAddresses: true,
    sendConfirmationEmail: false,
    limitResponses: false,
    responseLimit: 100,
    submitButtonText: "Submit",
    showProgressBar: true,
    dataRetentionPeriod: "365",
    gdprEnabled: true,
    privacyPolicyUrl: "",
  });

  const handleChange = (key: keyof typeof formSettings, value: any) => {
    setFormSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    saveForm();
    toast.success("Form settings saved successfully");
  };

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Form Settings</h2>
          <p className="text-muted-foreground">
            Configure settings for your form, including submission behavior and privacy options.
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Compliance</TabsTrigger>
            <TabsTrigger value="customization">Customization</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Basic information about your form
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="form-title">Form Title</Label>
                  <Input
                    id="form-title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="form-description">Form Description</Label>
                  <Textarea
                    id="form-description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="submit-button-text">Submit Button Text</Label>
                  <Input
                    id="submit-button-text"
                    value={formSettings.submitButtonText}
                    onChange={(e) => handleChange("submitButtonText", e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-progress-bar">Show Progress Bar</Label>
                  <Switch
                    id="show-progress-bar"
                    checked={formSettings.showProgressBar}
                    onCheckedChange={(checked) => handleChange("showProgressBar", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>Submission Settings</CardTitle>
                <CardDescription>
                  Configure what happens when users submit the form
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="redirect-after-submit">Redirect After Submit</Label>
                  <Switch
                    id="redirect-after-submit"
                    checked={formSettings.redirectAfterSubmit}
                    onCheckedChange={(checked) => handleChange("redirectAfterSubmit", checked)}
                  />
                </div>
                {formSettings.redirectAfterSubmit && (
                  <div className="space-y-2">
                    <Label htmlFor="redirect-url">Redirect URL</Label>
                    <Input
                      id="redirect-url"
                      value={formSettings.redirectUrl}
                      onChange={(e) => handleChange("redirectUrl", e.target.value)}
                      placeholder="https://example.com/thank-you"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <Label htmlFor="collect-email">Collect Email Addresses</Label>
                  <Switch
                    id="collect-email"
                    checked={formSettings.collectEmailAddresses}
                    onCheckedChange={(checked) => handleChange("collectEmailAddresses", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="send-confirmation">Send Confirmation Email</Label>
                  <Switch
                    id="send-confirmation"
                    checked={formSettings.sendConfirmationEmail}
                    onCheckedChange={(checked) => handleChange("sendConfirmationEmail", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="limit-responses">Limit Responses</Label>
                  <Switch
                    id="limit-responses"
                    checked={formSettings.limitResponses}
                    onCheckedChange={(checked) => handleChange("limitResponses", checked)}
                  />
                </div>
                {formSettings.limitResponses && (
                  <div className="space-y-2">
                    <Label htmlFor="response-limit">Response Limit</Label>
                    <Input
                      id="response-limit"
                      type="number"
                      value={formSettings.responseLimit}
                      onChange={(e) => handleChange("responseLimit", Number(e.target.value))}
                      min={1}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Compliance</CardTitle>
                <CardDescription>
                  Data privacy and compliance settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                  <Select 
                    value={formSettings.dataRetentionPeriod} 
                    onValueChange={(value) => handleChange("dataRetentionPeriod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="730">2 years</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="gdpr-enabled">GDPR Compliance</Label>
                  <Switch
                    id="gdpr-enabled"
                    checked={formSettings.gdprEnabled}
                    onCheckedChange={(checked) => handleChange("gdprEnabled", checked)}
                  />
                </div>
                {formSettings.gdprEnabled && (
                  <div className="space-y-2">
                    <Label htmlFor="privacy-policy-url">Privacy Policy URL</Label>
                    <Input
                      id="privacy-policy-url"
                      value={formSettings.privacyPolicyUrl}
                      onChange={(e) => handleChange("privacyPolicyUrl", e.target.value)}
                      placeholder="https://example.com/privacy-policy"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customization">
            <Card>
              <CardHeader>
                <CardTitle>Form Customization</CardTitle>
                <CardDescription>
                  Customize the appearance of your form
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Use the Theme tab in the sidebar editor to customize the appearance of your form.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => toast.info("Theme customization is available in the sidebar")}
                >
                  Open Theme Editor
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </div>
      </div>
    </div>
  );
};
