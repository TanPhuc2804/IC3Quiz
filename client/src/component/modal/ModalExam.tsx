import { Modal } from 'antd'
import ExamConfigurationForm from '../form/FormExam';

type Props = {
    visible: boolean;
    onCancel: () => void;
}

const ModalExam = (props: Props) => {

    return (
        <Modal
            title="Exam Details"
            open={props.visible}
            onCancel={props.onCancel}
            footer={null}
            width={1000}
        >
           <ExamConfigurationForm onClose={props.onCancel} />
        </Modal>
    )
}
export default ModalExam