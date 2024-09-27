import Image from 'next/image'
import Button from './Button'

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
        <Button>
          <Image 
            src="/images/reload.png"
            alt="ajouter" 
            width={32} 
            height={32} 
          />
        </Button>
      </div>
    </header>
  )
}

export default Header