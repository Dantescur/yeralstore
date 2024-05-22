// src/composables/useAuth.ts

import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { AuthError, User } from '@supabase/supabase-js'

interface PostgrestError {
  code?: string
  status?: number
  name?: string
  message: string
  stack?: string
  cause?: unknown
}

/**
 * Custom composable that provides authentication functionality using Supabase
 * @returns An object with various authentication functions and state variables
 */
export function useAuth() {
  // Error state variable that holds the most recent error that occurred
  const Error = ref<AuthError | null | PostgrestError>(null)
  // Loading state variable that indicates if an authentication request is in progress
  const isLoading = ref(false)

  /**
   * Signs up a new user with the provided email and password
   * @param email - The email of the user
   * @param password - The password of the user
   * @returns The created user object if successful, null otherwise
   * @throws The error that occurred if the sign-up request fails
   */
  const signIn = async (email: string, password: string): Promise<User | null> => {
    isLoading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    isLoading.value = false
    if (error) {
      Error.value = error
      throw error
    }
    return data.user
  }

  /**
   * Signs in an existing user with the provided email and password
   * @param email - The email of the user
   * @param password - The password of the user
   * @returns The signed-in user object if successful, null otherwise
   * @throws The error that occurred if the sign in request fails
   */
  const signUp = async (email: string, password: string): Promise<User | null> => {
    isLoading.value = true
    const {
      data: { user },
      error: signInError
    } = await supabase.auth.signUp({ email, password })
    if (signInError) {
      Error.value = signInError
      throw signInError
    }
    if (user === null) return null
    const { error: insertError } = await supabase.from('customer').insert({
      customerid: Number(user.id),
      firstname: user.email?.split('@')[0],
      lastname: user.email?.split('@')[1],
      phonenumber: ''
    })
    isLoading.value = false
    if (insertError) {
      Error.value = insertError
      throw insertError
    }
    return user
  }

  /**
   * Sends a magic link to the user's email to sign in
   * @param email - The email of the user
   * @returns The signed-in user object if successful, null otherwise
   * @throws The error that occurred if the magic link request fails
   */
  const signInWithMagicLink = async (email: string): Promise<User | null> => {
    const { data, error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      Error.value = error
      throw error
    }
    return data.user
  }

  /**
   * Signs out the current user
   * @returns Promise that resolves when the sign-out is complete
   * @throws The error that occurred if the sign-out request fails
   */
  const signOut = async (): Promise<void> => {
    isLoading.value = true
    const { error } = await supabase.auth.signOut()
    localStorage.removeItem('sb-igxlxmxllxgelvbyxlas-auth-token')
    isLoading.value = false
    if (error) {
      Error.value = error
      throw error
    }
  }

  /**
   * Retrieves the current user session
   * @returns The session object if the user is signed in, null otherwise
   */
  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      Error.value = error
      throw error
    }
    return data.session
  }

  return {
    signUp,
    signIn,
    signOut,
    signInWithMagicLink,
    getSession,
    isLoading,
    Error
  }
}
