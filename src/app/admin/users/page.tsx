"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Shield, ShieldOff, Ban, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import { formatPersianDate } from "@/lib/utils";
import type { User } from "@/types";

const roleLabels: Record<string, string> = {
  ADMIN: "مدیر",
  USER: "کاربر",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "فعال",
  INACTIVE: "غیرفعال",
  BLOCKED: "مسدود",
};

const statusVariants: Record<string, "default" | "secondary" | "destructive"> = {
  ACTIVE: "default",
  INACTIVE: "secondary",
  BLOCKED: "destructive",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("USER");
  const [selectedStatus, setSelectedStatus] = useState<string>("ACTIVE");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<{
    name: string;
    email: string;
    phone: string;
    password: string;
  }>();

  const load = () => {
    setLoading(true);
    apiGet("/users")
      .then(setUsers)
      .catch(() => toast.error("خطا در بارگذاری کاربران"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setSelectedRole("USER");
    setSelectedStatus("ACTIVE");
    reset({ name: "", email: "", phone: "", password: "" });
    setDialogOpen(true);
  };

  const openEdit = (u: User) => {
    setEditing(u);
    setSelectedRole(u.role);
    setSelectedStatus(u.status);
    reset({ name: u.name, email: u.email, phone: u.phone, password: "" });
    setDialogOpen(true);
  };

  const onSubmit = async (data: { name: string; email: string; phone: string; password: string }) => {
    try {
      const payload = { ...data, role: selectedRole, status: selectedStatus };
      if (editing) {
        if (!payload.password) delete (payload as any).password;
        await apiPut(`/users/${editing.id}`, payload);
        toast.success("کاربر ویرایش شد");
      } else {
        await apiPost("/users", payload);
        toast.success("کاربر ایجاد شد");
      }
      setDialogOpen(false);
      load();
    } catch {
      toast.error("خطا در ذخیره کاربر");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این کاربر اطمینان دارید؟")) return;
    try {
      await apiDelete(`/users/${id}`);
      toast.success("کاربر حذف شد");
      load();
    } catch {
      toast.error("خطا در حذف کاربر");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">کاربران</h1>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 ml-1" />
          افزودن کاربر جدید
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-muted-foreground">در حال بارگذاری...</div>
          ) : users.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">کاربری یافت نشد</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-right p-3 font-medium">نام</th>
                    <th className="text-right p-3 font-medium">ایمیل</th>
                    <th className="text-right p-3 font-medium">تلفن</th>
                    <th className="text-right p-3 font-medium">نقش</th>
                    <th className="text-right p-3 font-medium">وضعیت</th>
                    <th className="text-right p-3 font-medium">تاریخ</th>
                    <th className="text-left p-3 font-medium">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="p-3 font-medium">{u.name}</td>
                      <td className="p-3 text-muted-foreground">{u.email}</td>
                      <td className="p-3 text-muted-foreground">{u.phone}</td>
                      <td className="p-3">
                        <Badge variant={u.role === "ADMIN" ? "default" : "secondary"}>
                          {u.role === "ADMIN" ? <Shield className="w-3 h-3 ml-1 inline" /> : <ShieldOff className="w-3 h-3 ml-1 inline" />}
                          {roleLabels[u.role]}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant={statusVariants[u.status]}>
                          {u.status === "ACTIVE" ? <CheckCircle className="w-3 h-3 ml-1 inline" /> : u.status === "BLOCKED" ? <Ban className="w-3 h-3 ml-1 inline" /> : null}
                          {statusLabels[u.status]}
                        </Badge>
                      </td>
                      <td className="p-3 text-muted-foreground">{formatPersianDate(u.createdAt)}</td>
                      <td className="p-3 text-left">
                        <div className="flex items-center gap-1 justify-end">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(u)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(u.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "ویرایش کاربر" : "افزودن کاربر جدید"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">نام</Label>
              <Input id="name" {...register("name", { required: "نام الزامی است" })} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" type="email" {...register("email", { required: "ایمیل الزامی است" })} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">تلفن</Label>
              <Input id="phone" {...register("phone", { required: "تلفن الزامی است" })} />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{editing ? "رمز عبور (خالی بگذارید بدون تغییر)" : "رمز عبور"}</Label>
              <Input id="password" type="password" {...register("password", editing ? {} : { required: "رمز عبور الزامی است" })} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نقش</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">کاربر</SelectItem>
                    <SelectItem value="ADMIN">مدیر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>وضعیت</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">فعال</SelectItem>
                    <SelectItem value="INACTIVE">غیرفعال</SelectItem>
                    <SelectItem value="BLOCKED">مسدود</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editing ? "ویرایش" : "افزودن"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
