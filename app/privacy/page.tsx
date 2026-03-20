import { PrivacyPolicy } from './PrivacyPolicy'

export const metadata = {
  title: 'Privacy Policy — RulesForge',
  description: 'Privacy Policy for RulesForge by AI Business Factory.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="border-b border-zinc-800/50 py-4 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
            &larr; Back to RulesForge
          </a>
        </div>
      </div>
      <PrivacyPolicy
        companyName="AI Business Factory"
        contactEmail="hello@rulesforge.com"
        websiteUrl="https://rulesforge.vercel.app"
        lastUpdated="2026-03-20"
      />
    </main>
  )
}
