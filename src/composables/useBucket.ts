import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'

export const useBucket = () => {
  const error = ref<string | null>(null)

  const upload = async (file: File) => {
    try {
      const filePath = `${Date.now()}_${file.name}`
      const { data, error: uploadError } = await supabase.storage
        .from('yeralbucket')
        .upload(filePath, file)
      if (uploadError) {
        throw uploadError
      }
    } catch (uploadError) {
      error.value = uploadError
    }
  }
  return {
    upload,
    error
  }
}

