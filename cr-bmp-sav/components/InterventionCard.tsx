import { Intervention } from '@/constants/types';
import Image from 'next/image';

export type InterventionCardProps = {
    intervention: Intervention
    onDelete: (intervention: Intervention) => void
}

const InterventionCard = (props : InterventionCardProps) => {
    return (
        <div className={props.intervention.isDone ? "interventionCard isDone" : "interventionCard"}>
            <p>{props.intervention.todo}{props.intervention.isDone ? " (✓)" : ""}</p>
            <button onClick={() => props.onDelete(props.intervention)}>
                <Image 
                    src={'/images/delete.png'} 
                    alt={'delete' } 
                    width={24}
                    height={24}
                />
            </button>
        </div>
    )
}

export default InterventionCard;