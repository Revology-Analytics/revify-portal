import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useAuth } from "@/contexts/auth-context";
import { User } from "@/types/auth";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { getAllUsers, approveUser, rejectUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [getAllUsers]);

  const handleApprove = async (userId: string) => {
    await approveUser(userId);
    // Refresh users after approval
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
  };

  const handleReject = async (userId: string) => {
    await rejectUser(userId);
    // Refresh users after rejection
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <Button>Add User</Button>
        </div>
        <Input
          type="search"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-48">
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={48} className="animate-spin text-primary" />
              <p className="text-lg text-muted-foreground">Loading users...</p>
            </div>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'approved' ? 'success' : user.status === 'pending' ? 'secondary' : 'destructive'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {user.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => handleApprove(user.id)}>
                            Approve
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleReject(user.id)}>
                            Reject
                          </Button>
                        </>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>User Details</DialogTitle>
                            <DialogDescription>
                              View all information about this user.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="name" className="text-right font-medium leading-none text-right">
                                Name
                              </label>
                              <Input type="text" id="name" defaultValue={user.name} className="col-span-3" disabled />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="email" className="text-right font-medium leading-none text-right">
                                Email
                              </label>
                              <Input type="email" id="email" defaultValue={user.email} className="col-span-3" disabled />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="role" className="text-right font-medium leading-none text-right">
                                Role
                              </label>
                              <Input type="text" id="role" defaultValue={user.role} className="col-span-3" disabled />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="status" className="text-right font-medium leading-none text-right">
                                Status
                              </label>
                              <Input type="text" id="status" defaultValue={user.status} className="col-span-3" disabled />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="createdAt" className="text-right font-medium leading-none text-right">
                                Created At
                              </label>
                              <Input type="text" id="createdAt" defaultValue={user.createdAt} className="col-span-3" disabled />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No users found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
