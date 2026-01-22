import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/WalletProvider";
import { SessionProvider } from "next-auth/react";
import ClientSessionProvider from "@/components/ClientSessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Waitlist | Project Alpha",
    template: "%s | Project Alpha",
  },
  description: "Secure your spot in the next generation of decentralized trading. Join the revolution today.",
  keywords: ["Solana", "DeFi", "Trading", "Waitlist", "Crypto", "Web3"],
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://project-alpha.com", // Placeholder
    title: "Join the Revolution",
    description: "Secure your spot in the next generation of decentralized trading.",
    siteName: "Project Alpha",
    images: [
      {
        url: "/logo.jpeg",
        width: 800,
        height: 600,
        alt: "Project Alpha Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the Revolution | Project Alpha",
    description: "Secure your spot in the next generation of decentralized trading.",
    images: ["/logo.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientSessionProvider>
          <WalletProvider>
             {children}
          </WalletProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
