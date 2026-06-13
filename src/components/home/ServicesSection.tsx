"use client"

import { motion } from "framer-motion"
import {
  PencilRuler,
  Hammer,
  ArrowRightLeft,
  Sofa,
  Sun,
  Paintbrush,
  MessagesSquare,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: PencilRuler,
    title: "طراحی اختصاصی کمپر",
    description: "طراحی کمپر مطابق با نیازها و سلیقه شما با استفاده از جدیدترین نرم‌افزارهای طراحی سه‌بعدی",
    color: "bg-amber-50 text-amber-600",
    gradient: "from-amber-500/10 to-transparent",
  },
  {
    icon: Hammer,
    title: "ساخت و تجهیز کمپر",
    description: "ساخت و تجهیز کامل کمپر با بالاترین استانداردهای کیفی و استفاده از بهترین مواد اولیه",
    color: "bg-blue-50 text-blue-600",
    gradient: "from-blue-500/10 to-transparent",
  },
  {
    icon: ArrowRightLeft,
    title: "تبدیل ون به کمپر",
    description: "تبدیل تخصصی انواع ون به کمپرهای مجهز و لوکس برای سفرهای خاطره‌انگیز",
    color: "bg-emerald-50 text-emerald-600",
    gradient: "from-emerald-500/10 to-transparent",
  },
  {
    icon: Sofa,
    title: "نصب تجهیزات رفاهی و سفر",
    description: "نصب و راه‌اندازی انواع تجهیزات رفاهی از جمله آشپزخانه، سرویس بهداشتی و سیستم گرمایشی",
    color: "bg-violet-50 text-violet-600",
    gradient: "from-violet-500/10 to-transparent",
  },
  {
    icon: Sun,
    title: "سیستم برق و پنل خورشیدی",
    description: "طراحی و نصب سیستم برق هوشمند با پنل‌های خورشیدی و باتری‌های با ظرفیت بالا",
    color: "bg-orange-50 text-orange-600",
    gradient: "from-orange-500/10 to-transparent",
  },
  {
    icon: Paintbrush,
    title: "طراحی داخلی سفارشی",
    description: "طراحی داخلی منحصربه‌فرد با دکوراسیون مدرن و کاربردی متناسب با سبک زندگی شما",
    color: "bg-rose-50 text-rose-600",
    gradient: "from-rose-500/10 to-transparent",
  },
  {
    icon: MessagesSquare,
    title: "مشاوره و راهنمایی خرید و ساخت",
    description: "مشاوره تخصصی در انتخاب ون مناسب، تجهیزات و برنامه‌ریزی پروژه ساخت کمپر",
    color: "bg-cyan-50 text-cyan-600",
    gradient: "from-cyan-500/10 to-transparent",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-zinc-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 md:text-4xl">
            خدمات ما
          </h2>
          <p className="text-lg leading-relaxed text-zinc-600">
            مجموعه کاملی از خدمات طراحی، ساخت و تجهیز کمپر را با بالاترین کیفیت
            به شما ارائه می‌دهیم. از مشاوره اولیه تا تحویل نهایی، همراه شما هستیم.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card className="group relative h-full border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardContent className="relative flex flex-col items-center p-8 text-center z-10">
                    <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${service.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-zinc-900">
                      {service.title}
                    </h3>
                    <p className="leading-relaxed text-zinc-500">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
