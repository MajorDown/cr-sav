'use client'
import { useState } from "react"
import Image from "next/image"
import { useCornerContext } from "@/contexts/CornerContext"
import { useSAVContext } from "@/contexts/SAVContext"
import SavCard from "./SavCard"
import { SAV } from "@/constants/types"
import ModalToUpdateSav from "./ModalToUpdateSav"
import ModalToCreateSav from "./ModalToCreateSav"

const SavLister = () => {
    const { actualCorner } = useCornerContext()
    const { listOfSAV } = useSAVContext()
    const [wantDisplayReleased, setWantDisplayReleased] = useState<boolean>(false)
    const [wantUpdateSAV, setWantUpdateSAV] = useState<boolean>(false);
    const [SavToUpdate, setSavToUpdate] = useState<SAV | null>(null);
    const [wantCreateSAV, setWantCreateSAV] = useState<boolean>(false);

    const handleUpdateSAV = (sav: SAV) => {
      setWantUpdateSAV(true);    
      setSavToUpdate(sav);
    }
    // fonction pour n'afficher que les SAV qui ne sont pas encore livrés
    const savNotReleased: SAV[] = listOfSAV?.filter(sav => sav.log[sav.log.length - 1].status !== "livré") || []

  return (
    <section id={"savLister"}>
        {wantCreateSAV && <ModalToCreateSav onClose={() => setWantCreateSAV(false)}/>}
        {wantUpdateSAV && SavToUpdate !=null && 
          <ModalToUpdateSav SAV={SavToUpdate} onClose={() => setWantUpdateSAV(false)}/>
        }
        {actualCorner && <div id={"savListerTitle"}>
            <h2>Liste des SAV pour {actualCorner.cornerName}</h2>
            <button className={"addBtn"} onClick={() => setWantCreateSAV(true)}>
              <Image src={"/images/add.png"} alt={"Créer un SAV"} width={32} height={32}/>
            </button>
            <label htmlFor="wantDisplayReleased">afficher les SAV déjà livré ? 
              <input 
                type="checkbox"
                id="wantdisplayReleased" 
                value={wantDisplayReleased.toString()}
                onChange={() => setWantDisplayReleased(!wantDisplayReleased)}
              />
            </label>
          </div>
          }
        {listOfSAV && listOfSAV.length > 0 && wantDisplayReleased && listOfSAV.map(sav => (
            <SavCard key={sav.id} sav={sav} onDoubleClic={() => handleUpdateSAV(sav)}/>
        ))}
        {listOfSAV && listOfSAV.length > 0 && !wantDisplayReleased && savNotReleased.map(sav => (
            <SavCard key={sav.id} sav={sav} onDoubleClic={() => handleUpdateSAV(sav)}/>
        ))}
        {(!listOfSAV || listOfSAV.length === 0) && !wantDisplayReleased && <p>Aucun SAV enregistré</p>}
        {!wantDisplayReleased && savNotReleased.length === 0 && <p>Aucun SAV en cours</p>}
    </section>
  )
}

export default SavLister