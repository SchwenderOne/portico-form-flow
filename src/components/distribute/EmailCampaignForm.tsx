
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { Check, Upload, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailCampaignFormProps {
  formUrl: string;
}

const EmailCampaignForm: React.FC<EmailCampaignFormProps> = ({ formUrl }) => {
  const { brandSettings } = useBrandSettings();
  const { toast } = useToast();
  const [emailList, setEmailList] = useState<string>("");
  const [subject, setSubject] = useState<string>(`New form from ${brandSettings.identity.brandName}`);
  const [message, setMessage] = useState<string>(`Hello,\n\nI've created a new form that I'd like you to fill out. You can access it here: ${formUrl}\n\nThank you!`);
  const [recipientType, setRecipientType] = useState<string>("manual");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendCampaign = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Campaign Sent",
        description: "Your email campaign has been scheduled for delivery.",
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Campaign</CardTitle>
        <CardDescription>
          Send your form to multiple recipients via email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Recipients</Label>
          <RadioGroup 
            value={recipientType} 
            onValueChange={setRecipientType}
            className="flex flex-col space-y-1 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual" id="manual" />
              <Label htmlFor="manual" className="cursor-pointer">Enter email addresses manually</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upload" id="upload" />
              <Label htmlFor="upload" className="cursor-pointer">Upload CSV file</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="integration" id="integration" />
              <Label htmlFor="integration" className="cursor-pointer">Use integration (Mailchimp, etc.)</Label>
            </div>
          </RadioGroup>
        </div>
        
        {recipientType === "manual" && (
          <div>
            <Label htmlFor="email-list">Email addresses</Label>
            <Textarea 
              id="email-list"
              placeholder="Enter email addresses (one per line or comma-separated)"
              className="mt-2"
              rows={4}
              value={emailList}
              onChange={(e) => setEmailList(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter up to 100 email addresses
            </p>
          </div>
        )}

        {recipientType === "upload" && (
          <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-muted-foreground">CSV with email column (max 5MB)</p>
            </div>
          </div>
        )}

        {recipientType === "integration" && (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#FFE01B] rounded-md flex items-center justify-center mr-3">
                  <span className="text-black font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-medium">Mailchimp</h4>
                  <p className="text-sm text-muted-foreground">Connect to your mailing lists</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#4B98D3] rounded-md flex items-center justify-center mr-3 text-white">
                  <span className="font-bold">C</span>
                </div>
                <div>
                  <h4 className="font-medium">Constant Contact</h4>
                  <p className="text-sm text-muted-foreground">Import your contacts</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="subject">Email Subject</Label>
          <Input 
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="message">Email Message</Label>
          <Textarea 
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2"
            rows={6}
          />
          <p className="text-xs text-muted-foreground mt-1">
            The form URL will be automatically included in your email.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between">
        <Button 
          onClick={handleSendCampaign} 
          disabled={isLoading || (recipientType === "manual" && !emailList.trim())}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>Sending...</>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> 
              Send Campaign
            </>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
        >
          <Check className="mr-2 h-4 w-4" /> Save as Draft
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmailCampaignForm;
