import { SAV } from "@/constants/types"
import Modal from "./Modal"
import { useState } from "react"
import { useSAVContext } from "@/contexts/SAVContext"

export type ModalToCreateSavProps = {
    onClose: (isClosed: boolean) => void
}

const ModalToCreateSav = (props: ModalToCreateSavProps) => {
    const { listOfSAV, updateListOfSAV } = useSAVContext()

    return (
        <Modal onClose={props.onClose}>
            <div id={"modalToCreateSAV"}>
                <h3>Nouveau SAV</h3>
                
            </div>
        </Modal>
    )
}

export default ModalToCreateSav;