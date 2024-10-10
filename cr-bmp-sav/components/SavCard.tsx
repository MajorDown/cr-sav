import { SAV } from '@/constants/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export type SavCardProps = {
    sav: SAV
    onDoubleClic: () => void
}

const SavCard = (props: SavCardProps) => {
    const [status, setStatus] = useState<string>("")
    useEffect(() => {
        switch (props.sav.log[props.sav.log.length - 1].status) {
            case "livré":
                setStatus("released")
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
                setStatus("waitingOrder")
        }
    }, [props.sav])
    
    return (
        <div 
            className={`savCard ${status}`}
            onDoubleClick={props.onDoubleClic}
        >
            <div className={"cardInfos"}>
                <p>{props.sav.id}</p>
                <p>client : {props.sav.clientName}</p>
                <p>appareil : {props.sav.product.constructor} {props.sav.product.model}</p>
            </div>
            <div className="interventionsList">
                {props.sav.log[props.sav.log.length - 1].interventions?.map((intervention, index) => (
                    <span key={index}>{intervention.todo} {intervention.isDone? "(✓)" : ""}</span>
                ))}
            </div>
            <div className={"statusViewer"}>
                <Image 
                    src={`/images/en_attente_commande.png`} 
                    width={status === "waitingOrder" ? 36 : 24} 
                    height={status === "waitingOrder" ? 36 : 24} 
                    alt="en attente commande" 
                />
                <Image 
                    src={"/images/en_attente_pièce.png"} 
                    width={status === "waitingPiece" ? 36 : 24} 
                    height={status === "waitingPiece" ? 36 : 24} 
                    alt="en attente pièce"
                />
                <Image 
                    src={"/images/en_réparation.png"} 
                    width={status === "inRepair" ? 36 : 24} 
                    height={status === "inRepair" ? 36 : 24} 
                    alt="en réparation"
                />
                <Image 
                    src={"/images/réparé.png"} 
                    width={status === "repaired" ? 36 : 24} 
                    height={status === "repaired" ? 36 : 24} 
                    alt="réparé"
                />
                <Image 
                    src={"/images/livré.png"} 
                    width={status === "released" ? 36 : 24} 
                    height={status === "released" ? 36 : 24} 
                    alt="livré"
                />
            </div>
        </div>
    )
}

export default SavCard;