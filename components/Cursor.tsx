'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 150 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(pointer: fine)').matches)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 1.5) // Center the 3px cursor
      cursorY.set(e.clientY - 1.5)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const links = document.querySelectorAll('a, button')
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleMouseEnter as any)
      link.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseEnter as any)
        link.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isDesktop, cursorX, cursorY])

  if (!isDesktop) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      />
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[9999]"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            mixBlendMode: 'difference',
          }}
        />
      )}
    </>
  )
}
