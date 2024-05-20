import { ElNotification } from 'element-plus'

export const showError = (error: string | undefined) => {
  ElNotification({
    title: 'Error',
    message: error,
    type: 'error'
  })
}
