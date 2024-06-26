import "./globals.css";
import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import NextUIProvider from "@/providers/NextUIProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const inter = Kanit({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <NextUIProvider>{children}</NextUIProvider>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
