import { Button, message, Space } from 'antd';
export const showMessage = (status: boolean, content: string) => {
    if (status) {
        success(content)
    } else {
        error(content)
    }
}

const success = (content: string) => {
    message.open({
        type: 'success',
        content: content,
    });
};

const error = (content: string) => {
    message.open({
        type: 'error',
        content: content,
    });
};

