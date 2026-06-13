"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import {
  Compass,
  Factory,
  Truck,
  Palette,
  Wrench,
  Headphones,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Compass,
    title: "طراحی کمپر",
    description: "طراحی حرفه‌ای و اختصاصی کمپر بر اساس نیاز و سلیقه شما با استفاده از نرم‌افزارهای مدرن",
  },
  {
    icon: Factory,
    title: "ساخت و تولید",
    description: "تولید با کیفیت بالا در کارگاه مجهز با بهره‌گیری از بهترین متریال و تجهیزات روز دنیا",
  },
  {
    icon: Truck,
    title: "تبدیل ون",
    description: "تبدیل انواع ون به کمپرهای لوکس و مجهز با رعایت بالاترین استانداردهای ایمنی",
  },
  {
    icon: Palette,
    title: "طراحی داخلی",
    description: "طراحی داخلی منحصربه‌فرد با رویکردی مدرن و کاربردی برای حداکثر استفاده از فضا",
  },
  {
    icon: Wrench,
    title: "نصب تجهیزات",
    description: "نصب تخصصی انواع تجهیزات رفاهی، سیستم برق، پنل خورشیدی و لوازم جانبی",
  },
  {
    icon: Headphones,
    title: "مشاوره تخصصی",
    description: "مشاوره رایگان و تخصصی در تمام مراحل انتخاب، طراحی و ساخت کمپر",
  },
]

const stats = [
  { value: "۱۵۰+", label: "پروژه موفق" },
  { value: "۱۲", label: "سال تجربه" },
  { value: "۵۰+", label: "متخصص حرفه‌ای" },
  { value: "۹۸%", label: "رضایت مشتری" },
]

function Counter({ value, label, inView }: { value: string; label: string; inView: boolean }) {
  const [count, setCount] = useState("0")
  const numValue = parseInt(value.replace(/[^0-9]/g, ""))

  useEffect(() => {
    if (!inView || !numValue) {
      setCount(value)
      return
    }
    const suffix = value.replace(/[0-9]/g, "")
    let start = 0
    const duration = 2000
    const steps = 60
    const increment = numValue / steps
    const timer = setInterval(() => {
      start += increment
      if (start >= numValue) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start) + suffix)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, numValue, value])

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-primary">{count}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  )
}

export default function AboutSection() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" })

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-50/50 to-white" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
            <Compass className="h-7 w-7 text-primary" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 md:text-4xl">
            درباره آقای کمپر
          </h2>
          <p className="text-lg leading-relaxed text-zinc-600">
            آقای کمپر، متخصص در طراحی و ساخت کمپرهای سفارشی با سال‌ها تجربه در
            این حوزه است. ما از اولین قدم تا آخرین جزئیات در کنار شما هستیم تا
            کمپر رویایی‌تان را به واقعیت تبدیل کنیم.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card className="group h-full border-zinc-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:bg-brand-100 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-500/20">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-zinc-900">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-zinc-500">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-b border-zinc-200">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Counter value={stat.value} label={stat.label} inView={statsInView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
