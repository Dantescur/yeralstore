import { useAuth } from '@/composables/useAuth'
import { supabase } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const { getSession } = useAuth()

const session = await getSession()

export const useUserStore = defineStore('user', () => {
  const user = ref<User | string | null | undefined>(session?.user)

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  const fetchUser = async () => {
    const { data: { user: fetchedUser } } = await supabase.auth.getUser();
    user.value = fetchedUser;
  };

  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null
    if (event === 'SIGNED_OUT') {
      localStorage.removeItem('sb-igxlxmxllxgelvbyxlas-auth-token');
    }
  })

  return {
    user,
    setUser,
    fetchUser
  }
})
