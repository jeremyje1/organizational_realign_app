/* filepath: /components/accessibility/AccessibilityComponents.tsx */

'use client';

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { accessibilityManager, AccessibilityConfig } from '@/lib/accessibility/accessibility-manager';

interface AccessibilityContextType {
  config: AccessibilityConfig;
  updateConfig: (config: Partial<AccessibilityConfig>) => void;
  announceMessage: (message: string, priority?: 'polite' | 'assertive') => void;
}

interface AccessibilityPanelProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  showToggle?: boolean;
}

interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  onEscape?: () => void;
}

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

interface ScreenReaderOnlyProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

interface HighContrastToggleProps {
  className?: string;
}

interface FontSizeControlProps {
  className?: string;
}

interface MotionToggleProps {
  className?: string;
}

/**
 * Accessibility Context
 */
const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

/**
 * Accessibility Provider
 */
function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AccessibilityConfig>(accessibilityManager.getConfig());

  const updateConfig = (newConfig: Partial<AccessibilityConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    accessibilityManager.updateConfig(newConfig);
  };

  const announceMessage = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    accessibilityManager.announceToScreenReader(message, priority);
  };

  return (
    <AccessibilityContext.Provider value={{ config, updateConfig, announceMessage }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

/**
 * Hook to use accessibility context
 */
function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}

/**
 * Focus Trap Component
 */
function FocusTrap({ children, active = true, onEscape }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    container.classList.add('focus-trap');

    // Find first focusable element
    const focusableElements = accessibilityManager.getFocusableElements(container);
    firstFocusableRef.current = focusableElements[0]?.element || null;

    // Focus first element
    if (firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }

    // Handle escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onEscape) {
        onEscape();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      container.classList.remove('focus-trap');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, onEscape]);

  if (!active) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className="focus-trap">
      {children}
    </div>
  );
}

/**
 * Skip Link Component
 */
function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 
                 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded 
                 focus:text-sm focus:font-medium transition-all"
    >
      {children}
    </a>
  );
}

/**
 * Screen Reader Only Component
 */
function ScreenReaderOnly({ children, as: Component = 'span' }: ScreenReaderOnlyProps) {
  return <Component className="sr-only">{children}</Component>;
}

/**
 * High Contrast Toggle
 */
function HighContrastToggle({ className = '' }: HighContrastToggleProps) {
  const { config, updateConfig } = useAccessibility();

  const toggleHighContrast = () => {
    updateConfig({ enableHighContrast: !config.enableHighContrast });
  };

  return (
    <button
      onClick={toggleHighContrast}
      className={`flex items-center space-x-2 p-2 rounded transition-colors ${
        config.enableHighContrast 
          ? 'bg-indigo-600 text-white' 
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      } ${className}`}
      aria-pressed={config.enableHighContrast}
      aria-label={`${config.enableHighContrast ? 'Disable' : 'Enable'} high contrast mode`}
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 3v18m0-18a9 9 0 110 18m0-18a9 9 0 000 18" 
        />
      </svg>
      <span>High Contrast</span>
    </button>
  );
}

/**
 * Font Size Control
 */
