import { FormEvent, useState } from "react";
import { SAV, Intervention, statusList, Log, Status } from "@/constants/types";
import LogCard from "./LogCard";
import InterventionCard from "./InterventionCard";
import { useSAVContext } from "@/contexts/SAVContext";

export type UpdateSAVLogFormProps = {
    actualSav: SAV;
}

const UpdateSAVLogForm = (props: UpdateSAVLogFormProps) => {
    const {listOfSAV, updateListOfSAV} = useSAVContext();
    const [report, setReport] = useState<string>("");
    const [status, setStatus] = useState<Status>(props.actualSav.log[props.actualSav.log.length - 1].status);
    const [newTodo, setNewTodo] = useState<string>("");
    const [newIsDone, setNewIsDone] = useState<boolean>(false);
    const [log, setLog] = useState<Log[]>(props.actualSav.log);
    const [newInterventions, setNewInterventions] = useState<Intervention[]>(props.actualSav.log[props.actualSav.log.length - 1].interventions);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const handleCreateIntervention = () => {
        if (!newTodo.trim()) return;
        setNewInterventions((prevInterventions) => [
            ...prevInterventions,
            { todo: newTodo, isDone: newIsDone }
        ]);
        setNewTodo("");
        setNewIsDone(false);
    }

    const handleDeleteIntervention = (intervention: Intervention) => {
        setNewInterventions(newInterventions.filter(i => i !== intervention));
    }

    const handleUpdateIntervention = (intervention: Intervention) => {
        const updatedIntervention = { ...intervention, isDone: !intervention.isDone }; // Créer une copie avec la nouvelle valeur
        setNewInterventions(newInterventions.map(i => i === intervention ? updatedIntervention : i)); // Mettre à jour la liste avec la copie
    };

    const handleCreateLog = async (event: FormEvent) => {
        event.preventDefault();
        const newLog: Log = {
            date: new Date(),
            report: report,
            status: status,
            interventions: newInterventions
        }
        setLog([...log, newLog]);
        setReport("");
        setStatus("en réparation");
        setNewInterventions((prevInterventions) => [
            ...prevInterventions
        ]);
        const updateSavLog = await fetch("/api/sav/updateLog", {
            method: "PUT",
            body: JSON.stringify({ id: props.actualSav.id, log: newLog }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (updateSavLog.ok && listOfSAV) {
            const updatedListOfSAV = listOfSAV.map(sav => sav.id === props.actualSav.id ? {...sav, log: [...sav.log, newLog]} : sav);
            updateListOfSAV(updatedListOfSAV);
        }
        else {
            setErrorMsg("Une erreur est survenue lors de la mise à jour du log")
        }
    }

    return (
        <form onSubmit={(e) => handleCreateLog(e)} id={"updateSAVLogForm"}>
            <div id={"logLister"}>
                {log.map((log, index) => (
                    <LogCard key={index} log={log} />
                ))}
                {log.length === 0 && <p>Aucun log pour ce SAV</p>}
            </div>
            <div id={"logCreator"}>
                <p>Vous souhaitez actualiser le log ? Remplissez ce formulaire</p>
                <div className={"inputWrapper"}>
                    <label htmlFor={"report"}>Rapport de la mise à jour :</label>
                    <textarea
                        id="report"
                        placeholder="écran noir, bouton power HS, etc."
                        value={report}
                        onChange={(e) => setReport(e.target.value)}
                        maxLength={200}
                        rows={2} 
                        cols={40}
                    />
                </div>
                <div id={"interventionsLister"}>
                    {newInterventions.map((intervention, index) => (
                        <InterventionCard 
                            key={index} 
                            intervention={intervention} 
                            onClick={(intervention) => handleUpdateIntervention(intervention)}
                            onDelete={(intervention) => handleDeleteIntervention(intervention)} 
                        />
                    ))}
                    {newInterventions.length === 0 && <p>Aucune intervention à prévoir</p>}
                </div>
                <div className={"verticalWrapper"}>
                    <div className={"inputWrapper"}>
                        <label htmlFor={"newTodo"}>Nouvelle intervention à prévoir (facultatif) :</label>
                        <input 
                            type="text" 
                            id="newTodo"
                            placeholder="changer l'écran, vérifier la batterie, etc."
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                    </div>
                    <div className={"inputWrapper"}>
                        <label htmlFor={"newIsDone"}>déjà réalisé ?</label>
                        <input 
                            type="checkbox" 
                            id="newIsDone"
                            checked={newIsDone}
                            onChange={(e) => setNewIsDone(e.target.checked)}
                        />
                    </div>
                </div>
                <button className={"actionBtn"} type={"button"} onClick={() => handleCreateIntervention()}>
                    Créer cette intervention
                </button>
                <div className={"inputWrapper"}>
                    <label htmlFor={"status"}>Statut du SAV :</label>
                    <select
                        required
                        name="status"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as Status)}
                    >
                        {statusList.map((status, index) => (
                            <option key={index} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button className={"submit"} type="submit">Actualiser le Log</button>
            {errorMsg && <p>{errorMsg}</p>}
        </form>
    )
}

export default UpdateSAVLogForm;