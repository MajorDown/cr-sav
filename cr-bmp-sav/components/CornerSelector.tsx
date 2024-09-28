'use client'
import { useEffect, useState } from 'react'
import { Corner } from '@/constants/types'
import { useCornerContext } from '@/contexts/CornerContext'

const CornerSelector = () => {
    const { actualCorner, updateActualCorner } = useCornerContext()
    const [listOfCorners, setListOfCorners] = useState<Corner[]>([])

    // useEffect permet de récupérer la liste de corners via un server action
    useEffect(() => {
        const getCornersList = async () => {
            const response = await fetch('/api/corners/getAll')
            const cornersList: Corner[] = await response.json()
            setListOfCorners(cornersList)
            updateActualCorner(cornersList[0])
        }
        getCornersList()
    }, [])

  return (<>
      <label htmlFor="cornerSelector">sélectionnez votre Corner : </label>
      <select id={"cornerSelector"}>
        {listOfCorners.map(corner => (
            <option 
                key={corner.id} 
                value={corner.id} 
                selected={actualCorner?.id === corner.id} 
                onClick={() => updateActualCorner(corner)}
            >
                {corner.cornerName}
            </option>)
        )}
    </select>
  </>)
}

export default CornerSelector