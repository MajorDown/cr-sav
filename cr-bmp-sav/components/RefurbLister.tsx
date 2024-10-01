'use client'
import { useState, useEffect } from "react"
import { useCornerContext } from "@/contexts/CornerContext"
import { useRefurbContext } from "@/contexts/RefurbContext"
import RefurbCard from "./RefurbCard"

const RefurbLister = () => {
    const { actualCorner } = useCornerContext()
    const { listOfRefurb, updateListOfRefurb } = useRefurbContext()

  return (
    <section>
        {actualCorner && <h2>Liste des reconditionnement pour {actualCorner.cornerName}</h2>}
        {listOfRefurb && listOfRefurb.length > 0 && listOfRefurb.map(refurb => (
            <RefurbCard key={refurb.id} refurb={refurb} />
        ))}
        {(!listOfRefurb || listOfRefurb.length === 0) && <p>Aucun reconditionnement en cours</p>}
    </section>
  )
}

export default RefurbLister