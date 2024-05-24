import { supabase } from '@/lib/supabaseClient'

import { ref } from 'vue'

export const useBucket = () => {
  const error = ref<string | null>(null)

  const upload = async (file: File | undefined): Promise<string | undefined> => {
    if (file === undefined) return undefined;
    try {
      const filePath = `${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('yeralbucket')
        .upload(filePath, file)
      if (uploadError) {
        throw uploadError
      }
      return filePath
    } catch (uploadError) {
      error.value = (uploadError as Error).message
      return undefined
    }
  }

  const remove = async (paths: string[]) => {
    if (paths) {
      await supabase.storage
        .from('yeralbucket')
        .remove(paths)
    }
  }

  return {
    upload,
    error,
    remove,
  }
}

