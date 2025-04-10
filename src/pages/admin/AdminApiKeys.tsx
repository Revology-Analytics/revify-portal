
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminApiKeys = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">API Keys Management</h1>
        <p className="text-muted-foreground">
          Manage API keys for various integrations.
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Integration Keys</h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New API Key</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New API Key</DialogTitle>
                <DialogDescription>
                  Enter the details for the new API key integration.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="service">Service</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google-drive">Google Drive</SelectItem>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="gemini">Gemini</SelectItem>
                      <SelectItem value="pinecone">Pinecone</SelectItem>
                      <SelectItem value="notion">Notion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Key Name</Label>
                  <Input id="name" placeholder="e.g. Production Google Drive" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="key">API Key</Label>
                  <Input id="key" type="password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save API Key</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              Secure keys for third-party service integrations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="py-3 px-4 text-left">Service</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Last Used</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Google Drive</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">File Upload Integration</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        Active
                      </Badge>
                    </td>
                    <td className="py-3 px-4">Today, 10:30 AM</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Notion</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">Knowledge Hub</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        Active
                      </Badge>
                    </td>
                    <td className="py-3 px-4">Yesterday, 3:45 PM</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminApiKeys;
