"use client";

import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "item-1",
    question: "فرآیند طراحی کمپر چگونه است؟",
    answer:
      "فرآیند طراحی کمپر در آقای کمپر شامل مراحل زیر است: ابتدا جلسه مشاوره حضوری برای بررسی نیازها و بودجه شما برگزار می‌شود. سپس تیم طراحی ما طرح اولیه را بر اساس خودروی انتخابی شما آماده می‌کند. پس از تأیید طرح، نقشه‌های اجرایی و سه‌بعدی تهیه و به مرحله ساخت می‌رود. در طول ساخت، پیشرفت پروژه به صورت مستمر به شما گزارش داده می‌شود.",
  },
  {
    id: "item-2",
    question: "مدت زمان ساخت کمپر چقدر است؟",
    answer:
      "مدت زمان ساخت کمپر بسته به پیچیدگی پروژه و نوع خودرو متغیر است. به طور معمول، پروژه‌های تبدیل ون بین ۲ تا ۳ ماه و پروژه‌های بزرگ‌تر مانند کامیون‌ها بین ۳ تا ۴ ماه زمان می‌برند. عوامل مؤثر بر زمان شامل سفارشی‌سازی‌ها، تأمین تجهیزات و پیچیدگی طراحی داخلی است.",
  },
  {
    id: "item-3",
    question: "هزینه ساخت کمپر چقدر است؟",
    answer:
      "هزینه ساخت کمپر به عوامل مختلفی بستگی دارد: نوع و مدل خودروی پایه، متراژ فضای داخلی، نوع و کیفیت تجهیزات نصب شده، میزان سفارشی‌سازی و طراحی داخلی. برای دریافت قیمت دقیق، لطفاً فرم مشاوره را پر کنید تا کارشناسان ما پس از بررسی نیازهای شما، تخمین هزینه ارائه دهند. ما گزینه‌های مختلفی برای بودجه‌های متفاوت داریم.",
  },
  {
    id: "item-4",
    question: "چه نوع خودروهایی برای تبدیل مناسب هستند؟",
    answer:
      "انواع مختلفی از خودروها برای تبدیل به کمپر مناسب هستند: ون‌ها (مانند مرسدس بنز اسپرینتر، تویوتا هایس، فولکس‌واگن کراولر)، مینی‌بوس‌ها (مانند ایویکو، فوتون)، کامیون‌ها (مانند ولتا، فاو) و SUVهای بزرگ. انتخاب خودروی مناسب به نیازها، تعداد افراد و بودجه شما بستگی دارد. تیم ما در این زمینه مشاوره تخصصی ارائه می‌دهد.",
  },
  {
    id: "item-5",
    question: "آیا امکان نصب تجهیزات روی کمپر موجود وجود دارد؟",
    answer:
      "بله، ما خدمات نصب و ارتقاء تجهیزات روی کمپرهای موجود را نیز ارائه می‌دهیم. می‌توانید تجهیزاتی مانند پنل‌های خورشیدی، سیستم‌های صوتی تصویری، کولر سقفی، باتری‌های کمکی، سرویس بهداشتی، آشپزخانه و سیستم‌های گرمایشی را به کمپر خود اضافه کنید. تیم ما پس از بازدید و بررسی، بهترین راهکار را پیشنهاد می‌دهد.",
  },
  {
    id: "item-6",
    question: "خدمات پس از فروش دارید؟",
    answer:
      "بله، آقای کمپر خدمات پس از فروش کاملی را ارائه می‌دهد. تمام پروژه‌های ما دارای گارانتی یک ساله هستند و خدمات پشتیبانی فنی تا ۵ سال پس از تحویل پروژه ارائه می‌شود. همچنین تیم پشتیبانی ما در طول هفته آماده پاسخگویی به سوالات و مشکلات فنی شما است. سرویس‌های دوره‌ای و بازدیدهای فنی نیز جزو خدمات ما هستند.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
            <MessageSquareText className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            سوالات متداول
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            پاسخ به پرتکرارترین سوالات شما درباره طراحی و ساخت کمپر
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border rounded-xl px-5 data-[state=open]:shadow-md data-[state=open]:border-primary/20 transition-all duration-300"
              >
                <AccordionTrigger className="text-foreground font-medium hover:no-underline hover:text-primary transition-colors py-4 text-sm md:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
