'use client'
import { useState } from 'react'
import Image from 'next/image'
import CornerSelector from './CornerSelector'
import ModalToPdfReport from './ModalToPdfReport'

const Header = () => {
  const [wantPurge, setWantPurge] = useState<boolean>(false);
  const handlePurgeData = () => {}

  return (<>
    {wantPurge && <ModalToPdfReport onClose={() => setWantPurge(false)} />}
    <header>
      <div id={"title"}>
        <Image 
          src="/images/bmp.png"
          alt="logo" 
          width={204} 
          height={66} 
        />
        <h1>Gestion des SAV et des Reconditionnements</h1>
      </div>
      <div id={"menu"}>
        <CornerSelector />
        <button onClick={() => setWantPurge(true)}>
          <Image 
            src={"/images/export.png"}
            alt={"pdf"} 
            width={24} 
            height={24}
          />
        </button>
        <button onClick={() => handlePurgeData()}>
          <Image
           src={'/images/delete.png'} 
           alt={'purge'}
           width={24}
           height={24} 
          />
        </button>    
      </div>
    </header>
  </>
  )
}

export default Header;