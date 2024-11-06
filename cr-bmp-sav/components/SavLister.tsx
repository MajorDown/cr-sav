'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import { useCornerContext } from "@/contexts/CornerContext"
import { useSAVContext } from "@/contexts/SAVContext"
import SavCard from "./SavCard"
import { SAV } from "@/constants/types"
import ModalToUpdateSav from "./ModalToUpdateSav"
import ModalToCreateSav from "./ModalToCreateSav"
import SAVSearcher from "./SAVSearcher"

const SavLister = () => {
    const { actualCorner } = useCornerContext()
    const { listOfSAV } = useSAVContext()
    const [searchMode, setSearchMode] = useState<"byName" | "byModel">("byName");
    const [listOfFilteredSAV, setListOfFilteredSAV] = useState<SAV[] | null>(listOfSAV);
    const [wantDisplayReleased, setWantDisplayReleased] = useState<boolean>(false)
    const [wantUpdateSAV, setWantUpdateSAV] = useState<boolean>(false);
    const [SavToUpdate, setSavToUpdate] = useState<SAV | null>(null);
    const [wantCreateSAV, setWantCreateSAV] = useState<boolean>(false);

    useEffect(() => {
      console.log("listOfSAV :", listOfSAV)
    }, [listOfSAV])

    const handleUpdateSAV = (sav: SAV) => {
      setWantUpdateSAV(true);    
      setSavToUpdate(sav);
    }
    // fonction pour n'afficher que les SAV qui ne sont pas encore livrés
    const savNotReleased: SAV[] = listOfFilteredSAV?.filter(sav => sav.log[sav.log.length - 1].status !== "livré") || []

    const handleFilterSAV = (searchV: string) => {
      if (searchV === "") {
        setListOfFilteredSAV(listOfSAV);
      } else {
        if (searchMode === "byName") {
          setListOfFilteredSAV(listOfSAV ? listOfSAV.filter(sav => sav.clientName.toLowerCase().includes(searchV.toLowerCase())) : null);
        }
        else if (searchMode === "byModel") {
          setListOfFilteredSAV(listOfSAV ? listOfSAV.filter(sav => sav.product.model.toLowerCase().includes(searchV.toLowerCase())) : null);
        }
      }
    }

  return (<>
    <section id={"searchBar"}>
      <SAVSearcher 
          onChangeMode={(mode) => setSearchMode(mode)} 
          onChangeSearchValue={(searchValue) => handleFilterSAV(searchValue)}
      />
    </section>
    <section id={"savLister"}>
        {wantCreateSAV && <ModalToCreateSav onClose={() => setWantCreateSAV(false)}/>}
        {wantUpdateSAV && SavToUpdate !=null && <ModalToUpdateSav SAV={SavToUpdate} onClose={() => setWantUpdateSAV(false)}/>}
        {actualCorner && <div id={"savListerTitle"}>
            <h2>Liste des SAV pour {actualCorner.cornerName}</h2>
            <button className={"addBtn"} onClick={() => setWantCreateSAV(true)}>
              <Image src={"/images/add.png"} alt={"Créer un SAV"} width={32} height={32}/>
            </button>
            <label htmlFor="wantDisplayReleased">afficher les SAV déjà livré ? 
              <input 
                type="checkbox"
                id="wantdisplayReleased" 
                value={wantDisplayReleased.toString()}
                onChange={() => setWantDisplayReleased(!wantDisplayReleased)}
              />
            </label>
          </div>
          }
        {listOfFilteredSAV && listOfFilteredSAV.length > 0 && wantDisplayReleased && listOfFilteredSAV.map(sav => (
            <SavCard key={sav.id} sav={sav} onDoubleClic={() => handleUpdateSAV(sav)}/>
        ))}
        {listOfFilteredSAV && listOfFilteredSAV.length > 0 && !wantDisplayReleased && savNotReleased.map(sav => (
            <SavCard key={sav.id} sav={sav} onDoubleClic={() => handleUpdateSAV(sav)}/>
        ))}
        {(!listOfFilteredSAV || listOfFilteredSAV.length === 0) && !wantDisplayReleased && <p>Aucun SAV enregistré</p>}
        {!wantDisplayReleased && savNotReleased.length === 0 && <p>Aucun SAV en cours</p>}
    </section>
  </>
  )
}

export default SavLister;