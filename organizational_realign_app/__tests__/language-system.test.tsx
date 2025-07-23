/**
 * Comprehensive Language System Tests
 * Tests the industry-specific language customization system
 */

/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />
/// <reference path="../types/jest-globals.d.ts" />

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { LanguageProvider, useLanguage, useTranslatedText, useTranslatedUI, useTranslatedSections } from '@/hooks/useLanguage';
import { translateText, translateUIElement, translateSectionName } from '@/lib/industryLanguageMapping';
import '@testing-library/jest-dom';

// Test component that uses all language hooks
function TestComponent() {
  const { institutionType, setInstitutionType } = useLanguage();
  const { translateText: tText } = useTranslatedText();
  const { translateUI: tUI } = useTranslatedUI();
  const { translateSection: tSection } = useTranslatedSections();

  return (
    <div>
      <div data-testid="institution-type">{institutionType}</div>
      <div data-testid="translated-text">{tText('student')}</div>
      <div data-testid="translated-ui">{tUI('Continue')}</div>
      <div data-testid="translated-section">{tSection('Student Experience')}</div>
      <button 
        onClick={() => setInstitutionType('healthcare')}
        data-testid="change-type"
      >
        Change to Healthcare
      </button>
    </div>
  );
}

describe('Language System', () => {
  describe('Direct Translation Functions', () => {
    test('translateText should return industry-specific terms for healthcare', () => {
      const result = translateText('student', 'healthcare');
      expect(result).toBe('patient');
    });

    test('translateText should return industry-specific terms for community college', () => {
      const result = translateText('student', 'community-college');
      expect(result).toBe('student');
    });

    test('translateText should return industry-specific terms for nonprofit', () => {
      const result = translateText('student', 'nonprofit');
      expect(result).toBe('client');
    });

    test('translateText should return original term for unknown industry', () => {
      const result = translateText('student', 'unknown' as any);
      expect(result).toBe('student');
    });

    test('translateUIElement should return interface-specific terms', () => {
      const result = translateUIElement('Assessment', 'community-college');
      expect(result).toBe('Academic Assessment');
    });

    test('translateSectionName should return section-specific terms for healthcare', () => {
      const result = translateSectionName('Customer Service', 'healthcare');
      expect(result).toBe('Patient Services');
    });

    test('translateSectionName should return section-specific terms for corporate', () => {
      const result = translateSectionName('Customer Service', 'corporate');
      expect(result).toBe('Customer Service');
    });
  });

  describe('React Context and Hooks', () => {
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });

    test('LanguageProvider should provide default institution type', () => {
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('institution-type')).toHaveTextContent('community-college');
    });

    test('should load institution type from localStorage', () => {
      localStorage.setItem('institutionType', 'healthcare');

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('institution-type')).toHaveTextContent('healthcare');
    });

    test('should translate text based on current institution type', () => {
      localStorage.setItem('institutionType', 'healthcare');

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('translated-text')).toHaveTextContent('patient');
    });

    test('should update translations when institution type changes', () => {
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      // Initially should be community college
      expect(screen.getByTestId('translated-text')).toHaveTextContent('student');

      // Change to healthcare
      act(() => {
        screen.getByTestId('change-type').click();
      });

      expect(screen.getByTestId('translated-text')).toHaveTextContent('patient');
      expect(screen.getByTestId('institution-type')).toHaveTextContent('healthcare');
    });

    test('should persist institution type to localStorage', () => {
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      act(() => {
        screen.getByTestId('change-type').click();
      });

      expect(localStorage.getItem('institutionType')).toBe('healthcare');
    });

    test('should translate sections correctly based on institution type', () => {
      localStorage.setItem('institutionType', 'nonprofit');

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('translated-section')).toHaveTextContent('Client Experience');
    });
  });

  describe('Industry-Specific Language Mappings', () => {
    const testCases = [
      {
        industry: 'community-college',
        mappings: {
          'student': 'student',
          'curriculum': 'curriculum',
          'enrollment': 'enrollment',
          'Student Experience': 'Student Experience'
        }
      },
      {
        industry: 'healthcare',
        mappings: {
          'student': 'patient',
          'curriculum': 'treatment protocols',
          'enrollment': 'patient registration',
          'Student Experience': 'Patient Care Experience'
        }
      },
      {
        industry: 'nonprofit',
        mappings: {
          'student': 'client',
          'curriculum': 'program design',
          'enrollment': 'client intake',
          'Student Experience': 'Client Experience'
        }
      },
      {
        industry: 'corporate',
        mappings: {
          'student': 'employee',
          'curriculum': 'training programs',
          'enrollment': 'onboarding',
          'Student Experience': 'Employee Experience'
        }
      },
      {
        industry: 'government',
        mappings: {
          'student': 'citizen',
          'curriculum': 'service protocols',
          'enrollment': 'citizen registration',
          'Student Experience': 'Citizen Services'
        }
      }
    ];

    testCases.forEach(({ industry, mappings }) => {
      describe(`${industry} mappings`, () => {
        Object.entries(mappings).forEach(([original, expected]) => {
          test(`should translate "${original}" to "${expected}"`, () => {
            const isSection = original.includes(' ') && original[0] === original[0].toUpperCase();
            const result = isSection 
              ? translateSectionName(original, industry as any)
              : translateText(original, industry as any);
            expect(result).toBe(expected);
          });
        });
      });
    });
  });

  describe('Error Handling', () => {
    test('should handle missing translations gracefully', () => {
      const result = translateText('nonexistent-term', 'community-college');
      expect(result).toBe('nonexistent-term');
    });

    test('should handle invalid institution type gracefully', () => {
      const result = translateText('student', 'invalid-type' as any);
      expect(result).toBe('student');
    });

    test('should handle empty strings', () => {
      const result = translateText('', 'community-college');
      expect(result).toBe('');
    });

    test('should handle null/undefined inputs', () => {
      expect(translateText(null as any, 'community-college')).toBe(null);
      expect(translateText(undefined as any, 'community-college')).toBe(undefined);
    });
  });

  describe('Hook Error Handling', () => {
    test('should throw error when hooks are used outside provider', () => {
      const TestComponentWithoutProvider = () => {
        useLanguage();
        return <div>Test</div>;
      };

      expect(() => {
        render(<TestComponentWithoutProvider />);
      }).toThrow('useLanguage must be used within a LanguageProvider');
    });
  });

  describe('Context Integration', () => {
    test('should provide industry context information', () => {
      function ContextTestComponent() {
        const { getContext } = useLanguage();
        const context = getContext();
        
        return (
          <div>
            <div data-testid="context-primary">{context.primaryFocus}</div>
            <div data-testid="context-metrics">{context.keyMetrics[0]}</div>
          </div>
        );
      }

      localStorage.setItem('institutionType', 'healthcare');

      render(
        <LanguageProvider>
          <ContextTestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('context-primary')).toHaveTextContent('patient outcomes');
      expect(screen.getByTestId('context-metrics')).toHaveTextContent('patient satisfaction');
    });
  });
});

