import Link from 'next/link'
import { getSettings } from '@/lib/sanity/queries'

export default async function Footer() {
  const settings = await getSettings()

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">buerojung</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Creative agency for digital solutions
            </p>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-wider text-white/60 mb-4 font-medium">Navigation</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/archive" className="text-sm text-white/60 hover:text-white transition-colors">
                Archive
              </Link>
              <Link href="/service" className="text-sm text-white/60 hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-wider text-white/60 mb-4 font-medium">Contact</h4>
            <div className="flex flex-col gap-2">
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {settings.email}
                </a>
              )}
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {settings.phone}
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-wider text-white/60 mb-4 font-medium">Social</h4>
            <div className="flex flex-col gap-2">
              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              )}
              {settings?.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {settings?.behance && (
                <a
                  href={settings.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Behance
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-sm text-white/40">
          <p>© {new Date().getFullYear()} buerojung. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
