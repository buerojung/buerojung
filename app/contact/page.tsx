'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import SectionHeading from '@/components/SectionHeading'

export default function ContactPage() {
  const [settings, setSettings] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    async function loadSettings() {
      const data = await client.fetch(groq`*[_type == "settings"][0]`)
      setSettings(data)
    }
    loadSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="pt-20 min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="mb-12 sm:mb-16">
          <SectionHeading
            label="CONTACT"
            title="Get In Touch"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-lg sm:text-xl text-white/60 mb-12 leading-relaxed">
              Have a project in mind? Let's talk about it. We're always open to discussing
              new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm uppercase tracking-wider text-white/60 mb-3 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white text-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm uppercase tracking-wider text-white/60 mb-3 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white text-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm uppercase tracking-wider text-white/60 mb-3 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={8}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors resize-none text-white text-lg"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-5 bg-white text-[#0a0a0a] rounded-full text-lg font-bold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg text-green-400"
                >
                  Thank you! Your message has been sent.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg text-red-400"
                >
                  An error occurred. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6 text-lg text-white/60">
                {settings?.email && (
                  <p>
                    <strong className="text-white">Email:</strong>{' '}
                    <a
                      href={`mailto:${settings.email}`}
                      className="hover:text-white transition-colors"
                    >
                      {settings.email}
                    </a>
                  </p>
                )}
                {settings?.phone && (
                  <p>
                    <strong className="text-white">Phone:</strong>{' '}
                    <a
                      href={`tel:${settings.phone}`}
                      className="hover:text-white transition-colors"
                    >
                      {settings.phone}
                    </a>
                  </p>
                )}
                {settings?.address && (
                  <p>
                    <strong className="text-white">Address:</strong>
                    <br />
                    {settings.address}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-12 border-t border-white/10">
              <h3 className="text-xl font-bold mb-6">Office Hours</h3>
              <p className="text-lg text-white/60">
                Monday - Friday<br />
                9:00 AM - 6:00 PM
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
