'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/archive', label: 'Archive' },
  { href: '/service', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    async function loadSettings() {
      const data = await client.fetch(groq`*[_type == "settings"][0]`)
      setSettings(data)
    }
    loadSettings()
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 lg:px-12 py-6 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50 group">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center group-hover:opacity-80 transition-opacity">
            <span className="text-[#0a0a0a] text-xs font-bold">BJ</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            buerojung
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm uppercase tracking-wider text-white/80 hover:text-white transition-colors"
              >
                {item.label}
                {isActive && (
                  <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-white/60">
                    ›
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="hidden md:block px-6 py-3 bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors rounded-sm z-50"
        >
          BOOK A DISCOVERY SESSION
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
          aria-label="Menu"
        >
          <motion.span
            className="w-7 h-0.5 bg-white block"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 8 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-7 h-0.5 bg-white block"
            animate={{
              opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-7 h-0.5 bg-white block"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -8 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#0a0a0a] z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-40 flex flex-col justify-between p-12 md:hidden"
            >
              <nav className="flex flex-col gap-6">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl sm:text-5xl font-bold tracking-tight hover:opacity-60 transition-opacity text-white"
                      style={{
                        opacity: isActive ? 1 : 0.7,
                      }}
                    >
                      <motion.span
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  )
                })}
              </nav>

              {/* Social Links in Footer */}
              <div className="flex flex-wrap gap-6">
                {settings?.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {settings?.linkedin && (
                  <a
                    href={settings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {settings?.behance && (
                  <a
                    href={settings.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                  >
                    Behance
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
