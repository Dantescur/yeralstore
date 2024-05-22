import type { PostgrestError } from '@supabase/supabase-js'
import { ElNotification } from 'element-plus'

export const showError = (error: string | undefined | PostgrestError) => {
  ElNotification({
    title: 'Error',
    message: error?.toString(),
    type: 'error'
  })
}
