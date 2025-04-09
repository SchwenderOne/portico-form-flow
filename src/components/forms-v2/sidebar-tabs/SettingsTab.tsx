
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsTab = () => {
  return (
    <div className="space-y-4">
      <div className="text-sm space-y-1">
        <h3 className="font-medium">Form Settings</h3>
        <p className="text-xs text-muted-foreground">
          Configure form behavior and submission settings
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="general">
          <AccordionTrigger className="text-sm py-2">General Settings</AccordionTrigger>
          <AccordionContent className="space-y-3">
            <div className="space-y-2">
              <Label className="text-xs" htmlFor="submit-text">Submit Button Text</Label>
              <Input id="submit-text" placeholder="Submit" className="h-8 text-sm" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs" htmlFor="redirect-url">Redirect URL</Label>
              <Input id="redirect-url" placeholder="https://example.com/thank-you" className="h-8 text-sm" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="show-progress">Show Progress Bar</Label>
              <Switch id="show-progress" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs" htmlFor="thank-you">Thank You Message</Label>
              <Input id="thank-you" placeholder="Thank you for your submission!" className="h-8 text-sm" />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="notifications">
          <AccordionTrigger className="text-sm py-2">Email Notifications</AccordionTrigger>
          <AccordionContent className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="admin-email">Send Email to Admin</Label>
              <Switch id="admin-email" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs" htmlFor="admin-email-address">Admin Email</Label>
              <Input id="admin-email-address" placeholder="admin@example.com" className="h-8 text-sm" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="user-confirmation">Send Confirmation to User</Label>
              <Switch id="user-confirmation" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs" htmlFor="confirmation-subject">Confirmation Subject</Label>
              <Input id="confirmation-subject" placeholder="Thank you for your submission" className="h-8 text-sm" />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="limits">
          <AccordionTrigger className="text-sm py-2">Limits & Restrictions</AccordionTrigger>
          <AccordionContent className="space-y-3">
            <div className="space-y-2">
              <Label className="text-xs">Max Submissions Per Day</Label>
              <div className="flex items-center gap-2">
                <Slider
                  defaultValue={[100]}
                  min={1}
                  max={1000}
                  step={1}
                  className="flex-1"
                />
                <Input type="number" className="w-16 h-8" defaultValue={100} />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="require-auth">Require Authentication</Label>
              <Switch id="require-auth" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs">Form Expiry</Label>
              <Select>
                <SelectTrigger className="text-xs h-8">
                  <SelectValue placeholder="Never" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="7days">7 Days</SelectItem>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="custom">Custom Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SettingsTab;
