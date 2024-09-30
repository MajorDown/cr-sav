'use client'
import { useState, useEffect } from "react"
import { useCornerContext } from "@/contexts/CornerContext"
import { useSAVContext } from "@/contexts/SAVContext"
import SavCard from "./SavCard"
const SavLister = () => {
    const { actualCorner } = useCornerContext()
    const { listOfSAV, updateListOfSAV } = useSAVContext()
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getSAVList = async () => {
            if (actualCorner) {
                setIsLoading(true)
                const response = await fetch(`/api/sav/getByCorner/${actualCorner.id}`)
                if (!response.ok) updateListOfSAV([])
                else updateListOfSAV(await response.json())
                setIsLoading(false)
            }
        }
        getSAVList()
    }, [actualCorner])

  return (
    <section>
        {actualCorner && <h2>Liste des SAV pour {actualCorner.cornerName}</h2>}
        {isLoading && <p>Chargement des SAV...</p>}
        {!isLoading && listOfSAV && listOfSAV.length > 0 && listOfSAV.map(sav => (
            <SavCard key={sav.id} sav={sav} />
        ))}
        {!isLoading && (!listOfSAV || listOfSAV.length === 0) && <p>Aucun SAV en cours</p>}
    </section>
  )
}

export default SavLister