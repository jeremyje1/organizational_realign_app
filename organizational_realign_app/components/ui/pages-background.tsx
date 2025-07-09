'use client'

import { ReactNode } from 'react'
import ResponsiveImage from './responsive-image'

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
    <div className={`min-h-screen relative ${className}`}>
      <div className="absolute inset-0 z-0">
        <ResponsiveImage
          src="/images/pages-background-60.jpg"
          alt=""
          fill
          className="object-cover"
          overlay={true}
          overlayType="solid"
          overlayColor="#ffffff"
          overlayOpacity={overlayOpacity}
        />
      </div>
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
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 z-0">
        <ResponsiveImage
          src="/images/pages-background-60.jpg"
          alt=""
          fill
          className="object-cover"
          overlay={true}
          overlayType="solid"
          overlayColor="#ffffff"
          overlayOpacity={overlayOpacity}
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
