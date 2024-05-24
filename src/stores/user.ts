import { supabase } from '@/lib/supabaseClient'
import type { Session } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userSession = ref<Session | null>(null)
    const user = computed(() => userSession.value?.user)
    const userAvatar = ref<string>('')

    const setAvatar = (avatar: string) => {
      userAvatar.value = avatar
    }

    const setSession = (session: Session) => {
      userSession.value = session
    }

    const fetchSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()
      userSession.value = session
    }

    return {
      user,
      fetchSession,
      userAvatar,
      setAvatar,
      userSession,
      setSession
    }
  },
  {
    persist: true
  }
)
