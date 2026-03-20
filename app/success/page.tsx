'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const PRO_PACK_FILES = [
  { name: 'nextjs-strict.md', category: 'Next.js' },
  { name: 'nextjs-app-router.md', category: 'Next.js' },
  { name: 'nextjs-api-routes.md', category: 'Next.js' },
  { name: 'nextjs-performance.md', category: 'Next.js' },
  { name: 'react-hooks.md', category: 'React' },
  { name: 'react-patterns.md', category: 'React' },
  { name: 'react-testing.md', category: 'React' },
  { name: 'typescript-strict.md', category: 'TypeScript' },
  { name: 'typescript-generics.md', category: 'TypeScript' },
  { name: 'typescript-patterns.md', category: 'TypeScript' },
  { name: 'tailwind-conventions.md', category: 'Tailwind' },
  { name: 'tailwind-components.md', category: 'Tailwind' },
  { name: 'node-express.md', category: 'Node.js' },
  { name: 'node-fastify.md', category: 'Node.js' },
  { name: 'node-security.md', category: 'Node.js' },
  { name: 'python-django.md', category: 'Python' },
  { name: 'python-fastapi.md', category: 'Python' },
  { name: 'python-typing.md', category: 'Python' },
  { name: 'rust-ownership.md', category: 'Rust' },
  { name: 'rust-error-handling.md', category: 'Rust' },
  { name: 'go-idioms.md', category: 'Go' },
  { name: 'go-concurrency.md', category: 'Go' },
  { name: 'swift-ui.md', category: 'Swift' },
  { name: 'kotlin-coroutines.md', category: 'Kotlin' },
  { name: 'sql-optimization.md', category: 'Database' },
  { name: 'prisma-patterns.md', category: 'Database' },
  { name: 'drizzle-patterns.md', category: 'Database' },
  { name: 'docker-best-practices.md', category: 'DevOps' },
  { name: 'ci-cd-pipeline.md', category: 'DevOps' },
  { name: 'git-workflow.md', category: 'DevOps' },
  { name: 'testing-unit.md', category: 'Testing' },
  { name: 'testing-integration.md', category: 'Testing' },
  { name: 'testing-e2e.md', category: 'Testing' },
  { name: 'vitest-config.md', category: 'Testing' },
  { name: 'security-auth.md', category: 'Security' },
  { name: 'security-input.md', category: 'Security' },
  { name: 'api-design-rest.md', category: 'API Design' },
  { name: 'api-design-graphql.md', category: 'API Design' },
  { name: 'api-design-trpc.md', category: 'API Design' },
  { name: 'monorepo-turborepo.md', category: 'Architecture' },
  { name: 'monorepo-nx.md', category: 'Architecture' },
  { name: 'clean-architecture.md', category: 'Architecture' },
  { name: 'error-handling.md', category: 'Best Practices' },
  { name: 'logging-observability.md', category: 'Best Practices' },
  { name: 'code-review.md', category: 'Best Practices' },
  { name: 'naming-conventions.md', category: 'Best Practices' },
  { name: 'performance-web.md', category: 'Performance' },
  { name: 'performance-server.md', category: 'Performance' },
  { name: 'accessibility-a11y.md', category: 'A11y' },
  { name: 'seo-technical.md', category: 'SEO' },
]

const CROSS_SELL = [
  { name: 'PromptForge', href: 'https://promptforge.dev', desc: '200+ production AI prompts', price: '$19' },
  { name: 'Veloce Kit', href: 'https://velocekit.com', desc: 'Launch SaaS in 48 hours', price: '$247' },
  { name: 'PageForge', href: 'https://pageforge.ai', desc: 'AI landing pages that convert', price: '$49/mo' },
]

const categories = [...new Set(PRO_PACK_FILES.map(f => f.category))]

