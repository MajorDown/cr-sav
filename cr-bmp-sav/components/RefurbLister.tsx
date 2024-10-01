'use client'
import { useState, useEffect } from "react"
import { useCornerContext } from "@/contexts/CornerContext"
import { useRefurbContext } from "@/contexts/RefurbContext"
import RefurbCard from "./RefurbCard"
import Modal from "./Modal"
import UpdateRefurbForm from "./UpdateRefurbForm"

const RefurbLister = () => {
    const { actualCorner } = useCornerContext()
    const { listOfRefurb } = useRefurbContext()
    const [wantUpdateRefurb, setWantUpdateRefurb] = useState<boolean>(false);

  return (
    <section>
        {wantUpdateRefurb && <Modal onClose={() => setWantUpdateRefurb(false)}>
            <UpdateRefurbForm />
        </Modal>}
        {actualCorner && <h2>Liste des reconditionnement pour {actualCorner.cornerName}</h2>}
        {listOfRefurb && listOfRefurb.length > 0 && listOfRefurb.map(refurb => (
            <RefurbCard key={refurb.id} refurb={refurb} onDoubleClic={() => setWantUpdateRefurb(true)}/>
        ))}
        {(!listOfRefurb || listOfRefurb.length === 0) && <p>Aucun reconditionnement en cours</p>}
    </section>
  )
}

export default RefurbLister