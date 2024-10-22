import { useState } from 'react'
import Image from 'next/image'
import CornerSelector from './CornerSelector'

const Header = () => {
  const [wantPurge, setWantPurge] = useState<boolean>(false);
  const handlePurgeData = () => {}

  return (
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
        <button onClick={() => handlePurgeData()}>
          <Image src={'/images/delete.png'} alt={'purge'} />
        </button>    
      </div>
    </header>
  )
}

export default Header;