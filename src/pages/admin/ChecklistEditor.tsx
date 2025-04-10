
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardSidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CheckSquare, Plus, Trash, ArrowLeft } from "lucide-react";

const ChecklistEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const isEditing = !!id;

  // State for checklist data
  const [title, setTitle] = useState(isEditing ? "New Client Onboarding" : "");
  const [description, setDescription] = useState(
    isEditing ? "Standard onboarding process for new clients" : ""
  );
  const [items, setItems] = useState(
    isEditing
      ? [
          {
            id: "1",
            text: "Collect client information",
            description: "Gather basic contact and business details",
            required: true,
          },
          {
            id: "2",
            text: "Set up initial meeting",
            description: "Schedule kickoff call with the client",
            required: true,
          },
          {
            id: "3",
            text: "Document requirements",
            description: "Capture detailed project requirements",
            required: false,
          },
        ]
      : []
  );

  // Add a new checklist item
  const addChecklistItem = () => {
    setItems([
      ...items,
      {
        id: `item-${items.length + 1}`,
        text: "",
        description: "",
        required: false,
      },
    ]);
  };

  // Remove a checklist item
  const removeChecklistItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Update a checklist item
  const updateChecklistItem = (id: string, field: string, value: any) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Handle save
  const handleSave = () => {
    // Here would be API calls to save the checklist
    toast({
      title: "Checklist saved",
      description: `${isEditing ? "Updated" : "Created"} checklist "${title}"`,
    });
    navigate("/admin/checklists");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/checklists")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? "Edit Checklist" : "Create New Checklist"}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Checklist Details</CardTitle>
            <CardDescription>
              Define the basic information for this checklist
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium leading-none"
              >
                Checklist Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter checklist title"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium leading-none"
              >
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter checklist description"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Checklist Items</CardTitle>
            <CardDescription>
              Add items that need to be completed in this checklist
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No items added yet. Click the button below to add your first
                item.
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 space-y-3 relative"
                >
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeChecklistItem(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      Item {index + 1}
                    </label>
                    <Input
                      value={item.text}
                      onChange={(e) =>
                        updateChecklistItem(item.id, "text", e.target.value)
                      }
                      placeholder="Enter task title"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      Description
                    </label>
                    <Textarea
                      value={item.description}
                      onChange={(e) =>
                        updateChecklistItem(
                          item.id,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Enter task description"
                      className="h-20"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`required-${item.id}`}
                      checked={item.required}
                      onChange={(e) =>
                        updateChecklistItem(
                          item.id,
                          "required",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label
                      htmlFor={`required-${item.id}`}
                      className="text-sm font-medium"
                    >
                      Required item
                    </label>
                  </div>
                </div>
              ))
            )}

            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={addChecklistItem}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Checklist Item
            </Button>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 pt-2">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/checklists")}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Checklist</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ChecklistEditor;
