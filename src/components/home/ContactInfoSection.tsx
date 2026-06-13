"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Instagram, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const contacts = [
  {
    id: 1,
    label: "تلفن تماس",
    value: "۰۲۱-۱۲۳۴۵۶۷۸",
    href: "tel:+982112345678",
    icon: Phone,
    gradient: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-500/10",
  },
  {
    id: 2,
    label: "واتساپ",
    value: "۰۹۱۲-۳۴۵-۶۷۸۹",
    href: "https://wa.me/989123456789",
    icon: MessageCircle,
    gradient: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-500/10",
  },
  {
    id: 3,
    label: "اینستاگرام",
    value: "@aghaye_camper",
    href: "https://instagram.com/aghaye_camper",
    icon: Instagram,
    gradient: "from-pink-500 to-rose-600",
    bgLight: "bg-pink-500/10",
  },
  {
    id: 4,
    label: "آدرس",
    value: "تهران، جاده مخصوص کرج، خیابان صنعت",
    href: "https://maps.google.com/?q=تهران+جاده+مخصوص+کرج+خیابان+صنعت",
    icon: MapPin,
    gradient: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-500/10",
  },
];

export default function ContactInfoSection() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            اطلاعات تماس
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            آماده پاسخگویی به سوالات شما هستیم
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {contacts.map((contact, i) => {
              const Icon = contact.icon;
              return (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <a
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block"
                  >
                    <Card className="group border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-5 flex items-center gap-4">
                        <div
                          className={cn(
                            "h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                            contact.bgLight
                          )}
                        >
                          <Icon className="h-5 w-5 text-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground mb-0.5">
                            {contact.label}
                          </p>
                          <p className="font-semibold text-foreground text-sm truncate">
                            {contact.value}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-md border border-border/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.844!2d51.0!3d35.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDAwJzAwLjAiTiA1McKwMDAnMDAuMCJF!5e0!3m2!1sfa!2s!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقعیت آقای کمپر"
                className="grayscale-[0.2]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
