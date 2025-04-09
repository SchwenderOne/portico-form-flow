
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Camera, Upload } from "lucide-react";

const AccountSettings = () => {
  const [displayName, setDisplayName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@example.com");
  const [jobTitle, setJobTitle] = useState("Product Manager");
  const [company, setCompany] = useState("Acme Inc.");

  const handleUpdateProfile = () => {
    toast.success("Profile updated", {
      description: "Your account information has been saved successfully"
    });
  };

  const handleUploadAvatar = () => {
    toast.info("Avatar upload initiated", {
      description: "Please select an image to use as your profile picture"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-sm text-muted-foreground">
          Update your account information and profile settings
        </p>
      </div>

      <Separator />

      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              variant="secondary" 
              onClick={handleUploadAvatar}
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
            >
              <Camera className="h-4 w-4" />
              <span className="sr-only">Upload avatar</span>
            </Button>
          </div>
          <div>
            <h4 className="text-base font-medium">{displayName}</h4>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="display-name">Display Name</Label>
            <Input 
              id="display-name" 
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)} 
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="job-title">Job Title</Label>
            <Input 
              id="job-title" 
              value={jobTitle} 
              onChange={(e) => setJobTitle(e.target.value)} 
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="company">Company/Organization</Label>
            <Input 
              id="company" 
              value={company} 
              onChange={(e) => setCompany(e.target.value)} 
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleUpdateProfile}>Update Profile</Button>
      </div>
    </div>
  );
};

export default AccountSettings;
