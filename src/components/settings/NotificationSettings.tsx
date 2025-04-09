
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const NotificationSettings = () => {
  const handleSaveNotifications = () => {
    toast.success("Notification settings saved", {
      description: "Your notification preferences have been updated"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure how and when you receive notifications
        </p>
      </div>

      <Separator />

      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-medium mb-4">Email Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="form-submissions">Form Submissions</Label>
                <p className="text-xs text-muted-foreground">
                  Receive email notifications when users submit form responses
                </p>
              </div>
              <Switch id="form-submissions" defaultChecked={true} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="team-changes">Team Changes</Label>
                <p className="text-xs text-muted-foreground">
                  Get notified when team members are added or removed
                </p>
              </div>
              <Switch id="team-changes" defaultChecked={true} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="form-edits">Form Edits</Label>
                <p className="text-xs text-muted-foreground">
                  Get notified when someone edits a form you own
                </p>
              </div>
              <Switch id="form-edits" defaultChecked={false} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-xs text-muted-foreground">
                  Receive updates about new features and product tips
                </p>
              </div>
              <Switch id="marketing-emails" defaultChecked={false} />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-4">In-App Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="comments">Comments and Mentions</Label>
                <p className="text-xs text-muted-foreground">
                  Get notified when you're mentioned or receive a comment
                </p>
              </div>
              <Switch id="comments" defaultChecked={true} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="form-activity">Form Activity</Label>
                <p className="text-xs text-muted-foreground">
                  See notifications for form views and submissions
                </p>
              </div>
              <Switch id="form-activity" defaultChecked={true} />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-4">Notification Frequency</h4>
          <RadioGroup defaultValue="immediate">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="immediate" id="immediate" />
              <div className="grid gap-1.5">
                <Label htmlFor="immediate">Immediate</Label>
                <p className="text-xs text-muted-foreground">
                  Receive notifications as events happen
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <div className="grid gap-1.5">
                <Label htmlFor="daily">Daily Digest</Label>
                <p className="text-xs text-muted-foreground">
                  Receive a daily summary of all notifications
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <div className="grid gap-1.5">
                <Label htmlFor="weekly">Weekly Digest</Label>
                <p className="text-xs text-muted-foreground">
                  Receive a weekly summary of all notifications
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveNotifications}>Save Preferences</Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
