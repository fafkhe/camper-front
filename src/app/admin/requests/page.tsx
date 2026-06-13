"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiGet, apiPut } from "@/lib/api";
import { formatPersianDate } from "@/lib/utils";
import type { ConsultationRequest } from "@/types";

const statuses = [
  { value: "ALL", label: "همه" },
  { value: "PENDING", label: "در انتظار" },
  { value: "CONTACTED", label: "تماس گرفته شده" },
  { value: "COMPLETED", label: "تکمیل شده" },
];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  PENDING: { label: "در انتظار", variant: "secondary" },
  CONTACTED: { label: "تماس گرفته شده", variant: "default" },
  COMPLETED: { label: "تکمیل شده", variant: "outline" },
};

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    apiGet("/requests")
      .then(setRequests)
      .catch(() => toast.error("خطا در بارگذاری درخواست‌ها"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await apiPut(`/requests/${id}`, { status });
      toast.success("وضعیت به‌روزرسانی شد");
      load();
    } catch {
      toast.error("خطا در تغییر وضعیت");
    }
  };

  const filtered = filter === "ALL" ? requests : requests.filter((r) => r.status === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">درخواست‌ها</h1>

      <div className="flex items-center gap-2 flex-wrap">
        {statuses.map((s) => (
          <Button
            key={s.value}
            variant={filter === s.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(s.value)}
          >
            {s.label}
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-muted-foreground">در حال بارگذاری...</div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">درخواستی یافت نشد</div>
          ) : (
            <div className="divide-y">
              {filtered.map((req) => (
                <div key={req.id}>
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{req.name}</p>
                        <p className="text-xs text-muted-foreground" dir="ltr">{req.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        {formatPersianDate(req.createdAt)}
                      </span>
                      <Badge variant={statusMap[req.status]?.variant || "outline"}>
                        {statusMap[req.status]?.label || req.status}
                      </Badge>
                      {expandedId === req.id ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  {expandedId === req.id && (
                    <div className="px-4 pb-4 pt-0 space-y-3 bg-muted/20">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground text-xs">نام:</span>
                          <p className="font-medium">{req.name}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">تلفن:</span>
                          <p className="font-medium" dir="ltr">{req.phone}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">نوع خودرو:</span>
                          <p className="font-medium">{req.vehicleType || "-"}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">شهر:</span>
                          <p className="font-medium">{req.city || "-"}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">بودجه:</span>
                          <p className="font-medium">{req.budget || "-"}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">تاریخ:</span>
                          <p className="font-medium">{formatPersianDate(req.createdAt)}</p>
                        </div>
                      </div>
                      {req.description && (
                        <div>
                          <span className="text-muted-foreground text-xs">توضیحات:</span>
                          <p className="text-sm mt-0.5">{req.description}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-xs text-muted-foreground">تغییر وضعیت:</span>
                        <Select
                          defaultValue={req.status}
                          onValueChange={(val) => handleStatusChange(req.id, val)}
                        >
                          <SelectTrigger className="w-40 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.filter((s) => s.value !== "ALL").map((s) => (
                              <SelectItem key={s.value} value={s.value}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
