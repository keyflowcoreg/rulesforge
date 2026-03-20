import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@/components/Analytics'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RulesForge — AI Coding Rules Generator',
  description:
    'Generate battle-tested .cursorrules and CLAUDE.md files for any stack. Free generator + Pro Pack $29.',
  keywords: [
    'cursor rules',
    'cursorrules',
    'claude.md',
    'claude code',
    'windsurf rules',
    'copilot instructions',
    'ai coding rules',
    'ai rules generator',
    'coding standards',
    'developer tools',
  ],
  authors: [{ name: 'AI Business Factory' }],
  creator: 'AI Business Factory',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rulesforge.com',
    siteName: 'RulesForge',
    title: 'RulesForge — AI Coding Rules Generator',
    description:
      'Generate battle-tested .cursorrules and CLAUDE.md files for any stack. Free generator + Pro Pack $29.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RulesForge — AI Coding Rules Generator',
    description:
      'Generate battle-tested .cursorrules and CLAUDE.md files for any stack. Free generator + Pro Pack $29.',
    creator: '@aibusinessfactory',
  },
  metadataBase: new URL('https://rulesforge.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "RulesForge",
              description:
                "Generate battle-tested .cursorrules and CLAUDE.md files for any stack. Free generator + Pro Pack with advanced configs.",
              url: "https://rulesforge.com",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "29",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-white font-mono">
        <Analytics product="rulesforge" />
        {children}
      </body>
    </html>
  )
}
