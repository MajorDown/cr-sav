import { PropsWithChildren } from 'react';
import Modal from './Modal'

type ModalToPdfReportProps = PropsWithChildren & {
    onClose: () => void;
}

const ModalToPdfReport = (props: ModalToPdfReportProps) => {
    return (<Modal onClose={}>

    </Modal>);
}

export default Modal;