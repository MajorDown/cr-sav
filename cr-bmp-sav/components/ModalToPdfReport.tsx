'use client'
import { PropsWithChildren } from 'react';
import Modal from './Modal'
import PdfReport from './PDFReport';
import { PDFViewer } from '@react-pdf/renderer';
import { useSAVContext } from '@/contexts/SAVContext';
import { useRefurbContext } from '@/contexts/RefurbContext';

type ModalToPdfReportProps = PropsWithChildren & {
    onClose: () => void;
}

const ModalToPdfReport = (props: ModalToPdfReportProps) => {
    const { listOfSAV } = useSAVContext();
    const { listOfRefurb } = useRefurbContext();

    return (<Modal onClose={props.onClose}>
        <PDFViewer width={750} height={750*297/210}>
            {listOfRefurb != null && listOfSAV != null ? 
            <PdfReport listOfRefurb={listOfRefurb} listOfSAV={listOfSAV}/> : <></>
        }
        </PDFViewer>
    </Modal>);
}

export default ModalToPdfReport;