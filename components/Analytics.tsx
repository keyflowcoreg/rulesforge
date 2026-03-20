'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function Analytics({ product }: { product: string }) {
  const pathname = usePathname()

  useEffect(() => {
    // Only send analytics to the hub when running locally (same machine)
    if (typeof window === 'undefined') return
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      fetch(`http://localhost:4000/api/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, path: pathname })
      }).catch(() => {}) // fire and forget
    }
  }, [pathname, product])

  return null
}
