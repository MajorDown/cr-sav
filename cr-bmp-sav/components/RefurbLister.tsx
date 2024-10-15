'use client'
import { useState, useEffect } from "react"
import { useCornerContext } from "@/contexts/CornerContext"
import { useRefurbContext } from "@/contexts/RefurbContext"
import RefurbCard from "./RefurbCard"
import ModalToUpdateRefurb from "./ModalToUpdateRefurb"
import { Refurbishment } from "@/constants/types"

const RefurbLister = () => {
    const { actualCorner } = useCornerContext()
    const { listOfRefurb } = useRefurbContext()
    const [wantUpdateRefurb, setWantUpdateRefurb] = useState<boolean>(false);
    const [refurbToUpdate, setRefurbToUpdate] = useState<Refurbishment | null>(null);

    const handleOpenRefurb = (refurb: Refurbishment) => {
        setRefurbToUpdate(refurb)
        setWantUpdateRefurb(true)             
    }

  return (
    <section id={"refurbLister"}>
        {wantUpdateRefurb && <ModalToUpdateRefurb refurb={refurbToUpdate as Refurbishment} onClose={() => setWantUpdateRefurb(false)} />}
        {actualCorner && <h2>Liste des reconditionnement pour {actualCorner.cornerName}</h2>}
        {listOfRefurb && listOfRefurb.length > 0 && listOfRefurb.map(refurb => (
            <RefurbCard key={refurb.id} refurb={refurb} onDoubleClic={() => handleOpenRefurb(refurb)}/>
        ))}
        {(!listOfRefurb || listOfRefurb.length === 0) && <p>Aucun reconditionnement en cours</p>}
    </section>
  )
}

export default RefurbLister