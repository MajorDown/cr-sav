'use client'
import RefurbLister from "@/components/RefurbLister";
import SavLister from "@/components/SavLister";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSAVContext } from "@/contexts/SAVContext";
import { useRefurbContext } from "@/contexts/RefurbContext";
import { useCornerContext } from "@/contexts/CornerContext";

export default function Home() {
  const { actualCorner } = useCornerContext();
  const { listOfSAV, updateListOfSAV } = useSAVContext();
  const { listOfRefurb, updateListOfRefurb } = useRefurbContext();

  const [mode, setMode] = useState<null | "sav" | "refurb">(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    //récupération des SAV
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
    //récupération des reconditionnements
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

  return (<div>
    <div id={"modeSelector"}>
      <button className={mode === "sav" ? "modeBtn isActive" : "modeBtn"} onClick={() => setMode("sav")}>
        <p>SAV</p>
        <p>
          ({listOfSAV?.filter(sav => sav.log[sav.log.length - 1].status !== "livré").length || 0}/{listOfSAV?.length || 0} en attente)
        </p>
      </button>
      <button className={mode === "refurb" ? "modeBtn isActive" : "modeBtn"} onClick={() => setMode("refurb")}>
        <p>Reconditionnement</p>
        <p>
          ({listOfRefurb?.filter(refurb => refurb.log[refurb.log.length - 1].status !== "livré").length || 0}/{listOfRefurb?.length || 0} en attente)
        </p>
      </button>
    </div>
    {mode != null && <div id={"pointerSpace"}>
      <Image 
        className={mode === "sav" ? "isSav" : "isRefurb"} 
        src={"/images/triangle.png"} 
        alt={"pointer"}
        width={32} 
        height={24} 
      />
    </div>}
    <div id={"mainViewer"}>
      {isLoading && <p>Chargement...</p>}
      {mode === "sav" && <SavLister />}
      {mode === "refurb" && <RefurbLister />}
    </div>
  </div>
  );
}
