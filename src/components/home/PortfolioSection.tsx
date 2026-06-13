"use client";

import { motion } from "framer-motion";
import { Truck, ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "ون مسافرتی مجلل",
    description: "تبدیل ون مرسدس بنز اسپرینتر به یک کمپر لوکس با تمام امکانات رفاهی",
    date: "۱۴۰۳/۰۶/۱۵",
    gradient: "from-amber-600 to-orange-700",
    tag: "ون",
  },
  {
    id: 2,
    title: "کمپر ماجراجویی",
    description: "مینی‌بوس ایویکو مجهز به امکانات آفرود و سفرهای طولانی",
    date: "۱۴۰۳/۰۴/۲۰",
    gradient: "from-emerald-600 to-teal-700",
    tag: "مینی‌بوس",
  },
  {
    id: 3,
    title: "خانه متحرک لوکس",
    description: "کامیون ولتا ۶ چرخ با طراحی مدرن و فضای نشیمن کامل",
    date: "۱۴۰۳/۰۲/۱۰",
    gradient: "from-blue-600 to-indigo-700",
    tag: "کامیون",
  },
  {
    id: 4,
    title: "ون خانوادگی",
    description: "تبدیل ون تویوتا هایس به کمپر ۴ نفره با آشپزخانه و سرویس بهداشتی",
    date: "۱۴۰۲/۱۲/۰۵",
    gradient: "from-violet-600 to-purple-700",
    tag: "ون",
  },
  {
    id: 5,
    title: "کمپر آفرود",
    description: "SUV مجهز به چادر سقفی و تجهیزات کامل سفرهای آفرود",
    date: "۱۴۰۲/۱۰/۱۸",
    gradient: "from-rose-600 to-pink-700",
    tag: "SUV",
  },
  {
    id: 6,
    title: "ون مینی‌بار",
    description: "ون ولوکس واگن با طراحی خاص برای پذیرایی و رویدادها",
    date: "۱۴۰۲/۰۸/۲۲",
    gradient: "from-cyan-600 to-sky-700",
    tag: "ون",
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            نمونه کارهای ما
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            از رویا تا واقعیت، با ما همراه باشید
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br flex items-center justify-center transition-all duration-500 group-hover:scale-110",
                      project.gradient
                    )}
                  >
                    <Truck className="h-16 w-16 text-white/30 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-white/60 text-xs">
                        <Calendar className="h-3 w-3" />
                        {project.date}
                      </div>
                      <Badge variant="secondary" className="text-xs bg-white/20 text-white hover:bg-white/30">
                        <Tag className="h-3 w-3 ml-1" />
                        {project.tag}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground truncate">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0 mr-3">
                      {project.tag}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-10"
        >
          <Button size="lg" variant="outline" asChild>
            <a href="/portfolio">
              <ArrowLeft className="ml-2 h-4 w-4" />
              مشاهده همه
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
