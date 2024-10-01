import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import '@/styles/globals.css'
import { CornerProvider } from "@/contexts/CornerContext";
import { SAVProvider } from "@/contexts/SAVContext";
import { RefurbProvider } from "@/contexts/RefurbContext";

export const metadata: Metadata = {
  title: "CR-BMP-SAV",
  description: "application de co-gestion des SAV des corners BeeMyPhone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body >
        <CornerProvider>
          <SAVProvider>
            <RefurbProvider>
              <Header />
              <main>
                {children}
              </main>
              <Footer />
            </RefurbProvider>
          </SAVProvider>
        </CornerProvider>
      </body>
    </html>
  );
}
