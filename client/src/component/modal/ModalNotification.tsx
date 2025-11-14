
import {  Modal, Result } from 'antd'
import type { ErrorResponse } from '../../types'

type Props = {
    isModalOpen: boolean,
    handleOk: () => void,
    handleCancel: () => void,
    error: ErrorResponse | null,
    okText?: string,
    cancelText?: string
}
const ModalNotification = (props: Props) => {
    console.log("Error modal: ",props.error);
    return (
        <Modal
            title="Notification"
            open={props.isModalOpen}
            onOk={props.handleOk}
            onCancel={props.handleCancel}
            okText={props.okText || "Quay lại trang chủ"}
            cancelText={props.cancelText || "Hủy"}
        >
            <Result
                status={props.error?.success ? "success" : "error"}
                title={props.error?.error || "An error occurred"}
                subTitle="Vui lòng thử lại sau."
            >
            </Result>
        </Modal>

    )
}

export default ModalNotification