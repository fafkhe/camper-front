"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderOpen,
  ClipboardList,
  Eye,
  MessageSquare,
  Plus,
  ArrowLeft,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiGet } from "@/lib/api";
import { formatPersianDate } from "@/lib/utils";
import type { ConsultationRequest } from "@/types";

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  PENDING: { label: "در انتظار", variant: "secondary" },
  CONTACTED: { label: "تماس گرفته شده", variant: "default" },
  COMPLETED: { label: "تکمیل شده", variant: "outline" },
};

export default function AdminDashboardPage() {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/requests")
      .then((data) => setRequests(data.slice(0, 5)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "کل پروژه‌ها", value: "۲۴", icon: FolderOpen, color: "text-blue-600 bg-blue-100", change: "+۳", changeType: "up" },
    { label: "درخواست‌های جدید", value: requests.filter((r) => r.status === "PENDING").length.toString(), icon: ClipboardList, color: "text-orange-600 bg-orange-100", change: "+۲", changeType: "up" },
    { label: "بازدید امروز", value: "۱۵۶", icon: Eye, color: "text-green-600 bg-green-100", change: "+۱۲٪", changeType: "up" },
    { label: "نظرات جدید", value: "۷", icon: MessageSquare, color: "text-purple-600 bg-purple-100", change: "+۱", changeType: "up" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">داشبورد مدیریت</h1>
        <p className="text-muted-foreground mt-1">به پنل مدیریت آقای کمپر خوش آمدید</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
                {stat.change && (
                  <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">درخواست‌های اخیر</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/requests">
                مشاهده همه
                <ArrowLeft className="w-4 h-4 mr-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            ) : requests.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">درخواستی وجود ندارد</p>
            ) : (
              <div className="space-y-3">
                {requests.map((req) => (
                  <div key={req.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium">{req.name}</p>
                      <p className="text-xs text-muted-foreground" dir="ltr">{req.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground hidden sm:inline">{formatPersianDate(req.createdAt)}</span>
                      <Badge variant={statusMap[req.status]?.variant || "outline"}>
                        {statusMap[req.status]?.label || req.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">دسترسی سریع</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-brand-200 hover:bg-brand-50/50 transition-all duration-200" asChild>
              <Link href="/admin/projects">
                <FolderOpen className="w-6 h-6 text-brand-600" />
                <span className="text-xs font-medium">مدیریت پروژه‌ها</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-brand-200 hover:bg-brand-50/50 transition-all duration-200" asChild>
              <Link href="/admin/projects">
                <Plus className="w-6 h-6 text-brand-600" />
                <span className="text-xs font-medium">پروژه جدید</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-brand-200 hover:bg-brand-50/50 transition-all duration-200" asChild>
              <Link href="/admin/requests">
                <ClipboardList className="w-6 h-6 text-brand-600" />
                <span className="text-xs font-medium">مشاهده درخواست‌ها</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-brand-200 hover:bg-brand-50/50 transition-all duration-200" asChild>
              <Link href="/admin/testimonials">
                <MessageSquare className="w-6 h-6 text-brand-600" />
                <span className="text-xs font-medium">مدیریت نظرات</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
