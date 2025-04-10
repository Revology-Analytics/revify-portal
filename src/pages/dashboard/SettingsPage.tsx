
import React, { useState } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    appearance: {
      theme: "light",
      reducedMotion: false,
      sidebarCollapsed: false,
    },
    notifications: {
      email: true,
      push: true,
      updates: true,
    },
  });

  const handleSave = () => {
    // In a real app, you would save these settings to a backend
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and set preferences.
          </p>
        </div>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the dashboard looks and feels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant={settings.appearance.theme === "light" ? "default" : "outline"}
                      onClick={() => setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, theme: "light" }
                      })}
                    >
                      Light
                    </Button>
                    <Button 
                      variant={settings.appearance.theme === "dark" ? "default" : "outline"}
                      onClick={() => setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, theme: "dark" }
                      })}
                    >
                      Dark
                    </Button>
                    <Button 
                      variant={settings.appearance.theme === "system" ? "default" : "outline"}
                      onClick={() => setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, theme: "system" }
                      })}
                    >
                      System
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sidebar">Collapsed Sidebar</Label>
                    <p className="text-sm text-muted-foreground">
                      Show only icons in the sidebar.
                    </p>
                  </div>
                  <Switch
                    id="sidebar"
                    checked={settings.appearance.sidebarCollapsed}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, sidebarCollapsed: checked }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="motion">Reduced Motion</Label>
                    <p className="text-sm text-muted-foreground">
                      Disable animations for accessibility.
                    </p>
                  </div>
                  <Switch
                    id="motion"
                    checked={settings.appearance.reducedMotion}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, reducedMotion: checked }
                    })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure how you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your account activity.
                    </p>
                  </div>
                  <Switch
                    id="email"
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, email: checked }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in your browser.
                    </p>
                  </div>
                  <Switch
                    id="push"
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, push: checked }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="updates">Product Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about product updates.
                    </p>
                  </div>
                  <Switch
                    id="updates"
                    checked={settings.notifications.updates}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, updates: checked }
                    })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Account settings will be added here.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
