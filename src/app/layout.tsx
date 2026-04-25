import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import MascotPill from "@/components/MascotPill";
import BottomToastAd from "@/components/BottomToastAd";

export const metadata: Metadata = {
  title: "Ongole Connect - ప్రకాశం జిల్లా తాజా వార్తలు | Prakasam District News",
  description: "ఒంగోలు, ప్రకాశం జిల్లా స్థానిక వార్తలు, రాష్ట్ర వార్తలు, క్రీడలు, సినిమాలు, వ్యాపారం మరియు ఆధ్యాత్మిక సమాచారం. Your trusted source for Ongole and Prakasam district news.",
  keywords: "Ongole, Prakasam, Telugu News, Local News, Andhra Pradesh, Ongole Connect, Ongole Bull, ప్రకాశం జిల్లా",
  openGraph: {
    title: "Ongole Connect - ప్రకాశం జిల్లా తాజా వార్తలు",
    description: "ఒంగోలు, ప్రకాశం జిల్లా స్థానిక వార్తలు, రాష్ట్ర వార్తలు, క్రీడలు, సినిమాలు, వ్యాపారం మరియు ఆధ్యాత్మిక సమాచారం.",
    type: "website",
    locale: "te_IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="te" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <Footer />
            <MobileBottomNav />
            <MascotPill />
            <BottomToastAd />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
