/**
 * Advanced React Patterns with Million.js Integration
 * High-performance component patterns for optimal rendering
 */
'use client'

import React, { memo, useCallback, useMemo, createContext, useContext, forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Compound Component Pattern
interface TabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

interface TabsProps {
  defaultTab?: string
  children: React.ReactNode
  className?: string
  onChange?: (tab: string) => void
}

export const Tabs = memo(({ defaultTab = '', children, className = '', onChange }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
    onChange?.(tab)
  }, [onChange])

  const contextValue = useMemo(() => ({
    activeTab,
    setActiveTab: handleTabChange
  }), [activeTab, handleTabChange])

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={`tabs-container ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  )
})
Tabs.displayName = 'Tabs'

export const TabsList = memo(({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex space-x-1 ${className}`} role="tablist">
    {children}
  </div>
))
TabsList.displayName = 'TabsList'

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export const TabsTrigger = memo(({ value, children, className = '', disabled = false }: TabsTriggerProps) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const { activeTab, setActiveTab } = context
  const isActive = activeTab === value

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      className={`
        relative px-4 py-2 text-sm font-medium transition-all duration-200
        ${isActive 
          ? 'text-primary-600 dark:text-primary-400' 
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={() => !disabled && setActiveTab(value)}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
          layoutId="activeTab"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  )
})
TabsTrigger.displayName = 'TabsTrigger'

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

export const TabsContent = memo(({ value, children, className = '' }: TabsContentProps) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  const { activeTab } = context
  const isActive = activeTab === value

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={value}
          id={`panel-${value}`}
          role="tabpanel"
          aria-labelledby={`tab-${value}`}
          className={className}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
})
TabsContent.displayName = 'TabsContent'

// Render Props Pattern
interface VirtualizedListProps<T> {
  items: T[]
  height: number
  itemHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
  overscan?: number
}

export function VirtualizedList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  className = '',
  overscan = 5
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  
  const visibleStart = Math.floor(scrollTop / itemHeight)
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(height / itemHeight),
    items.length - 1
  )
  
  const paddingTop = visibleStart * itemHeight
  const paddingBottom = (items.length - visibleEnd - 1) * itemHeight
  
  const visibleItems = items.slice(
    Math.max(0, visibleStart - overscan),
    Math.min(items.length, visibleEnd + 1 + overscan)
  )

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ paddingTop, paddingBottom }}>
        {visibleItems.map((item, index) => 
          renderItem(item, visibleStart + index)
        )}
      </div>
    </div>
  )
}

// Higher-Order Component Pattern
interface WithLoadingProps {
  isLoading: boolean
  error?: Error | null
  loadingComponent?: React.ComponentType
  errorComponent?: React.ComponentType<{ error: Error }>
}

export function withLoading<P extends object>(
  Component: React.ComponentType<P>,
  defaultLoadingComponent?: React.ComponentType,
  defaultErrorComponent?: React.ComponentType<{ error: Error }>
) {
  const WrappedComponent = memo((props: P & WithLoadingProps) => {
    const {
      isLoading,
      error,
      loadingComponent: LoadingComponent = defaultLoadingComponent,
      errorComponent: ErrorComponent = defaultErrorComponent,
      ...componentProps
    } = props

    if (error && ErrorComponent) {
      return <ErrorComponent error={error} />
    }

    if (isLoading && LoadingComponent) {
      return <LoadingComponent />
    }

    return <Component {...(componentProps as P)} />
  })
  
  WrappedComponent.displayName = `withLoading(${Component.displayName || Component.name || 'Component'})`
  
  return WrappedComponent
}

// Forward Ref Pattern with Generic Types
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    className = '',
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = useMemo(() => 
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      []
    )

    const variantClasses = useMemo(() => {
      const variants = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
        outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-primary-500',
        ghost: 'hover:bg-gray-100 text-gray-700 focus:ring-gray-500'
      }
      return variants[variant]
    }, [variant])

    const sizeClasses = useMemo(() => {
      const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
      }
      return sizes[size]
    }, [size])

    const finalClassName = useMemo(() => 
      `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`,
      [baseClasses, variantClasses, sizeClasses, className]
    )

    return (
      <motion.button
        ref={ref}
        className={finalClassName}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {leftIcon && !isLoading && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {rightIcon && !isLoading && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </motion.button>
    )
  }
)
Button.displayName = 'Button'

// Custom Hook Pattern for Complex State Logic
interface UseToggleReturn {
  isOn: boolean
  toggle: () => void
  setOn: () => void
  setOff: () => void
}

export function useToggle(initialValue = false): UseToggleReturn {
  const [isOn, setIsOn] = useState(initialValue)
  
  const toggle = useCallback(() => setIsOn(prev => !prev), [])
  const setOn = useCallback(() => setIsOn(true), [])
  const setOff = useCallback(() => setIsOn(false), [])
  
  return useMemo(() => ({
    isOn,
    toggle,
    setOn,
    setOff
  }), [isOn, toggle, setOn, setOff])
}

// Custom Hook for Local Storage with TypeScript
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const Fallback = this.props.fallback
        return <Fallback error={this.state.error} resetError={this.resetError} />
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              An unexpected error occurred. Please try again.
            </p>
            <Button onClick={this.resetError} variant="primary">
              Try Again
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
