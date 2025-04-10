
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Camera, Blocks, Settings, Key, User, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    toast.success("Profile updated", {
      description: "Your profile information has been saved successfully"
    });
  };

  const handleUploadAvatar = () => {
    toast.info("Avatar upload initiated", {
      description: "Please select an image to use as your profile picture"
    });
  };

  const navigateToBlocksLibrary = () => {
    navigate("/blocks-library");
  };

  // Get the initials for avatar
  const getInitials = () => {
    if (profile?.display_name) {
      return profile.display_name.charAt(0).toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || "U";
  };

  if (!user) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
          <Button onClick={() => navigate("/auth")}>
            Go to Login
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your profile, settings, and tools
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Profile & Tools</CardTitle>
              <CardDescription>
                Manage your account and access developer tools
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TabsList className="grid w-full grid-cols-4 gap-4 p-4">
                <TabsTrigger 
                  value="profile"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="preferences"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Preferences
                </TabsTrigger>
                <TabsTrigger 
                  value="security"
                  className="flex items-center gap-2"
                >
                  <Key className="h-4 w-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger 
                  value="tools"
                  className="flex items-center gap-2"
                >
                  <Blocks className="h-4 w-4" />
                  Developer Tools
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <TabsContent value="profile" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Profile Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your account information and profile settings
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="h-20 w-20">
                          <AvatarFallback>{getInitials()}</AvatarFallback>
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
                        <h4 className="text-base font-medium">{displayName || "User"}</h4>
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
                          disabled
                        />
                        <p className="text-xs text-muted-foreground">
                          Your email is used for authentication and cannot be changed here.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleUpdateProfile}>Update Profile</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preferences" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">User Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      Customize your application experience
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Preference settings coming soon.</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Security Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your account security and authentication
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Button variant="outline" onClick={() => navigate("/security")}>
                      Go to Security Settings
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tools" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Developer Tools</h3>
                    <p className="text-sm text-muted-foreground">
                      Access development resources and utilities
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={navigateToBlocksLibrary}>
                      <div className="flex items-center gap-3 mb-2">
                        <Blocks className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Blocks & Components Library</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Browse and use pre-built components and blocks for your forms
                      </p>
                    </div>
                    
                    {/* Additional tools can be added here in the future */}
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;
