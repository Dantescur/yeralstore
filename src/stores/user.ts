import { buildAvatar } from '@/helpers/buildAvatar'
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

    const setAvatar = () => {
      let newAvatar;
      if (userSession.value) {
        newAvatar = buildAvatar(userSession.value.user.user_metadata.firstname)
        userAvatar.value = newAvatar()
      } else {
        newAvatar = buildAvatar('Anonymous')
        userAvatar.value = newAvatar()
      }


    }

    const setSession = (session: Session | null) => {
      userSession.value = session
    }

    const fetchSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()
      userSession.value = session
    }

    const clearUser = () => {
      userSession.value = null
      userAvatar.value = 'Anonymous'
    }

    return {
      user,
      fetchSession,
      userAvatar,
      setAvatar,
      userSession,
      setSession,
      clearUser
    }
  },
  {
    persist: true
  }
)
