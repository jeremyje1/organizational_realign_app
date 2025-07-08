'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface PWAInstallProps {
  children?: React.ReactNode
}

export default function PWAInstall({ children }: PWAInstallProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('SW registered: ', registration)
          
          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  toast('App updated! Refresh to see changes.', {
                    duration: 5000,
                    position: 'bottom-center',
                  })
                }
              })
            }
          })
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    // Handle app installed
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
      toast.success('NorthPath app installed successfully!')
    }

    // Check if already installed
    const checkIfInstalled = () => {
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    checkIfInstalled()

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }
    
    setDeferredPrompt(null)
    setIsInstallable(false)
  }

  return (
    <>
      {children}
      
      {/* Install Banner */}
      {isInstallable && !isInstalled && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold">Install NorthPath App</h3>
              <p className="text-sm opacity-90">
                Get faster access and offline capabilities
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsInstallable(false)}
                className="px-3 py-1 text-sm bg-white/20 rounded hover:bg-white/30 transition-colors"
              >
                Dismiss
              </button>
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 text-sm bg-white text-blue-600 rounded font-medium hover:bg-gray-100 transition-colors"
              >
                Install
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Hook for PWA features
export function usePWA() {
  const [isOnline, setIsOnline] = useState(true)
  const [isInstalled, setIsInstalled] = useState(false)
  const [canInstall, _setCanInstall] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    setIsOnline(navigator.onLine)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check if installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const requestPersistentStorage = async () => {
    if ('storage' in navigator && 'persist' in navigator.storage) {
      const result = await navigator.storage.persist()
      return result
    }
    return false
  }

  const getStorageEstimate = async () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      return await navigator.storage.estimate()
    }
    return null
  }

  const addToHomeScreen = () => {
    // This would trigger the install prompt if available
    const event = new CustomEvent('show-install-prompt')
    window.dispatchEvent(event)
  }

  return {
    isOnline,
    isInstalled,
    canInstall,
    requestPersistentStorage,
    getStorageEstimate,
    addToHomeScreen,
  }
}
