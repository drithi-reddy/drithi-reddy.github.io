import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "SCOTUS Encyclopedia | Supreme Court Cases, Justices & Precedents",
  description:
    "Explore Supreme Court cases, opinions, precedents, justice biographies, and the current docket. Plain-language summaries for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <Header />
        <main className="pb-16">{children}</main>
      </body>
    </html>
  );
}
