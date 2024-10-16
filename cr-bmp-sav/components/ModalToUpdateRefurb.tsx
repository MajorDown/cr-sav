import { Refurbishment } from "@/constants/types"
import Modal from "./Modal"
import { useState } from "react"


export type ModalToUpdateSavProps = {
    refurb: Refurbishment
    onClose: (isClosed: boolean) => void
}

const ModalToUpdateRefurb = (props: ModalToUpdateSavProps) => {

    return (
        <Modal onClose={props.onClose}>
            <div id={"modalToUpdateRefurb"}>
                <h3>Reconditionnement n°{props.refurb && props.refurb.id}</h3>

            </div>
        </Modal>
    )
}

export default ModalToUpdateRefurb;