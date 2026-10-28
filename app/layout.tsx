import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ziki • Agent Work Proposals | Human-Agent Protocol Suite",
  description: "Plan first, build second: Mandatory sign-off gate before autonomous coding agents begin work in Ziki.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Sets .dark on <html> before paint to avoid theme flash */}
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var e=document.documentElement,t=localStorage.getItem('ziki-theme');var n=window.matchMedia('(prefers-color-scheme: dark)').matches;t?t!=='system'&&(t==='dark'?e.classList.add('dark'):e.classList.remove('dark')):n&&e.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
