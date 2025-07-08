/* filepath: /lib/accessibility/accessibility-manager.ts */

export interface AccessibilityConfig {
  enableHighContrast: boolean;
  fontSize: 'small' | 'normal' | 'large' | 'extra-large';
  reduceMotion: boolean;
  enableScreenReader: boolean;
  keyboardNavigation: boolean;
  focusVisible: boolean;
  colorBlindnessMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}

export interface AccessibilityReport {
  violations: AccessibilityViolation[];
  warnings: AccessibilityWarning[];
  score: number;
  totalElements: number;
  recommendations: string[];
}

export interface AccessibilityViolation {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  element: string;
  help: string;
  helpUrl: string;
}

export interface AccessibilityWarning {
  id: string;
  description: string;
  element: string;
  suggestion: string;
}

export interface FocusableElement {
  element: HTMLElement;
  tabIndex: number;
  visible: boolean;
  enabled: boolean;
}

/**
 * Advanced Accessibility Manager
 * Provides comprehensive accessibility features and monitoring
 */
export class AccessibilityManager {
  private config: AccessibilityConfig;
  private observers: MutationObserver[] = [];
  private focusHistory: HTMLElement[] = [];
  private skipLinks: HTMLElement[] = [];
  private landmarks: Map<string, HTMLElement[]> = new Map();
  private isMonitoring = false;

  constructor(config?: Partial<AccessibilityConfig>) {
    this.config = {
      enableHighContrast: false,
      fontSize: 'normal',
      reduceMotion: false,
      enableScreenReader: false,
      keyboardNavigation: true,
      focusVisible: true,
      colorBlindnessMode: 'none',
      ...config,
    };

    this.initializeAccessibility();
  }

  /**
   * Initialize accessibility features
   */
  private initializeAccessibility(): void {
    if (typeof window === 'undefined') return;

    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupHighContrast();
    this.setupReducedMotion();
    this.setupScreenReaderSupport();
    this.setupColorBlindnessSupport();
    this.createSkipLinks();
    this.startMonitoring();
  }

  /**
   * Setup keyboard navigation
   */
  private setupKeyboardNavigation(): void {
    if (!this.config.keyboardNavigation) return;

    document.addEventListener('keydown', (event) => {
      // Escape key handling
      if (event.key === 'Escape') {
        this.handleEscapeKey();
      }

      // Tab trapping for modals
      if (event.key === 'Tab') {
        this.handleTabKey(event);
      }

      // Arrow key navigation for custom components
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        this.handleArrowKeys(event);
      }

      // Enter and Space for custom interactive elements
      if (event.key === 'Enter' || event.key === ' ') {
        this.handleActivationKeys(event);
      }
    });

