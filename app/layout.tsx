import Navigation from "@/components/Navigation/Navigation";
import { canelaDeck } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "ENSAT - École Nationale des Sciences Appliquées de Tanger",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={canelaDeck.variable}>
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
    );
  }
