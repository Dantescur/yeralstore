import { ElNotification } from 'element-plus';

export const showSuccess = (message: string, type: string) => {

    ElNotification({
        // @ts-ignore
        title: 'Success',
        position: 'top-left',
        message: message,
        type: type
    });
};
