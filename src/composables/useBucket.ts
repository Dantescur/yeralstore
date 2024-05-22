import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'

export const useBucket = () => {
  const error = ref<string | null>(null)
  const upload = async (file: File) => {
    const filePath = `${Date.now()}_${file.name}`
    const { data, error } = await supabase.storage.from('yeralbucket').upload(filePath, file)
    if (error) {
      throw error
    }
    return data
  }
  return {
    upload,
    error
  }
}
