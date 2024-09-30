import { SAV } from '@/constants/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export type SavCardProps = {
    sav: SAV
}

const SavCard = (props: SavCardProps) => {
    const [status, setStatus] = useState<string>("")
    useEffect(() => {
        switch (props.sav.log[props.sav.log.length - 1].status) {
            case "livré":
                setStatus("delivered")
                break;
            case "réparé":
                setStatus("repaired")
                break;
            case "en réparation":
                setStatus("inRepair")
                break;
            case "pièces en attente":
                setStatus("waitingPiece")
                break;
            case "commande en attente":
                setStatus("waitingOrder")
                break;
            default:
                setStatus("waiting")
        }
    }, [props.sav])
    
    return (
        <div className={`savCard ${status}`}>
            <p>{props.sav.id}</p>
            <p>client : {props.sav.clientName}</p>
            <p>appareil : {props.sav.product.constructor} {props.sav.product.model}</p>
            <Image 
                src={
                    status === "delivered" && "/images/livré.png" ||
                    status === "repaired" && "/images/réparé.png" ||
                    status === "inRepair" && "/images/en_réparation.png" ||
                    status === "waitingPiece" && "/images/en_attente_réparation.png" ||
                    "/images/en_attente_commande.png"
                } 
                width={24} 
                height={24} 
                alt="status" 
            />
        </div>
    )
}

export default SavCard;