"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "نام باید حداقل ۲ حرف باشد")
    .max(50, "نام بسیار طولانی است"),
  phone: z
    .string()
    .regex(
      /^(\+98|0)?9\d{9}$/,
      "شماره موبایل معتبر وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹)"
    ),
  vehicleType: z.string().min(1, "لطفاً نوع خودرو را انتخاب کنید"),
  description: z.string().optional(),
  budget: z.string().optional(),
  city: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      vehicleType: "",
      description: "",
      budget: "",
      city: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await apiPost("/requests", data);
      toast.success("درخواست شما با موفقیت ثبت شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.");
      reset();
    } catch {
      toast.error("خطا در ثبت درخواست. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-20 md:py-28 bg-muted/30">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            درخواست مشاوره و طراحی کمپر
          </h2>
          <p className="text-muted-foreground text-lg">
            برای دریافت مشاوره رایگان و شروع پروژه خود، فرم زیر را پر کنید
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card border rounded-2xl p-6 md:p-8 shadow-lg space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground block">
                  نام و نام خانوادگی
                </label>
                <Input
                  id="name"
                  placeholder="مثال: رضا محمدی"
                  {...register("name")}
                  className={cn(errors.name && "border-destructive", "transition-all duration-200 focus:ring-2 focus:ring-primary/20")}
                  dir="rtl"
                />
                {errors.name && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-destructive shrink-0" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground block">
                  شماره موبایل
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                  {...register("phone")}
                  className={cn(errors.phone && "border-destructive", "transition-all duration-200 focus:ring-2 focus:ring-primary/20")}
                  dir="rtl"
                />
                {errors.phone && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-destructive shrink-0" />
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">
                  نوع خودرو
                </label>
                <Select
                  onValueChange={(value) => setValue("vehicleType", value)}
                  dir="rtl"
                >
                  <SelectTrigger
                    className={cn(errors.vehicleType && "border-destructive")}
                  >
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ون">ون</SelectItem>
                    <SelectItem value="مینی‌بوس">مینی‌بوس</SelectItem>
                    <SelectItem value="کامیون">کامیون</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="سایر">سایر</SelectItem>
                  </SelectContent>
                </Select>
                {errors.vehicleType && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-destructive shrink-0" />
                    {errors.vehicleType.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">
                  بودجه تقریبی
                </label>
                <Select
                  onValueChange={(value) => setValue("budget", value)}
                  dir="rtl"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="زیر ۵۰۰ میلیون">زیر ۵۰۰ میلیون</SelectItem>
                    <SelectItem value="۵۰۰ میلیون تا ۱ میلیارد">۵۰۰ میلیون تا ۱ میلیارد</SelectItem>
                    <SelectItem value="۱ تا ۲ میلیارد">۱ تا ۲ میلیارد</SelectItem>
                    <SelectItem value="بیش از ۲ میلیارد">بیش از ۲ میلیارد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium text-foreground block">
                شهر
              </label>
              <Input
                id="city"
                placeholder="مثال: تهران"
                {...register("city")}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-foreground block">
                توضیحات پروژه
              </label>
              <Textarea
                id="description"
                placeholder="توضیحات کلی درباره پروژه خود را بنویسید..."
                {...register("description")}
                className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                dir="rtl"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto bg-gradient-to-l from-primary to-brand-600 hover:from-primary/90 hover:to-brand-700 text-white gap-2 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {isSubmitting ? "در حال ثبت..." : "ثبت درخواست"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
