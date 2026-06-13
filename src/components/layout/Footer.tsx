"use client";

import { Truck, Phone, MessageCircle, Instagram, MapPin, ArrowUp } from "lucide-react";

const quickLinks = [
  { label: "صفحه اصلی", href: "#hero" },
  { label: "نمونه کارها", href: "#portfolio" },
  { label: "خدمات", href: "#services" },
  { label: "درباره ما", href: "#about" },
  { label: "تماس با ما", href: "#contact" },
];

const services = [
  "طراحی اختصاصی",
  "ساخت کمپر",
  "تبدیل ون",
  "تجهیزات کمپر",
  "مشاوره تخصصی",
];

const contactInfo = [
  { icon: Phone, label: "۰۹۱۲۳۴۵۶۷۸۹", href: "tel:09123456789" },
  { icon: MessageCircle, label: "پیام در واتساپ", href: "https://wa.me/989123456789" },
  { icon: Instagram, label: "اینستاگرام", href: "https://instagram.com/aghaye.camper" },
  { icon: MapPin, label: "تهران، ایران" },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-brand-50 relative">
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-extrabold">آقای کمپر</span>
            </div>
            <p className="text-sm text-brand-300 leading-relaxed">
              متخصص در طراحی و ساخت کمپرهای سفارشی، تبدیل ون به کمپر و نصب
              تجهیزات رفاهی. از رویا تا واقعیت، همراه شما هستیم.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <a
                href="https://instagram.com/aghaye.camper"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-brand-900 text-brand-400 hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="اینستاگرام"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/989123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-brand-900 text-brand-400 hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="واتساپ"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">
              لینک‌های سریع
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-300 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">
              خدمات ما
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-sm text-brand-300">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">
              تماس با ما
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex items-center gap-2 text-sm text-brand-300">
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    <span>{item.label}</span>
                  </span>
                );
                if (item.href) {
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="hover:text-primary transition-colors"
                      >
                        {content}
                      </a>
                    </li>
                  );
                }
                return <li key={item.label}>{content}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <p className="text-xs text-brand-400">
            © {currentYear} آقای کمپر. تمامی حقوق محفوظ است.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-brand-900 text-brand-400 hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="بازگشت به بالا"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
