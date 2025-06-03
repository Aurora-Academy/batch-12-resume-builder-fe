import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { useCreateUser, useUpdateUser } from "@/hooks/useUserQuery";
import type { Role, User, UserFormProps } from "@/types/user";

export default function UserForm({ mode, user, onSuccess, onCancel }: UserFormProps) {
  const { toast } = useToast();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    isBlocked: false,
    isEmailVerified: false,
    roles: ["user"] as Role[],
  });

  const [newRole, setNewRole] = useState("");

  // Pre-populate form when editing
  useEffect(() => {
    if (mode === "edit" && user) {
      setFormData(user);
    }
  }, [mode, user]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addRole = () => {
    if (newRole.trim() && !formData.roles.includes(newRole.trim() as Role)) {
      setFormData((prev) => ({
        ...prev,
        roles: [...prev.roles, newRole.trim() as Role],
      }));
      setNewRole("");
    }
  };

  const removeRole = (roleToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.filter((role) => role !== roleToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        await createUserMutation.mutateAsync(formData);
        // Reset form after successful creation
        setFormData({
          name: "",
          email: "",
          isBlocked: false,
          isEmailVerified: false,
          roles: ["user"],
        });
      } else {
        await updateUserMutation.mutateAsync(formData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          mode === "create"
            ? "Failed to create user. Please try again."
            : "Failed to update user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    if (mode === "create") {
      setFormData({
        name: "",
        email: "",
        isBlocked: false,
        isEmailVerified: false,
        roles: ["user"],
      });
    } else if (user) {
      setFormData(user);
    }
    setNewRole("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addRole();
    }
  };

  const isSubmitting = createUserMutation.isPending || updateUserMutation.isPending;
  const isFormValid = formData.name.trim() && formData.email.trim();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{mode === "create" ? "Add New User" : "Edit User"}</CardTitle>
          <CardDescription>
            {mode === "create"
              ? "Create a new user account with the specified roles and permissions."
              : "Update user information, roles, and permissions."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Account Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Status</h3>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isEmailVerified"
                  checked={formData.isEmailVerified}
                  onCheckedChange={(checked) =>
                    handleInputChange("isEmailVerified", checked as boolean)
                  }
                  disabled={isSubmitting}
                />
                <Label htmlFor="isEmailVerified">Email Verified</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isBlocked"
                  checked={formData.isBlocked}
                  onCheckedChange={(checked) => handleInputChange("isBlocked", checked as boolean)}
                  disabled={isSubmitting}
                />
                <Label htmlFor="isBlocked">Block User</Label>
              </div>
            </div>

            {/* Roles */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Roles</h3>

              <div className="space-y-2">
                <Label htmlFor="roles">Add Role</Label>
                <div className="flex gap-2">
                  <Input
                    id="roles"
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter role name"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={addRole}
                    disabled={!newRole.trim() || isSubmitting}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {formData.roles.length > 0 && (
                <div className="space-y-2">
                  <Label>Assigned Roles</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.roles.map((role, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {role}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-muted-foreground hover:text-foreground"
                          onClick={() => removeRole(role)}
                          disabled={isSubmitting}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-2 pt-4">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                  Cancel
                </Button>
              )}
              <Button type="button" variant="outline" onClick={handleReset} disabled={isSubmitting}>
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting || !isFormValid}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting
                  ? mode === "create"
                    ? "Creating..."
                    : "Updating..."
                  : mode === "create"
                  ? "Create User"
                  : "Update User"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
