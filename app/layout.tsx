import './globals.scss';
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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
