import { SAV } from "@/constants/types"
import Modal from "./Modal"
import { useState } from "react"

export type ModalToUpdateSavProps = {
    SAV: SAV
    onClose: (isClosed: boolean) => void
}

const ModalToUpdateSav = (props: ModalToUpdateSavProps) => {
    const [updateChoice, setUpdateChoice] = useState<"updateLog" | "updateSAV" | null>(null);

    return (
        <Modal onClose={props.onClose}>
            <div id={"modalToUpdateSAV"}>
                <h3>SAV n°{props.SAV && props.SAV.id}</h3>
                <p>Que souhaitez-vous faire ?</p>
                <div id={'updateSelector'} >
                    <button onClick={() => setUpdateChoice("updateLog")}>Actualiser le Log</button>
                    <button onClick={() => setUpdateChoice("updateSAV")}>Modifier les infos</button>
                </div>
                {updateChoice === "updateLog" && <p>Log</p>}
                {updateChoice === "updateSAV" && <p>infos SAV</p>}
            </div>
        </Modal>
    )
}

export default ModalToUpdateSav;