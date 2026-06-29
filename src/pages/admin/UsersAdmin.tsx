import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Shield, Trash2, UserPlus } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MASTER_EMAIL = "subashkanagamani3107@gmail.com";

type AdminUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  roles: string[];
};

export default function UsersAdmin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isMaster = (user?.email ?? "").toLowerCase() === MASTER_EMAIL;

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newIsAdmin, setNewIsAdmin] = useState(false);
  const [creating, setCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("admin_list_users");
    if (error) {
      toast({ variant: "destructive", title: "Failed to load users", description: error.message });
    } else {
      setUsers((data as AdminUser[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isMaster) load();
    else setLoading(false);
  }, [isMaster]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 10) {
      toast({ variant: "destructive", title: "Weak password", description: "Use at least 10 characters." });
      return;
    }
    setCreating(true);
    const { data, error } = await supabase.functions.invoke("admin-create-user", {
      body: { email: newEmail, password: newPassword, full_name: newFullName, make_admin: newIsAdmin },
    });
    setCreating(false);
    if (error || (data as any)?.error) {
      toast({
        variant: "destructive",
        title: "Could not create user",
        description: (data as any)?.message || (data as any)?.error || error?.message,
      });
      return;
    }
    toast({ title: "User created", description: `${newEmail} can now sign in.` });
    setNewEmail(""); setNewPassword(""); setNewFullName(""); setNewIsAdmin(false);
    load();
  };

  const grant = async (userId: string) => {
    setBusyId(userId);
    const { error } = await supabase.rpc("admin_grant_role", { _user_id: userId, _role: "admin" });
    setBusyId(null);
    if (error) toast({ variant: "destructive", title: "Failed", description: error.message });
    else { toast({ title: "Admin granted" }); load(); }
  };

  const revoke = async (userId: string) => {
    setBusyId(userId);
    const { error } = await supabase.rpc("admin_revoke_role", { _user_id: userId, _role: "admin" });
    setBusyId(null);
    if (error) toast({ variant: "destructive", title: "Failed", description: error.message });
    else { toast({ title: "Admin revoked" }); load(); }
  };

  const remove = async (userId: string) => {
    setBusyId(userId);
    const { data, error } = await supabase.functions.invoke("admin-delete-user", { body: { user_id: userId } });
    setBusyId(null);
    if (error || (data as any)?.error) {
      toast({
        variant: "destructive", title: "Delete failed",
        description: (data as any)?.message || (data as any)?.error || error?.message,
      });
      return;
    }
    toast({ title: "User deleted" });
    load();
  };

  if (!isMaster) {
    return (
      <AdminLayout>
        <Card>
          <CardContent className="py-12 text-center">
            <Shield className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Master admin only</h2>
            <p className="text-muted-foreground">
              Only the site owner can manage user accounts.
            </p>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-3xl font-bold">Users & Access</h1>
          <p className="text-muted-foreground">
            Only you ({MASTER_EMAIL}) can create accounts or grant admin access. Sign-ups are disabled site-wide.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5" /> Create teammate</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nu-name">Full name</Label>
                <Input id="nu-name" value={newFullName} onChange={(e) => setNewFullName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nu-email">Email</Label>
                <Input id="nu-email" type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nu-pw">Temporary password (min 10 chars)</Label>
                <Input id="nu-pw" type="text" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div className="flex items-end gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="nu-admin" checked={newIsAdmin} onCheckedChange={(v) => setNewIsAdmin(!!v)} />
                  <Label htmlFor="nu-admin" className="cursor-pointer">Grant admin access</Label>
                </div>
              </div>
              <div className="md:col-span-2">
                <Button type="submit" disabled={creating}>
                  {creating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create user
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All accounts ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 flex justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b">
                      <th className="py-2 pr-4">Email</th>
                      <th className="py-2 pr-4">Roles</th>
                      <th className="py-2 pr-4">Last sign-in</th>
                      <th className="py-2 pr-4">Created</th>
                      <th className="py-2 pr-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => {
                      const isMasterRow = u.email.toLowerCase() === MASTER_EMAIL;
                      const isAdmin = u.roles.includes("admin");
                      const busy = busyId === u.id;
                      return (
                        <tr key={u.id} className="border-b last:border-0">
                          <td className="py-3 pr-4">
                            <div className="font-medium break-all">{u.email}</div>
                            {!u.email_confirmed_at && <Badge variant="outline" className="mt-1">unverified</Badge>}
                          </td>
                          <td className="py-3 pr-4">
                            {isMasterRow && <Badge className="mr-1">master</Badge>}
                            {isAdmin && !isMasterRow && <Badge variant="secondary">admin</Badge>}
                            {!isAdmin && !isMasterRow && <span className="text-muted-foreground">user</span>}
                          </td>
                          <td className="py-3 pr-4 text-muted-foreground">
                            {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString() : "never"}
                          </td>
                          <td className="py-3 pr-4 text-muted-foreground">
                            {new Date(u.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 pr-4 text-right space-x-2 whitespace-nowrap">
                            {!isMasterRow && (isAdmin ? (
                              <Button size="sm" variant="outline" disabled={busy} onClick={() => revoke(u.id)}>
                                Revoke admin
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" disabled={busy} onClick={() => grant(u.id)}>
                                Make admin
                              </Button>
                            ))}
                            {!isMasterRow && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="destructive" disabled={busy}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete {u.email}?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This permanently removes the account. They will lose all access immediately.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => remove(u.id)}>Delete</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
