"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload, Star } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { apiGet, apiPost, apiPut, apiDelete, apiUpload } from "@/lib/api";
import { formatPersianDate } from "@/lib/utils";
import type { Testimonial } from "@/types";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [rating, setRating] = useState(5);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<{
    name: string;
    role: string;
    content: string;
  }>();

  const load = () => {
    setLoading(true);
    apiGet("/testimonials")
      .then(setTestimonials)
      .catch(() => toast.error("خطا در بارگذاری نظرات"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      const result = await apiUpload("/upload", formData);
      setAvatarUrl(result.url);
    } catch {
      toast.error("خطا در آپلود تصویر");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    multiple: false,
  });

  const openNew = () => {
    setEditing(null);
    setAvatarUrl(null);
    setRating(5);
    reset({ name: "", role: "", content: "" });
    setDialogOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setAvatarUrl(t.avatar);
    setRating(t.rating);
    reset({ name: t.name, role: t.role, content: t.content });
    setDialogOpen(true);
  };

  const onSubmit = async (data: { name: string; role: string; content: string }) => {
    try {
      const payload = { ...data, rating, avatar: avatarUrl };
      if (editing) {
        await apiPut(`/testimonials/${editing.id}`, payload);
        toast.success("نظر ویرایش شد");
      } else {
        await apiPost("/testimonials", payload);
        toast.success("نظر ایجاد شد");
      }
      setDialogOpen(false);
      load();
    } catch {
      toast.error("خطا در ذخیره نظر");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این نظر اطمینان دارید؟")) return;
    try {
      await apiDelete(`/testimonials/${id}`);
      toast.success("نظر حذف شد");
      load();
    } catch {
      toast.error("خطا در حذف نظر");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">نظرات</h1>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 ml-1" />
          افزودن نظر جدید
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-muted-foreground">در حال بارگذاری...</div>
          ) : testimonials.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">نظری یافت نشد</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-right p-3 font-medium">نام</th>
                    <th className="text-right p-3 font-medium">سمت</th>
                    <th className="text-right p-3 font-medium">امتیاز</th>
                    <th className="text-right p-3 font-medium">تاریخ</th>
                    <th className="text-left p-3 font-medium">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((t) => (
                    <tr key={t.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={t.avatar || undefined} />
                            <AvatarFallback>{t.name[0]}</AvatarFallback>
                          </Avatar>
                          {t.name}
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">{t.role}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">{formatPersianDate(t.createdAt)}</td>
                      <td className="p-3 text-left">
                        <div className="flex items-center gap-1 justify-end">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(t)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)}>
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
            <DialogTitle>{editing ? "ویرایش نظر" : "افزودن نظر جدید"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">نام</Label>
              <Input id="name" {...register("name", { required: "نام الزامی است" })} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">سمت</Label>
              <Input id="role" {...register("role", { required: "سمت الزامی است" })} />
              {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">متن نظر</Label>
              <Textarea id="content" rows={4} {...register("content", { required: "متن نظر الزامی است" })} />
              {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>امتیاز</Label>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button key={i} type="button" onClick={() => setRating(i + 1)}>
                    <Star
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>آواتار</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-brand-500 bg-brand-50" : "border-gray-300 hover:border-brand-400"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">کلیک کنید یا تصویر را بکشید</p>
              </div>
              {avatarUrl && (
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">تصویر آپلود شد</span>
                </div>
              )}
              {uploading && <p className="text-xs text-muted-foreground">در حال آپلود...</p>}
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