function FontSizeControl({ className = '' }: FontSizeControlProps) {
  const { config, updateConfig } = useAccessibility();

  const fontSizes = [
    { key: 'small', label: 'Small', value: 'small' as const },
    { key: 'normal', label: 'Normal', value: 'normal' as const },
    { key: 'large', label: 'Large', value: 'large' as const },
    { key: 'extra-large', label: 'Extra Large', value: 'extra-large' as const },
  ];

  const changeFontSize = (size: AccessibilityConfig['fontSize']) => {
    updateConfig({ fontSize: size });
    
    // Apply font size to document
    const sizeMap = {
      'small': '14px',
      'normal': '16px',
      'large': '18px',
      'extra-large': '20px',
    };
    
    document.documentElement.style.fontSize = sizeMap[size];
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        Font Size
      </label>
      <div className="flex space-x-2">
        {fontSizes.map((size) => (
          <button
            key={size.key}
            onClick={() => changeFontSize(size.value)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              config.fontSize === size.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
            aria-pressed={config.fontSize === size.value}
            aria-label={`Set font size to ${size.label}`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Motion Toggle
 */
function MotionToggle({ className = '' }: MotionToggleProps) {
  const { config, updateConfig } = useAccessibility();

  const toggleMotion = () => {
    updateConfig({ reduceMotion: !config.reduceMotion });
  };

  return (
    <button
      onClick={toggleMotion}
      className={`flex items-center space-x-2 p-2 rounded transition-colors ${
        config.reduceMotion 
          ? 'bg-indigo-600 text-white' 
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      } ${className}`}
      aria-pressed={config.reduceMotion}
      aria-label={`${config.reduceMotion ? 'Enable' : 'Disable'} animations and motion`}
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M13 10V3L4 14h7v7l9-11h-7z" 
        />
      </svg>
      <span>Reduce Motion</span>
    </button>
  );
}

/**
 * Color Blindness Filter
 */
function ColorBlindnessFilter({ className = '' }: { className?: string }) {
  const { config, updateConfig } = useAccessibility();

  const filters = [
    { key: 'none', label: 'Normal Vision' },
    { key: 'protanopia', label: 'Protanopia (Red-blind)' },
    { key: 'deuteranopia', label: 'Deuteranopia (Green-blind)' },
    { key: 'tritanopia', label: 'Tritanopia (Blue-blind)' },
  ];

  const changeFilter = (mode: AccessibilityConfig['colorBlindnessMode']) => {
    updateConfig({ colorBlindnessMode: mode });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        Color Vision Simulation
      </label>
      <select
        value={config.colorBlindnessMode}
        onChange={(e) => changeFilter(e.target.value as AccessibilityConfig['colorBlindnessMode'])}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        aria-label="Select color vision simulation"
      >
        {filters.map((filter) => (
          <option key={filter.key} value={filter.key}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Accessibility Panel
 */
function AccessibilityPanel({ 
  position = 'bottom-right',
  showToggle = true 
}: AccessibilityPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { announceMessage } = useAccessibility();

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
    announceMessage(isOpen ? 'Accessibility panel closed' : 'Accessibility panel opened');
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {showToggle && (
        <button
          onClick={togglePanel}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 
                     transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Toggle accessibility panel"
          aria-expanded={isOpen}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
        </button>
      )}

      {isOpen && (
        <FocusTrap active={isOpen} onEscape={() => setIsOpen(false)}>
          <div 
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border p-6 w-80 space-y-4"
            role="dialog"
            aria-labelledby="accessibility-panel-title"
            aria-modal="true"
          >
            <div className="flex justify-between items-center">
              <h2 id="accessibility-panel-title" className="text-lg font-semibold text-gray-900">
                Accessibility Options
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close accessibility panel"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <HighContrastToggle className="w-full justify-center" />
              <MotionToggle className="w-full justify-center" />
              <FontSizeControl />
              <ColorBlindnessFilter />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                Settings are saved automatically
              </p>
            </div>
          </div>
        </FocusTrap>
      )}
    </div>
  );
}

/**
 * Accessible Form Field
 */
function AccessibleFormField({
  id,
  label,
  type = 'text',
  required = false,
  error,
  description,
  children,
  ...props
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  description?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  const errorId = error ? `${id}-error` : undefined;
  const descriptionId = description ? `${id}-description` : undefined;
  const ariaDescribedBy = [errorId, descriptionId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="space-y-1">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">*</span>
        )}
      </label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-gray-600">
          {description}
        </p>
      )}
      
      {children || (
        <input
          id={id}
          type={type}
          required={required}
          aria-describedby={ariaDescribedBy}
          aria-invalid={error ? 'true' : 'false'}
          className={`w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...props}
        />
      )}
      
      {error && (
        <p 
          id={errorId}
          className="text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Accessible Button
 */
function AccessibleButton({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  ariaLabel,
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  [key: string]: any;
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded transition-colors focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        (disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

// Export all components
export {
  AccessibilityProvider,
  useAccessibility,
  FocusTrap,
  SkipLink,
  ScreenReaderOnly,
  HighContrastToggle,
  FontSizeControl,
  MotionToggle,
  ColorBlindnessFilter,
  AccessibilityPanel,
  AccessibleFormField,
  AccessibleButton,
};

export default AccessibilityProvider;
