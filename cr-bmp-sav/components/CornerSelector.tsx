'use client'
import { useEffect, useState } from 'react'
import { Corner } from '@/constants/types'
import { useCornerContext } from '@/contexts/CornerContext'

const CornerSelector = () => {
  const { actualCorner, updateActualCorner } = useCornerContext()
  const [listOfCorners, setListOfCorners] = useState<Corner[]>([])
  const [selectedCornerId, setSelectedCornerId] = useState<string>('') // Stocke l'ID du corner sélectionné

  // useEffect permet de récupérer la liste de corners via un server action
  useEffect(() => {
    const getCornersList = async () => {
      try {
        const response = await fetch('/api/corners/getAll')
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des corners')
        }
        const cornersList: Corner[] = await response.json()
        setListOfCorners(cornersList)

        // Définir le corner par défaut comme étant le premier de la liste
        if (cornersList.length > 0) {
          setSelectedCornerId(cornersList[0].id)
          updateActualCorner(cornersList[0])
        }
      } catch (error) {
        console.error('Erreur:', error)
      }
    }
    getCornersList()
  }, [])

  // Gère le changement de sélection dans le select
  const handleCornerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value
    setSelectedCornerId(selectedId)
    const selectedCorner = listOfCorners.find(corner => corner.id === selectedId)
    if (selectedCorner) {
      updateActualCorner(selectedCorner)
    }
  }

  return (
    <>
      <label htmlFor="cornerSelector">Sélectionnez votre Corner : </label>
      <select
        id="cornerSelector"
        value={selectedCornerId}
        onChange={handleCornerChange}
      >
        {listOfCorners.map(corner => (
          <option key={corner.id} value={corner.id}>
            {corner.cornerName}
          </option>
        ))}
      </select>
    </>
  )
}

export default CornerSelector
