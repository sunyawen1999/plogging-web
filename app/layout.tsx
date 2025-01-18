import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/providers/AuthProvider";

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Plogging the world",
  description: "A web app encourages eco-friendly jogging, making every step towards fitness a step towards a cleaner planet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <html lang="en">
        <body className={font.className}>
          <AuthProvider>
            <Sidebar>
              {children}
            </Sidebar>
          </AuthProvider>
        </body>
      </html>
    );
  }