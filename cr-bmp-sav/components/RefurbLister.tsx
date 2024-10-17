'use client'
import Image from "next/image"
import { useState, useEffect } from "react"
import { useCornerContext } from "@/contexts/CornerContext"
import { useRefurbContext } from "@/contexts/RefurbContext"
import RefurbCard from "./RefurbCard"
import ModalToUpdateRefurb from "./ModalToUpdateRefurb"
import ModalToCreateRefurb from "./ModalToCreateRefurb"
import { Refurbishment } from "@/constants/types"

const RefurbLister = () => {
    const { actualCorner } = useCornerContext()
    const { listOfRefurb } = useRefurbContext()
    const [wantUpdateRefurb, setWantUpdateRefurb] = useState<boolean>(false);
    const [refurbToUpdate, setRefurbToUpdate] = useState<Refurbishment | null>(null);
    const [wantCreateRefurb, setWantCreateRefurb] = useState<boolean>(false);
    const [wantDisplayReleased, setWantDisplayReleased] = useState<boolean>(false);

    const handleOpenRefurb = (refurb: Refurbishment) => {
        setRefurbToUpdate(refurb)
        setWantUpdateRefurb(true)             
    }

    // fonction pour n'afficher que les SAV qui ne sont pas encore livrés
    const refurbNotReleased: Refurbishment[] = listOfRefurb?.filter(refurb => refurb.log[refurb.log.length - 1].status !== "livré") || []

  return (
    <section id={"refurbLister"}>
        {wantUpdateRefurb && <ModalToUpdateRefurb refurb={refurbToUpdate as Refurbishment} onClose={() => setWantUpdateRefurb(false)} />}
        {wantCreateRefurb && <ModalToCreateRefurb  onClose={() => setWantCreateRefurb(false)} />}
        {actualCorner && <div id={"refurbListerTitle"}>
          <h2>Liste des reconditionnement pour {actualCorner.cornerName}</h2>
          <button className={"addBtn"} onClick={() => setWantCreateRefurb(true)}>
            <Image src={"/images/add.png"} alt={"Créer un reconditionnement"} width={32} height={32}/>
          </button>
          <label htmlFor="wantDisplayReleased">afficher les reconditionnement déjà effectués ? 
            <input 
              type="checkbox"
              id="wantdisplayReleased" 
              value={wantDisplayReleased.toString()}
              onChange={() => setWantDisplayReleased(!wantDisplayReleased)}
            />
          </label>          
        </div>}
        {listOfRefurb && listOfRefurb.length > 0 && wantDisplayReleased && listOfRefurb.map(refurb => (
            <RefurbCard key={refurb.id} refurb={refurb} onDoubleClic={() => handleOpenRefurb(refurb)}/>
        ))}
        {listOfRefurb && listOfRefurb.length > 0 && !wantDisplayReleased && refurbNotReleased.map(refurb => (
            <RefurbCard key={refurb.id} refurb={refurb} onDoubleClic={() => handleOpenRefurb(refurb)}/>
        ))}
        {(!listOfRefurb || listOfRefurb.length === 0) && !wantDisplayReleased && <p>Aucun reconditionnement enregistré</p>}
        {!wantDisplayReleased && refurbNotReleased.length === 0 && <p>Aucun reconditionnement en cours</p>}
    </section>
  )
}

export default RefurbLister