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
            <p>{props.refurb.id}</p>
            <p>{props.refurb.product.constructor} {props.refurb.product.model}</p>
            <p>{props.refurb.log[props.refurb.log.length - 1].status}</p>
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

export default RefurbCard;