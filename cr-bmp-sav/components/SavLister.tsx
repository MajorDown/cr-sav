'use client'
import { useState } from "react"
import { useCornerContext } from "@/contexts/CornerContext"
import { useSAVContext } from "@/contexts/SAVContext"
import SavCard from "./SavCard"
import Modal from "./Modal"
import UpdateSAVForm from "./UpdateSAVForm"
import { SAV } from "@/constants/types"

const SavLister = () => {
    const { actualCorner } = useCornerContext()
    const { listOfSAV } = useSAVContext()
    const [wantUpdateSAV, setWantUpdateSAV] = useState<boolean>(false);
    const [SavToUpdate, setSavToUpdate] = useState<SAV | null>(null);

    const handleUpdateSAV = (sav: SAV) => {
      setWantUpdateSAV(true);    
      setSavToUpdate(sav);
    }

  return (
    <section>
        {wantUpdateSAV && <Modal onClose={() => setWantUpdateSAV(false)}>
            <UpdateSAVForm actualSav={SavToUpdate} />
        </Modal>}
        {actualCorner && <h2>Liste des SAV pour {actualCorner.cornerName}</h2>}
        {listOfSAV && listOfSAV.length > 0 && listOfSAV.map(sav => (
            <SavCard key={sav.id} sav={sav} onDoubleClic={() => handleUpdateSAV(sav)}/>
        ))}
        {(!listOfSAV || listOfSAV.length === 0) && <p>Aucun SAV en cours</p>}
    </section>
  )
}

export default SavLister