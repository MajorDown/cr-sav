'use client'
import { useState, useEffect } from "react"
import { useCornerContext } from "@/contexts/CornerContext"
import { useRefurbContext } from "@/contexts/RefurbContext"

const RefurbLister = () => {
    const { actualCorner } = useCornerContext()
    const { listOfRefurb, updateListOfRefurb } = useRefurbContext()
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getRefurbList = async () => {
            if (actualCorner) {
                setIsLoading(true)
                const response = await fetch(`/api/refurb/getByCorner/${actualCorner.id}`)
                if (!response.ok) updateListOfRefurb([])
                else updateListOfRefurb(await response.json())
                setIsLoading(false)
            }
        }
        getRefurbList()
    }, [actualCorner])

  return (
    <section>
        {actualCorner && <h2>Liste des reconditionnement pour {actualCorner.cornerName}</h2>}
        {isLoading && <p>Chargement des reconditionnement...</p>}
        {!isLoading && listOfRefurb && listOfRefurb.length > 0 && listOfRefurb.map(refurb => (
            <div key={refurb.id}>
                <p>{refurb.id}: {refurb.product.constructor} {refurb.product.model}</p>
            </div>
        ))}
        {!isLoading && (!listOfRefurb || listOfRefurb.length === 0) && <p>Aucun reconditionnement en cours</p>}
    </section>
  )
}

export default RefurbLister