import NavBar from "@/components/NavBar/NavBar";
import "./globals.scss";
import { canelaDeck } from "@/lib/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ENSAT - École Nationale des Sciences Appliquées de Tanger",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={canelaDeck.variable}>
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
