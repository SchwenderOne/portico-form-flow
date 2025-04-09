
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Send, Share2, Mail, Link, QrCode, Globe, ExternalLink, Code } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import QRCodeDisplay from "@/components/distribute/QRCodeDisplay";
import EmbedCodeGenerator from "@/components/distribute/EmbedCodeGenerator";
import EmailCampaignForm from "@/components/distribute/EmailCampaignForm";
import { useBrandSettings } from "@/context/BrandSettingsContext";

const Distribute = () => {
  const { toast } = useToast();
  const { brandSettings } = useBrandSettings();
  const [formUrl, setFormUrl] = useState("https://yourform.portico.app/form-123");
  const [customDomain, setCustomDomain] = useState(false);

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: message,
    });
  };

  const shareForm = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out my form",
          text: "I created this form with Portico, please fill it out!",
          url: formUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        toast({
          title: "Sharing failed",
          description: "Could not share the form. Try copying the link instead.",
          variant: "destructive",
        });
      }
    } else {
      copyToClipboard(formUrl, "Form link copied to clipboard! Share it manually.");
    }
  };

  return (
    <AppLayout>
      <div className="container py-6 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Distribute Your Form</h1>
          <p className="text-muted-foreground mt-2">
            Share your form with your audience through various channels
          </p>
        </div>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid grid-cols-4 gap-4 mb-6">
            <TabsTrigger value="link" className="flex items-center gap-2">
              <Link size={16} />
              <span>Direct Link</span>
            </TabsTrigger>
            <TabsTrigger value="embed" className="flex items-center gap-2">
              <Code size={16} />
              <span>Embed</span>
            </TabsTrigger>
            <TabsTrigger value="qrcode" className="flex items-center gap-2">
              <QrCode size={16} />
              <span>QR Code</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail size={16} />
              <span>Email Campaign</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="link">
            <Card>
              <CardHeader>
                <CardTitle>Share Link</CardTitle>
                <CardDescription>
                  Get a direct link to your form that you can share anywhere
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="formUrl">Your form link</Label>
                    <div className="flex">
                      <Input 
                        id="formUrl"
                        value={formUrl} 
                        onChange={(e) => setFormUrl(e.target.value)}
                        className="flex-1 rounded-r-none"
                      />
                      <Button 
                        variant="outline" 
                        className="rounded-l-none border-l-0"
                        onClick={() => copyToClipboard(formUrl, "Form link copied to clipboard!")}
                      >
                        <Copy size={16} className="mr-2" /> Copy
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="custom-domain" 
                      checked={customDomain}
                      onCheckedChange={setCustomDomain}
                    />
                    <Label htmlFor="custom-domain">Use custom domain</Label>
                  </div>

                  {customDomain && (
                    <div className="pt-2 pl-6">
                      <Label htmlFor="domain">Custom domain</Label>
                      <div className="flex mt-1">
                        <Input 
                          id="domain"
                          placeholder="forms.yourdomain.com" 
                          className="flex-1 rounded-r-none"
                        />
                        <Button variant="outline" className="rounded-l-none border-l-0">
                          Set Up
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        You need to configure DNS settings for this domain.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={shareForm}>
                  <Share2 size={16} className="mr-2" /> Share
                </Button>
                <a href={formUrl} target="_blank" rel="noopener noreferrer">
                  <Button>
                    <ExternalLink size={16} className="mr-2" /> Open Form
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="embed">
            <EmbedCodeGenerator formUrl={formUrl} brandSettings={brandSettings} />
          </TabsContent>

          <TabsContent value="qrcode">
            <QRCodeDisplay formUrl={formUrl} brandColor={brandSettings.colors.primary} />
          </TabsContent>

          <TabsContent value="email">
            <EmailCampaignForm formUrl={formUrl} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Distribute;
