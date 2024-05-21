/**
 * Imports the `useDark` and `useToggle` hooks from the `@vueuse/core` package.
 */
import { useDark, useToggle } from '@vueuse/core'

/**
 * Calls the `useDark` hook to determine if the user's preferred color scheme is dark.
 * Stores the result in the `isDark` reactive variable.
 */
export const isDark = useDark()

/**
 * Calls the `useToggle` hook with the `isDark` reactive variable as the initial value.
 * Returns a function that can be used to toggle the value of `isDark`.
 */
export const toggleDark = useToggle(isDark)
