import type { PostgrestError } from '@supabase/supabase-js'
import { ElNotification } from 'element-plus'

export const showError = (error: string | undefined | PostgrestError) => {
  if (!error) return

  if (typeof error === 'string') {
    // Handle string errors directly
  } else if ('message' in error) {
    error = (error as PostgrestError).message
  }

  ElNotification({
    title: 'Error',
    position: 'top-left',
    message: error?.toString(),
    type: 'error'
  })
}