describe('Integration with Components', () => {
  test('OrganizationTypeSelect should update language context', () => {
    // This would test the actual integration with OrganizationTypeSelect
    // Mock component for testing
    function MockOrganizationSelect() {
      const { setInstitutionType, institutionType } = useLanguage();
      
      return (
        <div>
          <div data-testid="current-type">{institutionType}</div>
          <button 
            onClick={() => setInstitutionType('healthcare')}
            data-testid="select-healthcare"
          >
            Select Healthcare
          </button>
        </div>
      );
    }

    render(
      <LanguageProvider>
        <MockOrganizationSelect />
      </LanguageProvider>
    );

    act(() => {
      screen.getByTestId('select-healthcare').click();
    });

    expect(screen.getByTestId('current-type')).toHaveTextContent('healthcare');
  });

  test('PDF report generation should use institution-specific language', () => {
    // This would test the integration with PDF generation
    // For now, we'll test the function directly
    const { generateIndustrySpecificPDFContent } = require('@/lib/pdf-report-generator');
    
    const content = generateIndustrySpecificPDFContent(
      { /* mock analysis data */ },
      'healthcare'
    );

    // Content should use healthcare-specific terminology
    expect(content.customTerms.student).toBe('patient');
    expect(content.translatedSections['Executive Summary']).toContain('Healthcare');
  });
});
