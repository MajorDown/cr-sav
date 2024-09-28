import Image from 'next/image'
import Button from './Button'
import CornerSelector from './CornerSelector'

const Header = () => {
  return (
    <header>
      <div id={"title"}>
        <Image 
          src="/images/bmp.png"
          alt="logo" 
          width={204} 
          height={66} 
        />
        <h1>Gestion des SAV</h1>
      </div>
      <div id={"menu"}>
        <CornerSelector />      
      </div>
    </header>
  )
}

export default Header