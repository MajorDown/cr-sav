'use client'
import RefurbLister from "@/components/RefurbLister";
import SavLister from "@/components/SavLister";
import Image from "next/image";
import { useState } from "react";
import { useSAVContext } from "@/contexts/SAVContext";
import { useRefurbContext } from "@/contexts/RefurbContext";

export default function Home() {
  const { listOfSAV } = useSAVContext();
  const { listOfRefurb } = useRefurbContext();
  const [mode, setMode] = useState<null | "sav" | "refurb">(null);

  return (<div>
    <div id={"modeSelector"}>
      <button className={mode === "sav" ? "modeBtn isActive" : "modeBtn"} onClick={() => setMode("sav")}>
        <p>SAV</p>
        <p>({listOfSAV?.length || 0} en attente)</p>
      </button>
      <button className={mode === "refurb" ? "modeBtn isActive" : "modeBtn"} onClick={() => setMode("refurb")}>
        <p>Reconditionnement</p>
        <p>({listOfRefurb?.length || 0} en attente)</p>
      </button>
    </div>
    <div id={"pointerSpace"}>
      <Image 
        className={mode === "sav" ? "isSav" : "isRefurb"} 
        src={"/images/triangle.png"} 
        alt={"pointer"}
        width={32} 
        height={24} 
      />
    </div>
    <div id={"mainViewer"}>
      {mode === "sav" && <SavLister />}
      {mode === "refurb" && <RefurbLister />}
    </div>
  </div>
  );
}
