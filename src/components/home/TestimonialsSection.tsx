"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, MessagesSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { apiGet } from "@/lib/api";
import type { Testimonial } from "@/types";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("");
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    apiGet("/testimonials")
      .then(setTestimonials)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap());
    carouselApi.on("select", () => setCurrent(carouselApi.selectedScrollSnap()));
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    const interval = setInterval(() => carouselApi.scrollNext(), 4000);
    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
            <MessagesSquare className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            <span className="text-gradient">نظرات</span> مشتریان
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            آنچه مشتریان درباره ما می‌گویند
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">در حال بارگذاری...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">نظری وجود ندارد</div>
        ) : (
        <Carousel
          setApi={setCarouselApi}
          opts={{ align: "start", loop: true }}
          className="max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {testimonials.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full border-0 shadow-md">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12 border-2 border-border">
                        {item.avatar ? (
                          <AvatarImage src={item.avatar} alt={item.name} />
                        ) : (
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                            {getInitials(item.name)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-muted-foreground text-xs truncate">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {item.content}
                    </p>

                    <div className="flex items-center gap-0.5 mt-4 pt-4 border-t border-border/50">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < item.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-muted-foreground/20 fill-muted-foreground/10"
                          )}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 h-9 w-9" />
            <div className="flex items-center gap-2" dir="ltr">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => carouselApi?.scrollTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === current
                      ? "w-6 bg-primary"
                      : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                  )}
                />
              ))}
            </div>
            <CarouselNext className="static translate-y-0 h-9 w-9" />
          </div>
        </Carousel>
      )}
      </div>
    </section>
  );
}
