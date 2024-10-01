'use client'
import { useState, useEffect } from "react"
import { useCornerContext } from "@/contexts/CornerContext"
import { useSAVContext } from "@/contexts/SAVContext"
import SavCard from "./SavCard"
import Modal from "./Modal"
import UpdateSAVForm from "./UpdateSAVForm"

const SavLister = () => {
    const { actualCorner } = useCornerContext()
    const { listOfSAV } = useSAVContext()
    const [wantUpdateSAV, setWantUpdateSAV] = useState<boolean>(false);

  return (
    <section>
        {wantUpdateSAV && <Modal onClose={() => setWantUpdateSAV(false)}>
            <UpdateSAVForm />
        </Modal>}
        {actualCorner && <h2>Liste des SAV pour {actualCorner.cornerName}</h2>}
        {listOfSAV && listOfSAV.length > 0 && listOfSAV.map(sav => (
            <SavCard key={sav.id} sav={sav} onDoubleClic={() => setWantUpdateSAV(true)}/>
        ))}
        {(!listOfSAV || listOfSAV.length === 0) && <p>Aucun SAV en cours</p>}
    </section>
  )
}

export default SavLister