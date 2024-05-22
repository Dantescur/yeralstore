import { useAuth } from '@/composables/useAuth'
import { supabase } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<User | null | undefined>(null)
    const userAvatar = ref<string>('')
    const { getSession } = useAuth()

    const setUser = (newUser: User | null) => {
      user.value = newUser
    }

    const setAvatar = (avatar: string) => {
      userAvatar.value = avatar
    }

    const fetchUser = async () => {
      const {
        data: { user: fetchedUser }
      } = await supabase.auth.getUser()
      user.value = fetchedUser
    }

    const initialize = async () => {
      const session = await getSession()
      user.value = session?.user

      supabase.auth.onAuthStateChange((event, session) => {
        user.value = session?.user || null
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem('sb-igxlxmxllxgelvbyxlas-auth-token')
        }
      })
    }

    return {
      user,
      setUser,
      fetchUser,
      initialize,
      userAvatar,
      setAvatar
    }
  },
  {
    persist: true
  }
)
