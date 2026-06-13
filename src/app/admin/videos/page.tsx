"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { apiGet, apiPost, apiPut, apiDelete, apiUpload } from "@/lib/api";
import { formatPersianDate } from "@/lib/utils";
import type { Video } from "@/types";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Video | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<{
    title: string;
    url: string;
  }>();

  const load = () => {
    setLoading(true);
    apiGet("/videos")
      .then(setVideos)
      .catch(() => toast.error("خطا در بارگذاری ویدیوها"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      const result = await apiUpload("/upload", formData);
      setThumbnailUrl(result.url);
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
    setThumbnailUrl(null);
    reset({ title: "", url: "" });
    setDialogOpen(true);
  };

  const openEdit = (video: Video) => {
    setEditing(video);
    setThumbnailUrl(video.thumbnail);
    reset({ title: video.title, url: video.url });
    setDialogOpen(true);
  };

  const onSubmit = async (data: { title: string; url: string }) => {
    try {
      const payload = { ...data, thumbnail: thumbnailUrl };
      if (editing) {
        await apiPut(`/videos/${editing.id}`, payload);
        toast.success("ویدیو ویرایش شد");
      } else {
        await apiPost("/videos", payload);
        toast.success("ویدیو ایجاد شد");
      }
      setDialogOpen(false);
      load();
    } catch {
      toast.error("خطا در ذخیره ویدیو");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این ویدیو اطمینان دارید؟")) return;
    try {
      await apiDelete(`/videos/${id}`);
      toast.success("ویدیو حذف شد");
      load();
    } catch {
      toast.error("خطا در حذف ویدیو");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ویدیوها</h1>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 ml-1" />
          افزودن ویدیو جدید
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-muted-foreground">در حال بارگذاری...</div>
          ) : videos.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">ویدیویی یافت نشد</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-right p-3 font-medium">عنوان</th>
                    <th className="text-right p-3 font-medium">لینک</th>
                    <th className="text-right p-3 font-medium">تاریخ</th>
                    <th className="text-left p-3 font-medium">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video) => (
                    <tr key={video.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="p-3 font-medium">{video.title}</td>
                      <td className="p-3 text-muted-foreground max-w-[200px] truncate" dir="ltr">{video.url}</td>
                      <td className="p-3 text-muted-foreground">{formatPersianDate(video.createdAt)}</td>
                      <td className="p-3 text-left">
                        <div className="flex items-center gap-1 justify-end">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(video)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(video.id)}>
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
            <DialogTitle>{editing ? "ویرایش ویدیو" : "افزودن ویدیو جدید"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان</Label>
              <Input id="title" {...register("title", { required: "عنوان الزامی است" })} />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">لینک ویدیو</Label>
              <Input id="url" type="url" dir="ltr" placeholder="https://..." {...register("url", { required: "لینک الزامی است" })} />
              {errors.url && <p className="text-sm text-destructive">{errors.url.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>تصویر بندانگشتی</Label>
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
              {thumbnailUrl && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="relative w-20 h-12 rounded overflow-hidden border">
                    <img src={thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  </div>
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
