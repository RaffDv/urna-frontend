import ReactQueryClientProvider from "@/lib/ReactQueryClientProvider";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "IF Urna",
  description: "Urna eletrônica do IFRS Campus Feliz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={kanit.className}>
        <ReactQueryClientProvider>
          {children}
        </ReactQueryClientProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