export default function SuccessPage() {
  const [showCheck, setShowCheck] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [expandedCat, setExpandedCat] = useState<string | null>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setShowCheck(true), 300)
    const t2 = setTimeout(() => setShowContent(true), 800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const handleDownload = async () => {
    try {
      const res = await fetch('/api/download')
      if (!res.ok) throw new Error('Download failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'rulesforge-pro-pack.zip'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('Download failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes confetti-fall-2 {
          0% { transform: translateY(-100vh) rotate(0deg) scale(0.8); opacity: 1; }
          100% { transform: translateY(100vh) rotate(-540deg) scale(0.3); opacity: 0; }
        }
        .confetti-piece {
          position: fixed;
          top: -20px;
          z-index: 50;
          pointer-events: none;
        }
        @keyframes check-draw {
          0% { stroke-dashoffset: 50; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes circle-fill {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-check-draw {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: check-draw 0.5s ease-out 0.5s forwards;
        }
        .animate-circle-fill {
          animation: circle-fill 0.5s ease-out forwards;
        }
        .animate-fade-up {
          opacity: 0;
          animation: fade-up 0.5s ease-out forwards;
        }
      `}</style>

      {/* Confetti particles */}
      {showCheck && Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            backgroundColor: ['#10B981', '#34D399', '#8B5CF6', '#A78BFA', '#F59E0B', '#3B82F6', '#EC4899', '#6366F1'][i % 8],
            borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '2px' : '0',
            animation: `${i % 2 === 0 ? 'confetti-fall' : 'confetti-fall-2'} ${2 + Math.random() * 3}s ease-out ${Math.random() * 1.5}s forwards`,
          }}
        />
      ))}

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Checkmark */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-500/10 flex items-center justify-center ${showCheck ? 'animate-circle-fill' : 'opacity-0'}`}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="#10B981" strokeWidth="3" opacity="0.3" />
              <path
                d="M14 24L21 31L34 18"
                stroke="#10B981"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className={showCheck ? 'animate-check-draw' : ''}
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        {showContent && (
          <div className="text-center mb-8 sm:mb-10 animate-fade-up">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Payment Confirmed!</h1>
            <p className="text-zinc-400 text-base sm:text-lg">Pro Pack unlocked &mdash; 50 rule files</p>
          </div>
        )}

        {/* Download button */}
        {showContent && (
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <button
              onClick={handleDownload}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 min-h-[52px] rounded-xl font-semibold text-base sm:text-lg transition-colors flex items-center justify-center gap-3 mb-6 sm:mb-8"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download ZIP (50 rule files)
            </button>
          </div>
        )}

        {/* File list by category */}
        {showContent && (
          <div className="animate-fade-up mb-8 sm:mb-10" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-emerald-400">Files included</h2>
            <div className="space-y-2">
              {categories.map((cat) => {
                const files = PRO_PACK_FILES.filter(f => f.category === cat)
                const isExpanded = expandedCat === cat
                return (
                  <div key={cat} className="bg-[#18181b] border border-[#27272a] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedCat(isExpanded ? null : cat)}
                      className="w-full flex items-center justify-between px-3 sm:px-4 py-3 min-h-[44px] text-left hover:bg-[#27272a]/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <span className="text-sm font-medium">{cat}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400">{files.length}</span>
                        <svg
                          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2"
                          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="border-t border-[#27272a] px-3 sm:px-4 py-2">
                        {files.map((file) => (
                          <div key={file.name} className="flex items-center gap-2 py-1.5 text-sm text-zinc-400">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2" className="shrink-0">
                              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                            <span className="font-mono text-xs break-all">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        {showContent && (
          <div className="animate-fade-up mb-12 sm:mb-16" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/"
              className="block text-center bg-[#18181b] border border-[#27272a] hover:border-emerald-500/40 text-emerald-400 py-4 min-h-[48px] rounded-xl font-semibold transition-colors flex items-center justify-center"
            >
              Browse rules &rarr;
            </Link>
          </div>
        )}

        {/* Cross-sell */}
        {showContent && (
          <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="border-t border-[#27272a] pt-8 sm:pt-10">
              <p className="text-sm text-zinc-400 text-center mb-4 sm:mb-6">More tools from AI Business Factory</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CROSS_SELL.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 min-h-[44px] hover:border-emerald-500/30 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm group-hover:text-emerald-400 transition-colors">{item.name}</span>
                      <span className="text-xs text-emerald-500">{item.price}</span>
                    </div>
                    <p className="text-xs text-zinc-400">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
