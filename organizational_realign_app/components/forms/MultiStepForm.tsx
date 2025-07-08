'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm, FormProvider, useFormContext, FieldValues, Path } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, AlertCircle, Save, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useOfflineStorage } from '@/lib/offline-storage'

// Multi-step form configuration
interface FormStep {
  id: string
  title: string
  description?: string
  schema: z.ZodSchema
  component: React.ComponentType<any>
  optional?: boolean
  condition?: (data: any) => boolean
}

interface MultiStepFormProps {
  steps: FormStep[]
  onSubmit: (data: any) => Promise<void>
  onSave?: (data: any) => Promise<void>
  autoSave?: boolean
  autoSaveInterval?: number
  defaultValues?: Record<string, any>
  className?: string
  showProgress?: boolean
  allowNavigation?: boolean
  persistData?: boolean
  formId?: string
}

// Helper function to safely render error messages
const renderErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && error?.message) return error.message;
  return String(error);
};

export function MultiStepForm({
  steps,
  onSubmit,
  onSave,
  autoSave = true,
  autoSaveInterval = 30000, // 30 seconds
  defaultValues = {},
  className,
  showProgress = true,
  allowNavigation = true,
  persistData = true,
  formId = 'multi-step-form',
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const { saveOffline, getOfflineData } = useOfflineStorage()

  // Get visible steps (accounting for conditions)
  const [visibleSteps, setVisibleSteps] = useState<FormStep[]>([])

  // Combine all schemas for comprehensive validation
  const combinedSchema = z.object(
    steps.reduce((acc, step) => {
      // Handle ZodObject schemas
      if (step.schema instanceof z.ZodObject) {
        return { ...acc, ...step.schema.shape }
      }
      // For other schema types, we'll validate them individually
      return acc
    }, {} as Record<string, z.ZodTypeAny>)
  )

  const methods = useForm({
    resolver: zodResolver(combinedSchema),
    defaultValues,
    mode: 'onChange'
  })

  const { watch, formState: { errors, isDirty }, getValues, reset } = methods

  // Watch all form data for auto-save and step visibility
  const formData = watch()

  // Update visible steps based on conditions
  useEffect(() => {
    const newVisibleSteps = steps.filter(step => 
      !step.condition || step.condition(formData)
    )
    setVisibleSteps(newVisibleSteps)

    // Adjust current step if it's no longer visible
    if (currentStep >= newVisibleSteps.length) {
      setCurrentStep(Math.max(0, newVisibleSteps.length - 1))
    }
  }, [formData, steps, currentStep])

  // Load persisted data on mount
  useEffect(() => {
    if (persistData) {
      loadPersistedData()
    }
  }, [])

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !isDirty) return

    const interval = setInterval(() => {
      handleAutoSave()
    }, autoSaveInterval)

    return () => clearInterval(interval)
  }, [autoSave, isDirty, autoSaveInterval])

  // Mark changes as unsaved when form is dirty
  useEffect(() => {
    setHasUnsavedChanges(isDirty)
  }, [isDirty])

  const loadPersistedData = async () => {
    try {
      const savedData = await getOfflineData('user_data', `form_${formId}`)
      if (savedData) {
        reset({ ...defaultValues, ...savedData })
        const savedStep = await getOfflineData('user_data', `form_${formId}_step`)
        if (savedStep && savedStep < visibleSteps.length) {
          setCurrentStep(savedStep)
        }
      }
    } catch (error) {
      console.error('Failed to load persisted form data:', error)
    }
  }

  const handleAutoSave = useCallback(async () => {
    if (!hasUnsavedChanges) return

    try {
      const data = getValues()
      if (persistData) {
        await saveOffline('user_data', { key: `form_${formId}`, value: data })
        await saveOffline('user_data', { key: `form_${formId}_step`, value: currentStep })
      }
      
      if (onSave) {
        await onSave(data)
      }
      
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error('Auto-save failed:', error)
    }
  }, [hasUnsavedChanges, getValues, currentStep, onSave, saveOffline, persistData, formId])

  const validateCurrentStep = async () => {
    const currentStepSchema = visibleSteps[currentStep]?.schema
    if (!currentStepSchema) return true

    try {
      currentStepSchema.parse(formData)
      setCompletedSteps(prev => new Set(prev).add(currentStep))
      return true
    } catch {
      return false
    }
  }

  const goToStep = async (stepIndex: number) => {
    if (!allowNavigation) return
    if (stepIndex < 0 || stepIndex >= visibleSteps.length) return

    // Validate current step before moving if going forward
    if (stepIndex > currentStep) {
      const isValid = await validateCurrentStep()
      if (!isValid) return
    }

    setCurrentStep(stepIndex)
    
    // Save progress
    if (persistData) {
      await saveOffline('user_data', { key: `form_${formId}_step`, value: stepIndex })
    }
  }

  const goToNextStep = () => goToStep(currentStep + 1)
  const goToPreviousStep = () => goToStep(currentStep - 1)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Validate all steps
      combinedSchema.parse(formData)
      
      // Submit the form
      await onSubmit(formData)
      
      // Clear persisted data on successful submission
      if (persistData) {
        await saveOffline('user_data', { key: `form_${formId}`, value: null })
        await saveOffline('user_data', { key: `form_${formId}_step`, value: null })
      }
      
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error('Form submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentStepData = visibleSteps[currentStep]
  const progress = ((currentStep + 1) / visibleSteps.length) * 100
  const isLastStep = currentStep === visibleSteps.length - 1
  const isFirstStep = currentStep === 0

  return (
    <FormProvider {...methods}>
      <div className={cn('max-w-4xl mx-auto', className)}>
        {/* Progress Header */}
        {showProgress && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Step {currentStep + 1} of {visibleSteps.length}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {currentStepData?.title}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {autoSave && lastSaved && (
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        Saved {lastSaved.toLocaleTimeString()}
                      </Badge>
                    )}
                    
                    {hasUnsavedChanges && (
                      <Badge variant="secondary" className="text-xs">
                        Unsaved changes
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Progress value={progress} className="h-2" />
                
                {/* Step indicators */}
                <div className="flex items-center justify-between">
                  {visibleSteps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => allowNavigation && goToStep(index)}
                      disabled={!allowNavigation}
                      className={cn(
                        'flex items-center space-x-2 text-sm transition-colors',
                        index === currentStep && 'text-blue-600 font-medium',
                        index < currentStep && 'text-green-600',
                        index > currentStep && 'text-gray-400',
                        allowNavigation && 'hover:text-blue-500 cursor-pointer'
                      )}
                    >
                      <div className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center text-xs',
                        index === currentStep && 'bg-blue-100 text-blue-600',
                        completedSteps.has(index) && 'bg-green-100 text-green-600',
                        index > currentStep && 'bg-gray-100 text-gray-400'
                      )}>
                        {completedSteps.has(index) ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      
                      <span className="hidden sm:inline">
                        {step.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>{currentStepData?.title}</CardTitle>
            {currentStepData?.description && (
              <p className="text-gray-600">{currentStepData.description}</p>
            )}
          </CardHeader>
          
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStepData && (
                  <currentStepData.component 
                    formData={formData}
                    errors={errors}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={goToPreviousStep}
            disabled={isFirstStep || isSubmitting}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="flex items-center space-x-2">
            {onSave && (
              <Button
                type="button"
                variant="outline"
                onClick={handleAutoSave}
                disabled={!hasUnsavedChanges || isSubmitting}
                className="flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Progress</span>
              </Button>
            )}

            {isLastStep ? (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Submit</span>
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={goToNextStep}
                disabled={isSubmitting}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Validation Errors */}
        {Object.keys(errors).length > 0 && (
          <Card className="mt-4 border-red-200 bg-red-50">
            <CardContent className="pt-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">
                    Please fix the following errors:
                  </h4>
                  <ul className="mt-2 text-sm text-red-700 space-y-1">
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field}>
                        • {renderErrorMessage(error)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </FormProvider>
  )
}

// Form field components with advanced features
export function FormField<T extends FieldValues>({
  name,
  label,
  description,
  required = false,
  children,
  className,
}: {
  name: Path<T>
  label: string
  description?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  const { formState: { errors } } = useFormContext<T>()
  const error = errors[name]

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      
      {children}
      
      {error && (
        <p className="text-sm text-red-600">
          {renderErrorMessage(error)}
        </p>
      )}
    </div>
  )
}

// Advanced input components
export function ConditionalField({
  condition,
  children,
}: {
  condition: boolean
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {condition && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function FieldGroup({
  title,
  description,
  children,
  collapsible = false,
  defaultExpanded = true,
}: {
  title: string
  description?: string
  children: React.ReactNode
  collapsible?: boolean
  defaultExpanded?: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="space-y-4">
      <div className="border-b pb-2">
        <button
          type="button"
          onClick={() => collapsible && setIsExpanded(!isExpanded)}
          className={cn(
            'flex items-center justify-between w-full text-left',
            collapsible && 'hover:text-blue-600'
          )}
        >
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          
          {collapsible && (
            <ChevronRight
              className={cn(
                'w-5 h-5 transition-transform',
                isExpanded && 'rotate-90'
              )}
            />
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={collapsible ? { opacity: 0, height: 0 } : false}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
