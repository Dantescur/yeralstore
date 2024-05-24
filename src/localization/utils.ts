const userPreferredLocaleStorageKey = 'user-lcid'

// Get the default locale from the available locales array
export const getDefaultLocale = () => {
  const availableLocales = [{ locale: 'en-US', default: true }, { locale: 'es-ES' }]
  return availableLocales.find((locale) => locale.isDefault)?.key || ''
}

// Retrieve the user preferred locale from localStorage
export const getUserPreferredLocale = () => {
  const preferredLocale = localStorage.getItem(userPreferredLocaleStorageKey)

  if (!preferredLocale) {
    return getDefaultLocale()
  }

  return preferredLocale
}

// Save the user preferred locale to localStorage
export const setUserPreferredLocale = (lcid) => {
  localStorage.setItem(userPreferredLocaleStorageKey, lcid)
}
