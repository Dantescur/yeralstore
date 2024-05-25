// src/composables/useAuth.ts

import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { AuthError } from '@supabase/supabase-js'
import type { Session } from '@supabase/supabase-js'

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
  const authError = ref<AuthError | null | PostgrestError>(null)
  // Loading state variable that indicates if an authentication request is in progress
  const isLoading = ref(false)

  /**
   * Signs up a new user with the provided email and password
   * @param email - The email of the user
   * @param password - The password of the user
   * @returns The created user object if successful, null otherwise
   * @throws The error that occurred if the sign-up request fails
   */
  const signIn = async (email: string, password: string): Promise<Session | null> => {
    isLoading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    isLoading.value = false
    if (error) {
      authError.value = error
      throw error
    }
    return data.session
  }

  /**
   * Signs in an existing user with the provided email and password
   * @param email - The email of the user
   * @param password - The password of the user
   * @returns The signed-in user object if successful, null otherwise
   * @throws The error that occurred if the sign in request fails
   */
  const signUp = async (
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ): Promise<Session | null> => {
    isLoading.value = true
    if (!firstname || !lastname) {
      authError.value = new Error('Please provide your firstname and lastname')
      throw authError.value
    }
    const {
      data: { session },
      error: signInError
    } = await supabase.auth.signUp({
      email, password, options: {
        data: {
          firstname,
          lastname
        }
      }
    })
    if (signInError) {
      authError.value = signInError
      throw signInError
    }
    isLoading.value = false
    return session
  }

  /**
   * Sends a magic link to the user's email to sign in
   * @param email - The email of the user
   * @returns The signed-in user object if successful, null otherwise
   * @throws The error that occurred if the magic link request fails
   */
  const signInWithMagicLink = async (email: string): Promise<Session | null> => {
    isLoading.value = true
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true }
    })
    isLoading.value = false
    if (error) {
      authError.value = error
      throw error
    }
    return data.session
  }

  /**
   * Signs out the current user
   * @returns Promise that resolves when the sign-out is complete
   * @throws The error that occurred if the sign-out request fails
   */
  const signOut = async (): Promise<void> => {
    isLoading.value = true
    const { error } = await supabase.auth.signOut()
    localStorage.removeItem('sb-igxlxmxllxgelvbyxlas-Auth-token')
    isLoading.value = false
    if (error) {
      authError.value = error
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
      authError.value = error
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
    authError
  }
}
