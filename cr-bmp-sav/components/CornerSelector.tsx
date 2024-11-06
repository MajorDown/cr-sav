'use client'
import { useEffect, useState } from 'react'
import { Corner } from '@/constants/types'
import { useCornerContext } from '@/contexts/CornerContext'

const CornerSelector = () => {
  const { updateActualCorner } = useCornerContext()
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
      } catch (error) {
        console.error('Erreur:', error)
      }
    }
    getCornersList()
  }, [])

  // Gère le changement de sélection dans le select
  const handleCornerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value
    let enteredPassword: string | null = "";
    // Si l'utilisateur a choisi un corner dans la liste autre que ""
    if (selectedId) {
      const selectedCorner = listOfCorners.find(corner => corner.id === selectedId)
      if (selectedCorner) {
        enteredPassword = prompt(`Entrez le mot de passe pour le corner ${selectedCorner.cornerName}`)
        if (enteredPassword === null) {
          return
        }
        // Si le mot de passe est correct, on met à jour le corner actuel
        if (enteredPassword === selectedCorner.id) {
          setSelectedCornerId(selectedId)
          updateActualCorner(selectedCorner)
        } else {
          alert("Mot de passe incorrect")
          setSelectedCornerId("");
          updateActualCorner(null);
        }
      }
    } 
    // Si l'utilisateur a choisi "" dans la liste
    else {
      setSelectedCornerId("")
      updateActualCorner(null)
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
        <option value={""}>--Choisissez un corner--</option>
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
