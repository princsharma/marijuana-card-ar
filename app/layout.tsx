import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer, Header, NoticeBar } from "@/components/Chrome";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Renew Your Arkansas Medical Marijuana Card Online",
    template: "%s",
  },
  description:
    "Video renewals for Arkansas medical marijuana cards. First certifications cannot be completed by telemedicine.",
  applicationName: SITE_NAME,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <NoticeBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
