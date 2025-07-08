import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UIState {
  // Theme state
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  
  // Navigation state
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  
  // Modal state
  isVideoModalOpen: boolean
  setVideoModalOpen: (open: boolean) => void
  
  // Loading states
  isLoading: boolean
  setLoading: (loading: boolean) => void
  
  // Notification state
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    duration?: number
  }>
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void
  removeNotification: (id: string) => void
  
  // Scroll state
  scrollY: number
  setScrollY: (y: number) => void
  
  // Form state
  formErrors: Record<string, string>
  setFormError: (field: string, error: string) => void
  clearFormError: (field: string) => void
  clearAllFormErrors: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      
      // Navigation
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      
      // Modal
      isVideoModalOpen: false,
      setVideoModalOpen: (open) => set({ isVideoModalOpen: open }),
      
      // Loading
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
      
      // Notifications
      notifications: [],
      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9)
        set((state) => ({
          notifications: [...state.notifications, { ...notification, id }]
        }))
        
        // Auto-remove after duration
        if (notification.duration !== 0) {
          setTimeout(() => {
            get().removeNotification(id)
          }, notification.duration || 5000)
        }
      },
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        })),
      
      // Scroll
      scrollY: 0,
      setScrollY: (y) => set({ scrollY: y }),
      
      // Forms
      formErrors: {},
      setFormError: (field, error) =>
        set((state) => ({
          formErrors: { ...state.formErrors, [field]: error }
        })),
      clearFormError: (field) =>
        set((state) => {
          const { [field]: _, ...rest } = state.formErrors
          return { formErrors: rest }
        }),
      clearAllFormErrors: () => set({ formErrors: {} }),
    }),
    {
      name: 'northpath-ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
)

// Assessment Store
interface AssessmentState {
  currentStep: number
  totalSteps: number
  answers: Record<string, any>
  isComplete: boolean
  startTime: Date | null
  endTime: Date | null
  
  // Actions
  setCurrentStep: (step: number) => void
  setAnswer: (questionId: string, answer: any) => void
  nextStep: () => void
  prevStep: () => void
  startAssessment: () => void
  completeAssessment: () => void
  resetAssessment: () => void
  getProgress: () => number
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      totalSteps: 10,
      answers: {},
      isComplete: false,
      startTime: null,
      endTime: null,
      
      setCurrentStep: (step) => set({ currentStep: step }),
      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: answer }
        })),
      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1)
        })),
      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0)
        })),
      startAssessment: () =>
        set({
          currentStep: 0,
          startTime: new Date(),
          isComplete: false,
          answers: {}
        }),
      completeAssessment: () =>
        set({
          isComplete: true,
          endTime: new Date()
        }),
      resetAssessment: () =>
        set({
          currentStep: 0,
          answers: {},
          isComplete: false,
          startTime: null,
          endTime: null
        }),
      getProgress: () => {
        const { currentStep, totalSteps } = get()
        return (currentStep / totalSteps) * 100
      },
    }),
    {
      name: 'northpath-assessment-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// User preferences store
interface UserPreferencesState {
  language: string
  currency: string
  timezone: string
  emailNotifications: boolean
  marketingEmails: boolean
  
  setLanguage: (language: string) => void
  setCurrency: (currency: string) => void
  setTimezone: (timezone: string) => void
  setEmailNotifications: (enabled: boolean) => void
  setMarketingEmails: (enabled: boolean) => void
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      language: 'en',
      currency: 'USD',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      emailNotifications: true,
      marketingEmails: false,
      
      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
      setTimezone: (timezone) => set({ timezone }),
      setEmailNotifications: (enabled) => set({ emailNotifications: enabled }),
      setMarketingEmails: (enabled) => set({ marketingEmails: enabled }),
    }),
    {
      name: 'northpath-user-preferences',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
