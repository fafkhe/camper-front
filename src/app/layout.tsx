import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "آقای کمپر | طراحی و ساخت کمپرهای سفارشی",
  description:
    "آقای کمپر، متخصص در طراحی و ساخت کمپرهای سفارشی، تبدیل ون به کمپر، نصب تجهیزات رفاهی و سفر. از رویا تا واقعیت، با ما همراه باشید.",
  keywords:
    "ساخت کمپر, طراحی کمپر, تبدیل ون به کمپر, کمپر سفارشی, ساخت خانه متحرک, تجهیزات کمپر",
  openGraph: {
    title: "آقای کمپر | طراحی و ساخت کمپرهای سفارشی",
    description:
      "متخصص در طراحی و ساخت کمپرهای سفارشی، تبدیل ون به کمپر و نصب تجهیزات",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.variable} min-h-screen bg-background font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