    // Show focus indicators for keyboard users
    document.addEventListener('keydown', () => {
      document.body.classList.add('keyboard-user');
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-user');
    });
  }

  /**
   * Setup focus management
   */
  private setupFocusManagement(): void {
    if (!this.config.focusVisible) return;

    // Track focus history
    document.addEventListener('focusin', (event) => {
      if (event.target instanceof HTMLElement) {
        this.focusHistory.push(event.target);
        if (this.focusHistory.length > 10) {
          this.focusHistory.shift();
        }
      }
    });

    // Add focus visible styles
    const style = document.createElement('style');
    style.textContent = `
      .keyboard-user *:focus {
        outline: 2px solid #4f46e5 !important;
        outline-offset: 2px !important;
      }
      
      .focus-trap {
        position: relative;
      }
      
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Setup high contrast mode
   */
  private setupHighContrast(): void {
    if (this.config.enableHighContrast) {
      document.body.classList.add('high-contrast');
      
      const style = document.createElement('style');
      style.textContent = `
        .high-contrast {
          filter: contrast(200%) !important;
        }
        
        .high-contrast * {
          text-shadow: none !important;
          box-shadow: none !important;
        }
        
        .high-contrast a {
          text-decoration: underline !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Setup reduced motion preferences
   */
  private setupReducedMotion(): void {
    if (this.config.reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduce-motion');
      
      const style = document.createElement('style');
      style.textContent = `
        .reduce-motion *,
        .reduce-motion *::before,
        .reduce-motion *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Setup screen reader support
   */
  private setupScreenReaderSupport(): void {
    if (!this.config.enableScreenReader) return;

    // Add ARIA live regions
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);

    // Add status region for alerts
    const statusRegion = document.createElement('div');
    statusRegion.setAttribute('aria-live', 'assertive');
    statusRegion.setAttribute('aria-atomic', 'true');
    statusRegion.className = 'sr-only';
    statusRegion.id = 'status-region';
    document.body.appendChild(statusRegion);
  }

  /**
   * Setup color blindness support
   */
  private setupColorBlindnessSupport(): void {
    if (this.config.colorBlindnessMode === 'none') return;

    const filters = {
      protanopia: 'url(#protanopia)',
      deuteranopia: 'url(#deuteranopia)',
      tritanopia: 'url(#tritanopia)',
    };

    // Create SVG filters for color blindness simulation
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('style', 'position: absolute; width: 0; height: 0');
    svg.innerHTML = `
      <defs>
        <filter id="protanopia">
          <feColorMatrix values="0.567 0.433 0 0 0
                                0.558 0.442 0 0 0
                                0 0.242 0.758 0 0
                                0 0 0 1 0"/>
        </filter>
        <filter id="deuteranopia">
          <feColorMatrix values="0.625 0.375 0 0 0
                                0.7 0.3 0 0 0
                                0 0.3 0.7 0 0
                                0 0 0 1 0"/>
        </filter>
        <filter id="tritanopia">
          <feColorMatrix values="0.95 0.05 0 0 0
                                0 0.433 0.567 0 0
                                0 0.475 0.525 0 0
                                0 0 0 1 0"/>
        </filter>
      </defs>
    `;
    document.body.appendChild(svg);

    const filter = filters[this.config.colorBlindnessMode];
    if (filter) {
      document.body.style.filter = filter;
    }
  }

  /**
   * Create skip links for navigation
   */
  private createSkipLinks(): void {
    const skipLinksContainer = document.createElement('div');
    skipLinksContainer.className = 'skip-links';
    skipLinksContainer.innerHTML = `
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#navigation" class="skip-link">Skip to navigation</a>
      <a href="#footer" class="skip-link">Skip to footer</a>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .skip-links {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999;
      }
      
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        transition: top 0.3s;
      }
      
      .skip-link:focus {
        top: 6px;
      }
    `;
    document.head.appendChild(style);
    document.body.insertBefore(skipLinksContainer, document.body.firstChild);
  }

  /**
   * Handle escape key press
   */
  private handleEscapeKey(): void {
    // Close modals, dropdowns, etc.
    const openModals = document.querySelectorAll('[role="dialog"]:not([aria-hidden="true"])');
    const openDropdowns = document.querySelectorAll('[aria-expanded="true"]');

    openModals.forEach(modal => {
      if (modal instanceof HTMLElement) {
        this.closeModal(modal);
      }
    });

    openDropdowns.forEach(dropdown => {
      if (dropdown instanceof HTMLElement) {
        dropdown.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /**
   * Handle tab key for focus trapping
   */
  private handleTabKey(event: KeyboardEvent): void {
    const activeElement = document.activeElement;
    const focusTrap = activeElement?.closest('.focus-trap');
    
    if (focusTrap) {
      const focusableElements = this.getFocusableElements(focusTrap as HTMLElement);
      const firstElement = focusableElements[0]?.element;
      const lastElement = focusableElements[focusableElements.length - 1]?.element;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }

  /**
   * Handle arrow keys for custom navigation
   */
  private handleArrowKeys(event: KeyboardEvent): void {
    const activeElement = document.activeElement;
    if (!activeElement) return;

    // Handle menu navigation
    if (activeElement.getAttribute('role') === 'menuitem') {
      event.preventDefault();
      this.navigateMenu(event.key, activeElement as HTMLElement);
    }

    // Handle tab navigation
    if (activeElement.getAttribute('role') === 'tab') {
      event.preventDefault();
      this.navigateTabs(event.key, activeElement as HTMLElement);
    }

    // Handle grid navigation
    if (activeElement.closest('[role="grid"]')) {
      event.preventDefault();
      this.navigateGrid(event.key, activeElement as HTMLElement);
    }
  }

  /**
   * Handle activation keys (Enter/Space)
   */
  private handleActivationKeys(event: KeyboardEvent): void {
    const activeElement = document.activeElement as HTMLElement;
    if (!activeElement) return;

    // Handle custom buttons
    if (activeElement.getAttribute('role') === 'button' && !(activeElement as HTMLButtonElement).disabled) {
      event.preventDefault();
      activeElement.click();
    }

    // Handle expandable elements
    if (activeElement.hasAttribute('aria-expanded')) {
      event.preventDefault();
      const isExpanded = activeElement.getAttribute('aria-expanded') === 'true';
      activeElement.setAttribute('aria-expanded', (!isExpanded).toString());
    }
  }

  /**
   * Navigate menu items with arrow keys
   */
  private navigateMenu(key: string, activeElement: HTMLElement): void {
    const menu = activeElement.closest('[role="menu"]');
    if (!menu) return;

    const menuItems = Array.from(menu.querySelectorAll('[role="menuitem"]')) as HTMLElement[];
    const currentIndex = menuItems.indexOf(activeElement);

    let nextIndex = currentIndex;
    if (key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % menuItems.length;
    } else if (key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
    }

    menuItems[nextIndex]?.focus();
  }

  /**
   * Navigate tabs with arrow keys
   */
  private navigateTabs(key: string, activeElement: HTMLElement): void {
    const tabList = activeElement.closest('[role="tablist"]');
    if (!tabList) return;

    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]')) as HTMLElement[];
    const currentIndex = tabs.indexOf(activeElement);

    let nextIndex = currentIndex;
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    }

    tabs[nextIndex]?.focus();
    tabs[nextIndex]?.click(); // Activate the tab
  }

  /**
   * Navigate grid with arrow keys
   */
  private navigateGrid(key: string, activeElement: HTMLElement): void {
    const grid = activeElement.closest('[role="grid"]');
    if (!grid) return;

    const rows = Array.from(grid.querySelectorAll('[role="row"]'));
    const currentCell = activeElement.closest('[role="gridcell"]');
    if (!currentCell) return;

    const currentRow = currentCell.closest('[role="row"]');
    const currentRowIndex = rows.indexOf(currentRow!);
    const cellsInRow = Array.from(currentRow!.querySelectorAll('[role="gridcell"]')) as HTMLElement[];
    const currentCellIndex = cellsInRow.indexOf(currentCell as HTMLElement);

    let targetElement: HTMLElement | null = null;

    switch (key) {
      case 'ArrowRight':
        targetElement = cellsInRow[currentCellIndex + 1] || cellsInRow[0];
        break;
      case 'ArrowLeft':
        targetElement = cellsInRow[currentCellIndex - 1] || cellsInRow[cellsInRow.length - 1];
        break;
      case 'ArrowDown':
        if (currentRowIndex < rows.length - 1) {
          const nextRowCells = Array.from(rows[currentRowIndex + 1].querySelectorAll('[role="gridcell"]')) as HTMLElement[];
          targetElement = nextRowCells[currentCellIndex] || nextRowCells[nextRowCells.length - 1];
        }
        break;
      case 'ArrowUp':
        if (currentRowIndex > 0) {
          const prevRowCells = Array.from(rows[currentRowIndex - 1].querySelectorAll('[role="gridcell"]')) as HTMLElement[];
          targetElement = prevRowCells[currentCellIndex] || prevRowCells[prevRowCells.length - 1];
        }
        break;
    }

    targetElement?.focus();
  }

  /**
   * Get all focusable elements within a container
   */
  getFocusableElements(container: HTMLElement): FocusableElement[] {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[role="button"]:not([disabled])',
      '[role="link"]',
      '[role="menuitem"]',
      '[role="tab"]',
    ].join(', ');

    const elements = Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
    
    return elements
      .filter(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      })
      .map(element => ({
        element,
        tabIndex: parseInt(element.getAttribute('tabindex') || '0'),
        visible: this.isElementVisible(element),
        enabled: !element.hasAttribute('disabled'),
      }))
      .sort((a, b) => {
        if (a.tabIndex === b.tabIndex) return 0;
        if (a.tabIndex === 0) return 1;
        if (b.tabIndex === 0) return -1;
        return a.tabIndex - b.tabIndex;
      });
  }

  /**
   * Check if element is visible
   */
  private isElementVisible(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  /**
   * Close modal and restore focus
   */
  closeModal(modal: HTMLElement): void {
    modal.setAttribute('aria-hidden', 'true');
    
    // Restore focus to the element that opened the modal
    const trigger = document.querySelector(`[aria-controls="${modal.id}"]`) as HTMLElement;
    if (trigger) {
      trigger.focus();
    } else if (this.focusHistory.length > 0) {
      const lastFocused = this.focusHistory[this.focusHistory.length - 2];
      lastFocused?.focus();
    }
  }

  /**
   * Announce message to screen readers
   */
  announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const regionId = priority === 'assertive' ? 'status-region' : 'live-region';
    const region = document.getElementById(regionId);
    
    if (region) {
      region.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        region.textContent = '';
      }, 1000);
    }
  }

  /**
   * Start monitoring accessibility
   */
  startMonitoring(): void {
    if (this.isMonitoring) return;
    this.isMonitoring = true;

    // Monitor DOM changes for accessibility violations
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.checkElementAccessibility(node as HTMLElement);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    this.observers.push(observer);
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    this.isMonitoring = false;
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  /**
   * Check element for accessibility issues
   */
  private checkElementAccessibility(element: HTMLElement): void {
    // Check for missing alt text on images
    if (element.tagName === 'IMG' && !element.getAttribute('alt')) {
      console.warn('Image missing alt text:', element);
    }

    // Check for missing labels on form inputs
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)) {
      const label = element.getAttribute('aria-label') || 
                   element.getAttribute('aria-labelledby') ||
                   document.querySelector(`label[for="${element.id}"]`);
      
      if (!label) {
        console.warn('Form input missing label:', element);
      }
    }

    // Check for missing heading hierarchy
    if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)) {
      const level = parseInt(element.tagName.slice(1));
      const prevHeading = this.findPreviousHeading(element);
      
      if (prevHeading) {
        const prevLevel = parseInt(prevHeading.tagName.slice(1));
        if (level > prevLevel + 1) {
          console.warn('Heading level skipped:', element);
        }
      }
    }
  }

  /**
   * Find previous heading element
   */
  private findPreviousHeading(element: HTMLElement): HTMLElement | null {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')) as HTMLElement[];
    const currentIndex = headings.indexOf(element);
    return currentIndex > 0 ? headings[currentIndex - 1] : null;
  }

  /**
   * Update accessibility configuration
   */
  updateConfig(config: Partial<AccessibilityConfig>): void {
    this.config = { ...this.config, ...config };
    
    // Reapply accessibility features
    this.stopMonitoring();
    this.initializeAccessibility();
  }

  /**
   * Get current configuration
   */
  getConfig(): AccessibilityConfig {
    return { ...this.config };
  }

  /**
   * Export accessibility report
   */
  generateReport(): AccessibilityReport {
    // This would integrate with axe-core for comprehensive testing
    return {
      violations: [],
      warnings: [],
      score: 100,
      totalElements: document.querySelectorAll('*').length,
      recommendations: [],
    };
  }
}

// Export singleton instance
export const accessibilityManager = new AccessibilityManager();
