import { Refurbishment } from '@/constants/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export type RefurbCardProps = {
    refurb: Refurbishment,
    onDoubleClic: () => void
}

const RefurbCard = (props: RefurbCardProps) => {
    const [status, setStatus] = useState<string>("")
    useEffect(() => {
        switch (props.refurb.log[props.refurb.log.length - 1].status) {
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
    }, [props.refurb])

    return (
        <div 
            className={"refurbCard"}
            onDoubleClick={props.onDoubleClic}
        >
            <div className="cardInfos">
                <p>{props.refurb.id}</p>
                <p>{props.refurb.product.constructor} {props.refurb.product.model}</p>
            </div>
            <div className="interventionsList">
                {props.refurb.log[props.refurb.log.length - 1].interventions?.map((intervention, index) => (
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
                    width={status === "delivered" ? 36 : 24} 
                    height={status === "delivered" ? 36 : 24} 
                    alt="livré"
                />
            </div>
        </div>
    )
}

export default RefurbCard;