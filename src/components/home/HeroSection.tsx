"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Mountain, TreePine, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const floatingElements = [
  { Icon: Mountain, size: 120, x: "left-[10%]", y: "top-[20%]", delay: 0, xMove: 15 },
  { Icon: TreePine, size: 80, x: "right-[15%]", y: "top-[30%]", delay: 1, xMove: -15 },
  { Icon: Mountain, size: 160, x: "bottom-[25%]", y: "left-[20%]", delay: 2, xMove: 20 },
  { Icon: TreePine, size: 60, x: "bottom-[35%]", y: "right-[10%]", delay: 0.5, xMove: -10 },
]

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950" id="hero">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-earth-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-900/60 to-zinc-950/90" />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Decorative floating elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingElements.map(({ Icon, size, x, y, delay, xMove }, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, xMove, 0],
            }}
            transition={{
              duration: 5 + delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
            className={`absolute ${x} ${y} text-white/5`}
          >
            <Icon size={size} />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="container relative z-10 mx-auto px-4 text-center"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-8">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>متخصص در طراحی و ساخت کمپرهای سفارشی</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl font-extrabold text-white md:text-6xl lg:text-7xl leading-tight"
        >
          کمپر رویایی خود را
          <br />
          <span className="text-gradient">با ما بسازید</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl"
        >
          از رویا تا واقعیت، با تیم حرفه‌ای آقای کمپر همراه شوید و کمپری منحصربه‌فرد داشته باشید
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="w-full bg-gradient-to-l from-primary to-brand-600 text-white hover:from-primary/90 hover:to-brand-700 shadow-lg shadow-primary/25 sm:w-auto sm:px-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
            onClick={() => {
              document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            درخواست مشاوره رایگان
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40 sm:w-auto sm:px-8 backdrop-blur-sm"
            onClick={() => {
              document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            مشاهده نمونه کارها
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40">اسکرول کنید</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
