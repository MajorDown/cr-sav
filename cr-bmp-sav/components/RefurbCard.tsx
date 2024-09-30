import { Refurbishment } from '@/constants/types';

export type RefurbCardProps = {
    refurb: Refurbishment
}

const RefurbCard = (props: RefurbCardProps) => {
    return (
        <div className={"savCard"}>
            <p>{props.refurb.id}</p>
            <p>{props.refurb.product.constructor} {props.refurb.product.model}</p>
            <p>{props.refurb.log[props.refurb.log.length - 1].status}</p>
        </div>
    )
}

export default RefurbCard;