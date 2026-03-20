import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import appleTouchIcon from "@/app/assets/apple-touch-icon.png";
import faviconIco from "@/app/assets/favicon.ico";
import "./globals.css";
import { AppFooter } from "@/components/app-footer";
import { SiteNav } from "@/components/site-nav";
import { siteConfig } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: faviconIco.src,
    shortcut: faviconIco.src,
    apple: appleTouchIcon.src,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.defaultKeywords],
  openGraph: {
    type: "website",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1115" },
  ],
};

const themeScript = `
(() => {
  const storedTheme = window.localStorage.getItem("convertcenter-theme");
  const theme = storedTheme === "light" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
})();
`;

const cloudflareAnalyticsToken = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN;
const shouldLoadCloudflareAnalytics =
  process.env.NODE_ENV === "production" && Boolean(cloudflareAnalyticsToken);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded focus:border"
        >
          Skip to main content
        </a>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-3 py-3 sm:px-4 lg:px-6">
          <div
            aria-hidden="true"
            className="shrink-0"
            style={{ height: "var(--site-top-bar-height, 0px)" }}
          />
          <SiteNav />
          <main className="flex-1" id="main-content">{children}</main>
          <AppFooter />
        </div>
        {shouldLoadCloudflareAnalytics ? (
          <Script
            data-cf-beacon={JSON.stringify({
              token: cloudflareAnalyticsToken,
            })}
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
