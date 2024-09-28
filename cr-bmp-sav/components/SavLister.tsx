'use client'
import { useState, useEffect } from "react"
import { useCornerContext } from "@/contexts/CornerContext"
import { useSAVContext } from "@/contexts/SAVContext"
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
        <h2>Liste des SAV du Corner {actualCorner?.cornerName}</h2>
        {isLoading && <p>Chargement des SAV...</p>}
        {!isLoading && listOfSAV && listOfSAV.length > 0 && listOfSAV.map(sav => (
            <div key={sav.id}>
                <h3>{sav.clientName}</h3>
                <p>{sav.product.category} {sav.product.constructor} {sav.product.model}</p>
                <p>{sav.actualStatus}</p>
            </div>
        ))}
        {!isLoading && (!listOfSAV || listOfSAV.length === 0) && <p>Aucun SAV pour ce corner</p>}
    </section>
  )
}

export default SavLister