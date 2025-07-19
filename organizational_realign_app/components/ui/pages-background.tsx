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
  overlayOpacity = 0.80
}: PagesBackgroundProps) {
  return (
    <div className={`min-h-screen relative ${className}`}>
      <div className="absolute inset-0 z-0">
        <ResponsiveImage
          src="/images/northpath_background_opt.jpg"
          alt=""
          fill
          className="object-cover"
          overlay={true}
          overlayType="gradient"
          overlayGradient="from-blue-900/70 to-indigo-900/80"
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
  overlayOpacity = 0.85
}: PagesBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 z-0">
        <ResponsiveImage
          src="/images/northpath_background_opt.jpg"
          alt=""
          fill
          className="object-cover"
          overlay={true}
          overlayType="gradient"
          overlayGradient="from-blue-900/80 to-indigo-900/85"
          overlayOpacity={overlayOpacity}
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
