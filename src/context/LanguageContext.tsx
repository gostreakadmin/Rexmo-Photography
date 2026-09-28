import { createContext, useContext, useEffect, type ReactNode, type FC } from 'react';
import { TRANSLATIONS, LANGUAGES, type SupportedLanguage, type LanguageOption } from '../i18n/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    try {
      localStorage.removeItem('rexmo_lang');
    } catch {
      // ignore
    }
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

  const t = (key: string, fallback?: string): string => {
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) return TRANSLATIONS.en[key];
    return fallback || key;
  };

  const currentLanguage = LANGUAGES[0]; // English

  return (
    <LanguageContext.Provider
      value={{
        language: 'en',
        setLanguage: () => {},
        t,
        currentLanguage,
        languages: [currentLanguage]
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
