"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X, Film } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const videos = [
  {
    id: 1,
    title: "تبدیل ون به کمپر - پروژه اسپرینتر",
    category: "ون",
    gradient: "from-amber-500/80 to-orange-600/80",
  },
  {
    id: 2,
    title: "کمپر لوکس مینی‌بوس - تور مجازی",
    category: "مینی‌بوس",
    gradient: "from-emerald-500/80 to-teal-600/80",
  },
  {
    id: 3,
    title: "مراحل ساخت کمپر کامیونی",
    category: "کامیون",
    gradient: "from-blue-500/80 to-indigo-600/80",
  },
  {
    id: 4,
    title: "نصب تجهیزات و اپارات کمپر",
    category: "تجهیزات",
    gradient: "from-violet-500/80 to-purple-600/80",
  },
];

export default function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const selected = videos.find((v) => v.id === selectedVideo);

  return (
    <section id="videos" className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            ویدیو پروژه‌ها
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            مراحل ساخت و تبدیل پروژه‌های ما را در ویدیوهای زیر مشاهده کنید
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedVideo(video.id)}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br flex items-center justify-center transition-all duration-500 group-hover:scale-105",
                  video.gradient
                )}
              >
                <Film className="h-12 w-12 text-white/20 group-hover:scale-125 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                  <Play className="h-6 w-6 text-foreground ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <Badge variant="secondary" className="mb-1.5 text-xs bg-white/20 text-white">
                  {video.category}
                </Badge>
                <h3 className="text-white font-semibold text-sm leading-tight">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <Dialog
          open={selectedVideo !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedVideo(null);
          }}
        >
          <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-black">
            <DialogTitle className="sr-only">
              {selected?.title || "پخش ویدیو"}
            </DialogTitle>
            <DialogClose className="absolute top-3 right-3 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors">
              <X className="h-4 w-4" />
            </DialogClose>
            <div className="aspect-video w-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 relative">
              <Film className="h-20 w-20 text-white/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60">
                <Play className="h-16 w-16 mb-3 opacity-40" />
                <span className="text-sm font-medium">
                  {selected?.title}
                </span>
                <span className="text-xs text-white/40 mt-1">
                  ویدیو در اینجا پخش خواهد شد
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
