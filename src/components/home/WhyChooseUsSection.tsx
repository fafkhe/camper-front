"use client"

import { motion } from "framer-motion"
import {
  PenLine,
  ShieldCheck,
  Settings2,
  Award,
  Headphones,
  Clock,
} from "lucide-react"

const reasons = [
  {
    icon: PenLine,
    title: "طراحی اختصاصی",
    description: "هر کمپر منحصر به فرد است و مطابق با نیاز شما طراحی می‌شود",
    color: "bg-earth-100 text-earth-700",
    borderColor: "border-earth-200",
    bgGlow: "bg-earth-500",
  },
  {
    icon: ShieldCheck,
    title: "کیفیت ساخت بالا",
    description: "استفاده از بهترین متریال و استانداردهای روز دنیا",
    color: "bg-emerald-100 text-emerald-700",
    borderColor: "border-emerald-200",
    bgGlow: "bg-emerald-500",
  },
  {
    icon: Settings2,
    title: "تجهیزات حرفه‌ای",
    description: "برندهای معتبر جهانی و جدیدترین تکنولوژی‌ها",
    color: "bg-blue-100 text-blue-700",
    borderColor: "border-blue-200",
    bgGlow: "bg-blue-500",
  },
  {
    icon: Award,
    title: "تجربه و تخصص",
    description: "سال‌ها سابقه درخشان در طراحی و ساخت کمپر",
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-amber-200",
    bgGlow: "bg-amber-500",
  },
  {
    icon: Headphones,
    title: "پشتیبانی کامل",
    description: "همراه شما از مشاوره اولیه تا پس از تحویل پروژه",
    color: "bg-violet-100 text-violet-700",
    borderColor: "border-violet-200",
    bgGlow: "bg-violet-500",
  },
  {
    icon: Clock,
    title: "تحویل به موقع",
    description: "پایبندی به زمان‌بندی و تحویل پروژه در موعد مقرر",
    color: "bg-rose-100 text-rose-700",
    borderColor: "border-rose-200",
    bgGlow: "bg-rose-500",
  },
]

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" className="relative bg-white py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 md:text-4xl">
            چرا آقای کمپر؟
          </h2>
          <p className="text-lg leading-relaxed text-zinc-600">
            ما به کیفیت، تعهد و رضایت شما اهمیت می‌دهیم. دلایل انتخاب آقای کمپر
            برای ساخت کمپر رویایی‌تان:
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group ${reason.borderColor}`}
              >
                <div className={`pointer-events-none absolute -inset-x-4 -top-12 h-24 w-48 -rotate-12 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${reason.bgGlow}`} />

                <div className="relative z-10 flex items-start gap-5">
                  <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${reason.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-zinc-900 group-hover:text-primary transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-500">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
