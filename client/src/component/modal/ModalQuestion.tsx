import { Modal } from 'antd'
import type { Question } from '../../types';
import QuestionDetail from '../orther/QuestionDetail';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    question: Question ;
}

const ModalQuestion = (props: Props) => {
  return (
    <Modal
        title="Chi tiết câu hỏi"
        open={props.isOpen}
        onOk={() => {}}
        onCancel={() => props.onClose()}
        width={800}
        footer={null}
    >
        <QuestionDetail question={props.question} />
    </Modal>
  )
}
export default ModalQuestion