import { SAV } from "@/constants/types"
import Image from "next/image"
import Modal from "./Modal"
import { useState } from "react"
import UpdateSAVInfosForm from "./UpdateSAVInfosForm"
import UpdateSAVLogForm from "./UpdateSAVLogForm"

export type ModalToUpdateSavProps = {
    SAV: SAV
    onClose: (isClosed: boolean) => void
}

const ModalToUpdateSav = (props: ModalToUpdateSavProps) => {
    const [updateChoice, setUpdateChoice] = useState<"updateLog" | "updateSAV">("updateLog");

    return (
        <Modal onClose={props.onClose}>
            <div id={"modalToUpdateSAV"}>
                <h3>SAV n°{props.SAV && props.SAV.id}</h3>
                <p>Que souhaitez-vous faire ?</p>
                <div id={'updateSelector'} >
                    <button className={"updateBtn"} onClick={() => setUpdateChoice("updateLog")}>Actualiser le Log</button>
                    <button className={"updateBtn"} onClick={() => setUpdateChoice("updateSAV")}>Modifier les infos</button>
                </div>
                <div id={"pointerSpace"}>
                    <Image 
                        className={updateChoice === "updateLog" ? "updateLog" : "updateSAV"} 
                        src={"/images/triangle.png"} 
                        alt={"pointer"}
                        width={32} 
                        height={24} 
                    />
                </div>
                {updateChoice === "updateLog" && <UpdateSAVLogForm  actualSav={props.SAV}/>}
                {updateChoice === "updateSAV" && <UpdateSAVInfosForm actualSav={props.SAV} />}
            </div>
        </Modal>
    )
}

export default ModalToUpdateSav;