// import { supabase } from '@/lib/supabaseClient'
// import { ref } from 'vue'
//
// export const useBucket = () => {
//   const Error = ref<Error | null>(null)
//   const upload = async (file: File) => {
//     const filePath = `${Date.now()}_${file.name}`
//     const { data, error } = await supabase.storage.from('yeralbucket').upload(filePath, file)
//     if (error instanceof Error) {
//       Error.value = error
//     }
//     return data
//   }
//   return {
//     upload,
//     error
//   }
// }


import { type Ref, ref, type UnwrapRef } from 'vue'
import { supabase } from '@/lib/supabaseClient'


/**
 * Custom composable that provides bucket functionality using Supabase
 * @returns An object with an upload function and an error state variable
 */
export const useBucket = (): { upload: (file: File) => Promise<{ path: string } | null>; remove: (paths: string[]) => Promise<{ status: string; error: null }>; error: Ref<UnwrapRef<Error | null>> } => {
  const error = ref<Error | null>(null)

  /**
   * Uploads a file to the 'yeralbucket' bucket in Supabase storage
   * @param file - The file to upload
   * @returns The uploaded file data if successful, null otherwise
   */
  const upload = async (file: File): Promise<{ path: string } | null> => {
    const filePath = `${Date.now()}_${file.name}`
    const { data, error: uploadError } = await supabase.storage.from('yeralbucket').upload(filePath, file)
    if (uploadError instanceof Error) {
      error.value = uploadError
    }
    return data
  }

  const remove = async (paths: string[]): Promise<{ status: string; error: null }> => {
    const { error: removeError } = await supabase.storage.from('yeralbucket').remove(paths)
    if (removeError) {
      error.value = removeError
    }

    return {
      status: 'Ok',
      error: null
    }
  }

  return {
    upload,
    error,
    remove
  }
}