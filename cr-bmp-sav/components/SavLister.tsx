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
                const response = await fetch(`/api/sav/getbyCorner/${actualCorner.id}`)
                const savList = await response.json()
                updateListOfSAV(savList)
                setIsLoading(false)
            }
        }
        getSAVList()
    }, [actualCorner])

  return (
    <section>
        <h2>Liste des SAV</h2>
        {isLoading && <p>Chargement...</p>}
        {listOfSAV && listOfSAV.map(sav => (
            <div key={sav.id}>
                <h3>{sav.clientName}</h3>
                <p>{sav.product.category} {sav.product.constructor} {sav.product.model}</p>
                <p>{sav.actualStatus}</p>
            </div>
        ))}
    </section>
  )
}

export default SavLister