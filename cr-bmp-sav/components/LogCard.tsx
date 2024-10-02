import { Log } from "@/constants/types";

export type LogCardProps = {
    log: Log
}

const LogCard = (props: LogCardProps) => {
    const logDate = new Date(props.log.date);
    const day = logDate.getDate().toString().padStart(2, "0");
    const month = (logDate.getMonth() + 1).toString().padStart(2, "0");
    const year = logDate.getFullYear().toString();
    return (
        <div className="logCard">
            <p>{day}/{month}/{year} : "{props.log.report}" ({props.log.status})</p>
            <p> à faire :
                {props.log.interventions.map((intervention, index) => (
                    <span key={index}>{intervention.todo} {intervention.isDone ? "(✓)" : ""}</span>
                ))}
                {props.log.interventions.length === 0 && <span>aucune intervention</span>}
            </p>
        </div>
    )
}

export default LogCard;