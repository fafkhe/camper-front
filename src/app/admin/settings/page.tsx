"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { apiGet, apiPut } from "@/lib/api";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [contents, setContents] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      const data = await apiGet("/site-content");
      const map: Record<string, string> = {};
      data.forEach((item: any) => {
        map[item.key] = item.value;
      });
      setContents(map);
    } catch {
      toast.error("خطا در بارگذاری تنظیمات");
    } finally {
      setLoading(false);
    }
  }

  async function saveContent(key: string, value: string) {
    try {
      await apiPut(`/site-content/${key}`, { value });
      toast.success("تنظیمات با موفقیت ذخیره شد");
    } catch {
      toast.error("خطا در ذخیره تنظیمات");
    }
  }

  const fields = [
    { key: "hero_title", label: "عنوان هدر", type: "text" },
    { key: "hero_subtitle", label: "زیرنویس هدر", type: "text" },
    { key: "about_text", label: "متن درباره ما", type: "textarea" },
    { key: "phone", label: "شماره تلفن", type: "text" },
    { key: "whatsapp", label: "واتساپ", type: "text" },
    { key: "instagram", label: "اینستاگرام", type: "text" },
    { key: "address", label: "آدرس", type: "textarea" },
  ];

  if (loading) return <div className="p-8 text-center">در حال بارگذاری...</div>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">تنظیمات سایت</h1>
        <p className="text-muted-foreground">مدیریت محتوای سایت</p>
      </div>

      <div className="grid gap-6">
        {fields.map((field) => (
          <Card key={field.key}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{field.label}</CardTitle>
            </CardHeader>
            <CardContent>
              {field.type === "textarea" ? (
                <Textarea
                  value={contents[field.key] || ""}
                  onChange={(e) =>
                    setContents({ ...contents, [field.key]: e.target.value })
                  }
                  rows={4}
                />
              ) : (
                <Input
                  value={contents[field.key] || ""}
                  onChange={(e) =>
                    setContents({ ...contents, [field.key]: e.target.value })
                  }
                />
              )}
              <Button
                className="mt-2"
                size="sm"
                onClick={() => saveContent(field.key, contents[field.key] || "")}
              >
                <Save className="ml-2 h-4 w-4" />
                ذخیره
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
