import { SAV } from '@/constants/types';

export type SavCardProps = {
    sav: SAV
}

const SavCard = (props: SavCardProps) => {
    return (
        <div className={"savCard"}>
            <p>{props.sav.id}</p>
            <p>{props.sav.clientName}</p>
            <p>{props.sav.product.constructor} {props.sav.product.model}</p>
            <p>{props.sav.log[props.sav.log.length - 1].status}</p>
        </div>
    )
}

export default SavCard;