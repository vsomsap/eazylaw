import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EazyLaw - ระบบสร้างเอกสารกฎหมายอัตโนมัติ",
  description: "อัปโหลดใบเสนอราคา ระบบ AI จะสร้างสัญญาและเอกสารกฎหมายให้อัตโนมัติ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="antialiased">{children}</body>
    </html>
  );
}
