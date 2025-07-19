import type { Metadata } from "next";
import "./globals.css";
import Providers from './providers';
import Header from './components/Header';

export const metadata: Metadata = {
  title: "EdTech Platform",
  description: "Modern EdTech app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 font-sans">
        <Providers>
          <Header />
          <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
