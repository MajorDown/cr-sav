import { FormEvent, useState } from "react";
import { SAV, Intervention, statusList } from "@/constants/types";
import LogCard from "./LogCard";
import InterventionCard from "./InterventionCard";

export type UpdateSAVInfosFormProps = {
    actualSav: SAV;
}

const UpdateSAVLogForm = (props: UpdateSAVInfosFormProps) => {
    const [report, setReport] = useState<string>("");
    const [status, setStatus] = useState<string>(props.actualSav.log[props.actualSav.log.length - 1].status);
    const [newTodo, setNewTodo] = useState<string>("");
    const [newIsDone, setNewIsDone] = useState<boolean>(false);
    const [interventions, setInterventions] = useState<Intervention[]>(props.actualSav.log[props.actualSav.log.length - 1].interventions);

    const handleCreateIntervention = () => {
        setInterventions([...interventions, {todo: newTodo, isDone: newIsDone}]);
        setNewTodo("");
        setNewIsDone(false);
    }

    const handleCreateLog = (event: FormEvent) => {
        event.preventDefault();
        
    }

    return (
        <form onSubmit={(e) => handleCreateLog(e)} id={"updateSAVLogForm"}>
            <div id={"logLister"}>
                {props.actualSav && props.actualSav.log.map((log, index) => (
                    <LogCard key={index} log={log} />
                ))}
                {props.actualSav && props.actualSav.log.length === 0 && <p>Aucun log pour ce SAV</p>}
            </div>
            <div id={"logCreater"}>
                <div className={"inputWrapper"}>
                    <label htmlFor={"report"}>Rapport de la mise à jour :</label>
                    <input 
                        type="text" 
                        id="report"
                        placeholder="écran noir, bouton power HS, etc."
                        value={report}
                        onChange={(e) => setReport(e.target.value)}
                    />
                </div>
                <div className={"inputWrapper"}>
                    <label htmlFor={"status"}>Statut du SAV :</label>
                    <select
                        required
                        name="status"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {statusList.map((status, index) => (
                            <option key={index} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={"HorizontalWrapper"}>
                    <div className={"inputWrapper"}>
                        <label htmlFor={"newTodo"}>Nouvelle intervention à prévoir :</label>
                        <input 
                            type="text" 
                            id="newTodo"
                            placeholder="changer l'écran, vérifier la batterie, etc."
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                    </div>
                    <div className={"inputWrapper"}>
                        <label htmlFor={"newIsDone"}>réalisée ?</label>
                        <input 
                            type="checkbox" 
                            id="newIsDone"
                            checked={newIsDone}
                            onChange={(e) => setNewIsDone(e.target.checked)}
                        />
                    </div>
                </div>
                <button onClick={() => handleCreateIntervention()}>
                    Créer cette intervention
                </button>
                <div id={"interventionsLister"}>
                    {interventions.map((intervention, index) => (
                        <InterventionCard 
                            key={index} 
                            intervention={intervention} 
                            onDelete={(intervention) => setInterventions(interventions.filter(i => i !== intervention))} 
                        />
                    ))}
                    {interventions.length === 0 && <p>Aucune intervention à prévoir</p>}
                </div>
            </div>
            <button type="submit">Actualiser le Log</button>
        </form>
    )
}

export default UpdateSAVLogForm;