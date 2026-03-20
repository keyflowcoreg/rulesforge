import { TermsOfService } from './TermsOfService'

export const metadata = {
  title: 'Terms of Service — RulesForge',
  description: 'Terms of Service for RulesForge by AI Business Factory.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="border-b border-zinc-800/50 py-4 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
            &larr; Back to RulesForge
          </a>
        </div>
      </div>
      <TermsOfService
        companyName="AI Business Factory"
        productName="RulesForge"
        contactEmail="hello@rulesforge.com"
        websiteUrl="https://rulesforge.vercel.app"
        lastUpdated="2026-03-20"
      />
    </main>
  )
}
