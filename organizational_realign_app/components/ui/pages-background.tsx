'use client'

import { ReactNode } from 'react'

interface PagesBackgroundProps {
  children: ReactNode
  className?: string
  overlayOpacity?: number
}

export function PagesBackground({ 
  children, 
  className = '',
  overlayOpacity = 0.85
}: PagesBackgroundProps) {
  return (
    <div 
      className={`min-h-screen bg-cover bg-center bg-no-repeat relative ${className}`}
      style={{backgroundImage: 'url(/images/pages-background-60.jpg)'}}
    >
      <div 
        className="absolute inset-0 z-0 bg-white dark:bg-black" 
        style={{opacity: overlayOpacity}}
      ></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export function PagesBackgroundSection({ 
  children, 
  className = '',
  overlayOpacity = 0.95
}: PagesBackgroundProps) {
  return (
    <div 
      className={`bg-cover bg-center bg-no-repeat relative ${className}`}
      style={{backgroundImage: 'url(/images/pages-background-60.jpg)'}}
    >
      <div 
        className="absolute inset-0 z-0 bg-white dark:bg-black" 
        style={{opacity: overlayOpacity}}
      ></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
