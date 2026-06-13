"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";
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
import { apiGet, apiPost, apiPut, apiDelete, apiUpload } from "@/lib/api";
import { formatPersianDate } from "@/lib/utils";
import type { Project } from "@/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<{
    title: string;
    description: string;
    completionDate: string;
  }>();

  const load = () => {
    setLoading(true);
    apiGet("/projects")
      .then(setProjects)
      .catch(() => toast.error("خطا در بارگذاری پروژه‌ها"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    try {
      const formData = new FormData();
      acceptedFiles.forEach((f) => formData.append("images", f));
      const result = await apiUpload("/upload", formData);
      setUploadedImages((prev) => [...prev, ...(result.urls || [result.url])]);
    } catch {
      toast.error("خطا در آپلود تصویر");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    multiple: true,
  });

  const openNew = () => {
    setEditing(null);
    setUploadedImages([]);
    reset({ title: "", description: "", completionDate: "" });
    setDialogOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setUploadedImages(project.images || []);
    reset({
      title: project.title,
      description: project.description,
      completionDate: project.completionDate?.split("T")[0] || "",
    });
    setDialogOpen(true);
  };

  const onSubmit = async (data: { title: string; description: string; completionDate: string }) => {
    try {
      const payload = { ...data, images: uploadedImages };
      if (editing) {
        await apiPut(`/projects/${editing.id}`, payload);
        toast.success("پروژه ویرایش شد");
      } else {
        await apiPost("/projects", payload);
        toast.success("پروژه ایجاد شد");
      }
      setDialogOpen(false);
      load();
    } catch {
      toast.error("خطا در ذخیره پروژه");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این پروژه اطمینان دارید؟")) return;
    try {
      await apiDelete(`/projects/${id}`);
      toast.success("پروژه حذف شد");
      load();
    } catch {
      toast.error("خطا در حذف پروژه");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">پروژه‌ها</h1>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 ml-1" />
          افزودن پروژه جدید
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-muted-foreground">در حال بارگذاری...</div>
          ) : projects.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">پروژه‌ای یافت نشد</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-right p-3 font-medium">عنوان</th>
                    <th className="text-right p-3 font-medium">تاریخ تکمیل</th>
                    <th className="text-left p-3 font-medium">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="p-3">{project.title}</td>
                      <td className="p-3 text-muted-foreground">
                        {project.completionDate ? formatPersianDate(project.completionDate) : "-"}
                      </td>
                      <td className="p-3 text-left">
                        <div className="flex items-center gap-1 justify-end">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(project)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
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
            <DialogTitle>{editing ? "ویرایش پروژه" : "افزودن پروژه جدید"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان</Label>
              <Input id="title" {...register("title", { required: "عنوان الزامی است" })} />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">توضیحات</Label>
              <Textarea id="description" rows={4} {...register("description", { required: "توضیحات الزامی است" })} />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>تصاویر</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-brand-500 bg-brand-50" : "border-gray-300 hover:border-brand-400"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                {isDragActive ? (
                  <p className="text-sm text-brand-600">تصاویر را رها کنید</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    تصاویر را بکشید و رها کنید یا کلیک کنید
                  </p>
                )}
              </div>
              {uploadedImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {uploadedImages.map((url, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-md overflow-hidden border">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setUploadedImages((prev) => prev.filter((_, j) => j !== i))}
                        className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {uploading && <p className="text-xs text-muted-foreground">در حال آپلود...</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="completionDate">تاریخ تکمیل</Label>
              <Input id="completionDate" type="date" {...register("completionDate")} />
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
