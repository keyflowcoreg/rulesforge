'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { PayNow } from '@/components/paynow'
import {
  frameworkOptions,
  styleOptions,
  teamSizeOptions,
  generateRules,
  proPackFiles,
  type Framework,
  type StyleOption,
  type TeamSize,
} from '@/lib/rules-data'
import EmailCapture from '@/components/EmailCapture'
import { FAQAccordion } from '@/components/FAQAccordion'

function FadeInUp({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const router = useRouter()
  const [framework, setFramework] = useState<Framework>('Next.js')
  const [selectedStyles, setSelectedStyles] = useState<StyleOption[]>(['Strict TypeScript'])
  const [teamSize, setTeamSize] = useState<TeamSize>('Solo')
  const [generatedRules, setGeneratedRules] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleStyle = (style: StyleOption) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    )
  }

  const handleGenerate = () => {
    const rules = generateRules(framework, selectedStyles, teamSize)
    setGeneratedRules(rules)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedRules)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800/50 sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center text-black font-bold text-sm">
              RF
            </div>
            <span className="text-lg font-semibold tracking-tight">RulesForge</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#generator" className="hover:text-white transition-colors">Generator</a>
            <a href="#pro-pack" className="hover:text-white transition-colors">Pro Pack</a>
            <a href="#compare" className="hover:text-white transition-colors">Compare</a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden flex items-center justify-center h-10 w-10 rounded-lg text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-md px-4 py-3 space-y-1">
            <a href="#generator" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-zinc-400 hover:text-white transition-colors">Generator</a>
            <a href="#pro-pack" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-zinc-400 hover:text-white transition-colors">Pro Pack</a>
            <a href="#compare" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-zinc-400 hover:text-white transition-colors">Compare</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-20">
        <FadeInUp>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 sm:px-4 py-1.5 text-xs text-cyan-400 mb-6 sm:mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Works with Claude Code, Cursor, Windsurf, Copilot
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
              Stop writing AI rules{' '}
              <span className="text-cyan-400">from scratch.</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Generate production-ready configs in 10 seconds. Battle-tested rules for{' '}
              <span className="text-white">Claude Code</span> /{' '}
              <span className="text-white">Cursor</span> /{' '}
              <span className="text-white">Windsurf</span> /{' '}
              <span className="text-white">Copilot</span> — one tool for all.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="#generator"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-cyan-500 px-6 py-3 min-h-[44px] text-sm font-semibold text-black hover:bg-cyan-400 transition-colors"
              >
                Generate Free Rules
              </a>
              <a
                href="#pro-pack"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-zinc-700 px-6 py-3 min-h-[44px] text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
              >
                Get Pro Pack — $29
              </a>
            </div>
          </div>
        </FadeInUp>
      </section>

      {/* Generator Section */}
      <section id="generator" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <FadeInUp>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Free Rules Generator</h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-zinc-400">Pick your stack, customize preferences, get production-ready rules.</p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Form */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6 space-y-5 sm:space-y-6">
              {/* Framework */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Framework / Language</label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value as Framework)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 min-h-[44px] text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
                >
                  {frameworkOptions.map((fw) => (
                    <option key={fw} value={fw}>
                      {fw}
                    </option>
                  ))}
                </select>
              </div>

              {/* Style Preferences */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">Style Preferences</label>
                <div className="flex flex-wrap gap-2">
                  {styleOptions.map((style) => (
                    <motion.button
                      key={style}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleStyle(style)}
                      className={`rounded-lg px-3 py-2 min-h-[36px] text-xs font-medium border transition-colors ${
                        selectedStyles.includes(style)
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                          : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      {style}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Team Size */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">Team Size</label>
                <div className="flex gap-2">
                  {teamSizeOptions.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setTeamSize(size)}
                      className={`flex-1 rounded-lg px-3 py-2.5 min-h-[44px] text-xs font-medium border transition-colors ${
                        teamSize === size
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                          : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleGenerate}
                className="w-full rounded-lg bg-cyan-500 px-6 py-3 min-h-[48px] text-sm font-semibold text-black hover:bg-cyan-400 transition-colors"
              >
                Generate Rules
              </motion.button>
            </div>

            {/* Output */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-zinc-700" />
                    <span className="h-3 w-3 rounded-full bg-zinc-700" />
                    <span className="h-3 w-3 rounded-full bg-zinc-700" />
                  </div>
                  <span className="text-xs text-zinc-400 ml-2">
                    {generatedRules ? 'CLAUDE.md' : 'output'}
                  </span>
                </div>
                {generatedRules && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="text-xs text-zinc-400 hover:text-white transition-colors px-3 py-1.5 min-h-[36px] rounded border border-zinc-700 hover:border-zinc-500 flex items-center"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.button>
                )}
              </div>
              <div className="p-4 h-[350px] sm:h-[400px] overflow-auto">
                {generatedRules ? (
                  <pre className="text-[11px] sm:text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed break-words">
                    {generatedRules}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-zinc-400 text-sm text-center px-4">
                    Select your stack and click &quot;Generate Rules&quot; to see output
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Post-generate CTA nudge */}
        {generatedRules && (
          <FadeInUp delay={0.15}>
            <div className="mt-6 sm:mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 sm:p-6 text-center">
              <p className="text-sm text-zinc-400 mb-1">
                Want all 50 rule files for 15+ frameworks? Pre-built, production-tested, updated monthly.
              </p>
              <a href="#pro-pack" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                Get the Pro Pack for $29 &rarr;
              </a>
            </div>
          </FadeInUp>
        )}
      </section>

      {/* Pro Pack Section */}
      <section id="pro-pack" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <FadeInUp>
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent p-5 sm:p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400 mb-4 sm:mb-6">
                  PRO PACK
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  50 battle-tested rule files for{' '}
                  <span className="text-cyan-400">15+ frameworks.</span>
                </h2>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
                  Skip weeks of trial and error. Get production-proven rules used by teams shipping real products.
                  Works with Claude Code, Cursor, Windsurf, and GitHub Copilot.
                </p>

                <ul className="mt-6 sm:mt-8 space-y-3">
                  {[
                    'Tested in production by real teams',
                    'Stack-specific — not generic templates',
                    'Updated monthly with new frameworks',
                    'Commercial license — use in any project',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 text-xs shrink-0">
                        &#10003;
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 sm:mt-10 flex items-end gap-3">
                  <span className="text-4xl sm:text-5xl font-bold text-white">$29</span>
                  <span className="text-zinc-400 text-sm mb-1">USDC / one-time</span>
                </div>

                <div className="mt-6 max-w-sm">
                  <PayNow
                    productName="RulesForge Pro Pack"
                    price={29}
                    description="50 battle-tested rule files for 15+ frameworks"
                    onSuccess={() => router.push('/success')}
                    accentColor="#06b6d4"
                  />
                </div>
              </div>

              {/* File list preview */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 overflow-hidden">
                <div className="border-b border-zinc-800 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-zinc-700" />
                    <span className="h-3 w-3 rounded-full bg-zinc-700" />
                    <span className="h-3 w-3 rounded-full bg-zinc-700" />
                  </div>
                  <span className="text-xs text-zinc-400 ml-2">rulesforge-pro-pack/</span>
                </div>
                <div className="p-2 sm:p-3 h-[300px] sm:h-[400px] overflow-auto space-y-0.5 sm:space-y-1">
                  {proPackFiles.slice(0, 20).map((file, i) => (
                    <motion.div
                      key={file.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                      className="flex items-center gap-2 sm:gap-3 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs hover:bg-zinc-800/50 transition-colors"
                    >
                      <span className="text-cyan-400 shrink-0">&#9702;</span>
                      <span className="text-zinc-300 font-medium shrink-0 text-[11px] sm:text-xs">{file.name}</span>
                      <span className="text-zinc-400 truncate hidden sm:inline">{file.description}</span>
                    </motion.div>
                  ))}
                  <div className="px-2 sm:px-3 py-2 text-xs text-zinc-400">
                    <span className="text-zinc-400">... and {proPackFiles.length - 20} more files</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </section>

      {/* Comparison Section */}
      <section id="compare" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <FadeInUp>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Free vs Pro</h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-zinc-400">Choose the right option for your workflow.</p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="mx-auto max-w-3xl">
            {/* Desktop table */}
            <div className="hidden sm:block rounded-xl border border-zinc-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/50">
                    <th className="px-4 sm:px-6 py-4 text-left text-zinc-400 font-medium">Feature</th>
                    <th className="px-4 sm:px-6 py-4 text-center text-zinc-400 font-medium">Free</th>
                    <th className="px-4 sm:px-6 py-4 text-center font-medium text-cyan-400">Pro ($29)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Rule generation', 'yes', 'yes'],
                    ['Frameworks', '11', '15+'],
                    ['Output formats', 'CLAUDE.md', 'CLAUDE.md + .cursorrules + .windsurf + Copilot'],
                    ['Pre-built rule files', '--', '50 files'],
                    ['Stack-specific optimizations', '--', 'yes'],
                    ['Monthly updates', '--', 'yes'],
                    ['Commercial license', '--', 'yes'],
                    ['Tool-specific variants', '--', 'yes'],
                    ['Team conventions', 'Basic', 'Enterprise-ready'],
                    ['Priority support', '--', 'yes'],
                  ].map(([feature, free, pro]) => (
                    <tr key={feature} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                      <td className="px-4 sm:px-6 py-3 text-zinc-300">{feature}</td>
                      <td className="px-4 sm:px-6 py-3 text-center text-zinc-500">
                        {free === 'yes' ? (
                          <span className="text-zinc-300">&#10003;</span>
                        ) : free === '--' ? (
                          <span className="text-zinc-500">--</span>
                        ) : (
                          free
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-center">
                        {pro === 'yes' ? (
                          <span className="text-cyan-400">&#10003;</span>
                        ) : (
                          <span className="text-cyan-400">{pro}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile comparison cards */}
            <div className="sm:hidden space-y-3">
              {[
                ['Rule generation', 'yes', 'yes'],
                ['Frameworks', '11', '15+'],
                ['Output formats', 'CLAUDE.md', 'All formats'],
                ['Pre-built rule files', '--', '50 files'],
                ['Stack-specific optimizations', '--', 'yes'],
                ['Monthly updates', '--', 'yes'],
                ['Commercial license', '--', 'yes'],
                ['Tool-specific variants', '--', 'yes'],
                ['Team conventions', 'Basic', 'Enterprise-ready'],
                ['Priority support', '--', 'yes'],
              ].map(([feature, free, pro]) => (
                <div key={feature} className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
                  <div className="text-sm font-medium text-zinc-300 mb-2">{feature}</div>
                  <div className="flex justify-between text-xs">
                    <div className="text-zinc-500">
                      <span className="text-zinc-400 mr-1">Free:</span>
                      {free === 'yes' ? (
                        <span className="text-zinc-300">&#10003;</span>
                      ) : free === '--' ? (
                        <span className="text-zinc-500">--</span>
                      ) : (
                        free
                      )}
                    </div>
                    <div>
                      <span className="text-zinc-400 mr-1">Pro:</span>
                      {pro === 'yes' ? (
                        <span className="text-cyan-400">&#10003;</span>
                      ) : (
                        <span className="text-cyan-400">{pro}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="max-w-sm mx-auto">
                <PayNow
                  productName="RulesForge Pro Pack"
                  price={29}
                  description="50 battle-tested rule files for 15+ frameworks"
                  onSuccess={() => router.push('/success')}
                  accentColor="#06b6d4"
                />
              </div>
            </div>
          </div>
        </FadeInUp>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <FadeInUp>
          <FAQAccordion
            heading="Frequently Asked Questions"
            items={[
              {
                question: 'What AI coding tools does RulesForge support?',
                answer: 'RulesForge generates rules for Claude Code (CLAUDE.md), Cursor (.cursorrules), Windsurf (.windsurfrules), and GitHub Copilot (.github/copilot-instructions.md). The Pro Pack includes pre-built rule files for all four tools.',
              },
              {
                question: 'What is included in the Pro Pack?',
                answer: 'The Pro Pack includes 50 battle-tested rule files covering 15+ frameworks. Each file is stack-specific, tested in production, and includes tool-specific variants for Claude Code, Cursor, Windsurf, and Copilot. You also get monthly updates and a commercial license.',
              },
              {
                question: 'Can I use the free generator for commercial projects?',
                answer: 'Yes. The free generator output is yours to use in any project, personal or commercial. The Pro Pack adds a formal commercial license with additional guarantees and support.',
              },
              {
                question: 'How are rules different from generic prompts?',
                answer: 'Rules are persistent configuration files that shape how AI coding tools behave across your entire project. Unlike prompts, they are loaded automatically on every interaction and enforce consistent code style, architecture patterns, and team conventions.',
              },
              {
                question: 'Do I get updates after purchasing the Pro Pack?',
                answer: 'Yes. The Pro Pack is a one-time purchase of $29 USDC that includes monthly updates with new frameworks, improved rules, and support for the latest tool versions. No subscription required.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept credit/debit cards, Apple Pay, and USDC cryptocurrency via Coinbase Onramp. All payments are processed securely.',
              },
            ]}
          />
        </FadeInUp>
      </section>

      {/* Email Capture */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-20">
        <FadeInUp>
          <div className="max-w-lg mx-auto">
            <EmailCapture
              heading="Get notified of new rule templates"
              description="Join 500+ developers. Free updates when we add new frameworks."
              buttonText="Subscribe"
              accentColor="#06b6d4"
            />
          </div>
        </FadeInUp>
      </section>

      {/* Cross-sell Footer */}
      <section className="border-t border-zinc-800/50 mt-12 sm:mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <FadeInUp>
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-sm text-zinc-400 uppercase tracking-wider">From AI Business Factory</p>
              <h3 className="mt-2 text-lg sm:text-xl font-bold tracking-tight">More tools for builders</h3>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {[
                {
                  name: 'Veloce Kit',
                  desc: 'Launch your SaaS in 48 hours. Next.js boilerplate with auth, payments, and AI built in.',
                  price: '$247',
                  href: 'https://velocekit.com',
                },
                {
                  name: 'PageForge',
                  desc: 'AI landing pages that convert. Generate, deploy, and optimize in minutes.',
                  price: '$49/mo',
                  href: 'https://pageforge.ai',
                },
                {
                  name: 'PromptForge',
                  desc: 'Premium prompt library for developers. 200+ tested prompts for coding, writing, analysis.',
                  price: '$19',
                  href: 'https://promptforge.dev',
                },
              ].map((product) => (
                <motion.a
                  key={product.name}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.3)' }}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 sm:p-5 transition-colors hover:bg-zinc-900/60 block"
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-sm font-semibold text-white">{product.name}</span>
                    <span className="text-xs text-cyan-400 font-medium">{product.price}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{product.desc}</p>
                </motion.a>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-zinc-400">
          <p>&copy; {new Date().getFullYear()} RulesForge. An AI Business Factory product.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <span>Card, Apple Pay, USDC accepted</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
