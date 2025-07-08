// Test file to verify path imports work
import { translateText } from '@/lib/industryLanguageMapping';
import { useLanguage } from '@/hooks/useLanguage';

// This should compile without errors if paths are working
console.log('Imports working:', { translateText, useLanguage });
