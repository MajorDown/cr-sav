import { categoriesList, constructorsList, Intervention, ProductCategory, ProductConstructor, SAV, Status, statusList } from "@/constants/types"
import Modal from "./Modal"
import { FormEvent, useState } from "react"
import { useSAVContext } from "@/contexts/SAVContext"
import { useCornerContext } from "@/contexts/CornerContext"
import InterventionCard from "./InterventionCard"
import idMaker from "@/constants/idMaker"

export type ModalToCreateSavProps = {
    onClose: (isClosed: boolean) => void
}

const ModalToCreateSav = (props: ModalToCreateSavProps) => {
    const { listOfSAV, updateListOfSAV } = useSAVContext();
    const { actualCorner } = useCornerContext();
    const [newIntervention, setNewIntervention] = useState<Intervention>({todo: "", isDone: false})
    const [newSav, setNewSav] = useState<SAV>({
        id: idMaker(),
        corner: actualCorner ? actualCorner.id : "",
        clientName: "",
        clientContact: {
            email: "",
            tel: ""
        },
        product: {
            category: "smartphone",
            constructor: "Apple",
            model: "",
            informations: "",
            saleDate: new Date()
        },
        log: [
            {
                date: new Date(),
                status: "commande en attente",
                report: "",
                interventions: []
            }
        ]
    })

    const handleCreateIntervention = () => {
        setNewSav({...newSav, log: [{...newSav.log[0], interventions: [...newSav.log[0].interventions, newIntervention]}]})
        setNewIntervention({todo: "", isDone: false})
    }

    const handleUpdateIntervention = (intervention: Intervention) => {
        const updatedIntervention = { ...intervention, isDone: !intervention.isDone }
        setNewSav({...newSav, log: [{...newSav.log[0], interventions: newSav.log[0].interventions.map((i: Intervention) => i === intervention ? updatedIntervention : i)}]})
    }

    const handleDeleteIntervention = (intervention: Intervention) => {
        setNewSav({...newSav, log: [{...newSav.log[0], interventions: newSav.log[0].interventions.filter((i: Intervention) => i !== intervention)}]})
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const createSav = await fetch("/api/sav/create", {
            method: "POST",
            body: JSON.stringify({ newSAV: newSav }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (createSav.ok) {
            const createdSav = await createSav.json();
            alert(`Le SAV ${createdSav.id} a bien été créé`);
            updateListOfSAV(listOfSAV ? [...listOfSAV, createdSav] : [createdSav]);
            props.onClose(true);
        } else {
            alert("Une erreur est survenue lors de la création du SAV. Veuillez réessayer plus tard.");
        }
    }

    return (
        <Modal onClose={props.onClose}>
            <div id={"modalToCreateSAV"}>
                <h3>Nouveau SAV</h3>
                <form id={"createSAVForm"} onSubmit={(e) => handleSubmit(e)}>
                    <div className="verticalWrapper">
                        <div className={"horizontalWrapper"}>
                            <p>Produit concerné :</p>
                            <div className="inputWrapper">
                                <label htmlFor="category">Catégorie* : </label>
                                <select
                                    required
                                    name="category"
                                    id="category"
                                    value={newSav.product.category}
                                    onChange={(e) => setNewSav({...newSav, product: {...newSav.product, category: e.target.value as ProductCategory}})}
                                >
                                    {categoriesList.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="constructor">Fabriquant* : </label>
                                <select
                                    required
                                    name="pieceMark"
                                    id="pieceMark"
                                    value={newSav.product.constructor}
                                    onChange={(e) => setNewSav({...newSav, product: {...newSav.product, constructor: e.target.value as ProductConstructor}})}
                                >
                                    {constructorsList.map((constructor, index) => (
                                        <option key={index} value={constructor}>
                                            {constructor}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="model">Modèle* : </label>
                                <input
                                    required
                                    type="text"
                                    id="model"
                                    name="model"
                                    placeholder="Modèle"
                                    value={newSav.product.model}
                                    onChange={(e) => setNewSav({...newSav, product: {...newSav.product, model: e.target.value}})}
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="informations">Informations: </label>
                                <textarea
                                    name="informations"
                                    id="informations"
                                    placeholder="Informations"
                                    value={newSav.product.informations}
                                    onChange={(e) => setNewSav({...newSav, product: {...newSav.product, informations: e.target.value}})}
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="saleDate">Vendu le* : </label>
                                <input
                                    required
                                    type="date"
                                    id="saleDate"
                                    name="saleDate"
                                    value={newSav.product.saleDate.toISOString().split("T")[0]}
                                    onChange={(e) => {
                                        const newDate = new Date(e.target.value);
                                        setNewSav({...newSav, product: {...newSav.product, saleDate: newDate}});
                                    }}
                                />
                            </div>
                        </div>
                        <div className={"horizontalWrapper"}>                
                            <p>Informations sur le client :</p>
                            <div className="inputWrapper">
                                <label htmlFor="clientName">Nom du client* : </label>
                                <input
                                    required
                                    type="text"
                                    id="clientName"
                                    name="clientName"
                                    placeholder="Nom du client"
                                    value={newSav.clientName}
                                    onChange={(e) => setNewSav({...newSav, clientName: e.target.value})}
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="clientContact">Tel du client* : </label>
                                <input
                                    required
                                    type="tel"
                                    id="clientContact"
                                    name="clientContact"
                                    placeholder="Contact du client"
                                    value={newSav.clientContact.tel}
                                    onChange={(e) => setNewSav({...newSav, clientContact: {...newSav.clientContact, tel: e.target.value}})}
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="clientMail">Mail du client : </label>
                                <input
                                    type="email"
                                    id="clientMail"
                                    name="clientMail"
                                    placeholder="Mail du client"
                                    value={newSav.clientContact.email || ""}
                                    onChange={(e) => setNewSav({...newSav, clientContact: {...newSav.clientContact, email: e.target.value}})}
                                />
                            </div>
                        </div>
                    </div>
                    <div id={"logCreator"}>
                        <p>Remplissez ce formulaire pour établir le premier log du SAV</p>
                        <div className={"inputWrapper"}>
                            <label htmlFor={"report"}>Constat justifiant le SAV :</label>
                            <textarea
                                id="report"
                                placeholder="écran noir, bouton power HS, etc."
                                value={newSav.log[0].report}
                                onChange={(e) => setNewSav({...newSav, log: [{...newSav.log[0], report: e.target.value}]})}
                                maxLength={200}
                                rows={2} 
                                cols={40}
                            />
                        </div>
                        <div id={"interventionsLister"}>
                            {newSav.log[0].interventions.map((intervention, index) => (
                                <InterventionCard 
                                    key={index} 
                                    intervention={intervention} 
                                    onClick={(intervention) => handleUpdateIntervention(intervention)}
                                    onDelete={(intervention) => handleDeleteIntervention(intervention)} 
                                />
                            ))}
                        </div>
                        <div className={"verticalWrapper"}>
                            <div className={"inputWrapper"}>
                                <label htmlFor={"newTodo"}>Nouvelle intervention à prévoir (facultatif) :</label>
                                <input 
                                    type="text" 
                                    id="newTodo"
                                    placeholder="changer l'écran, vérifier la batterie, etc."
                                    value={newIntervention.todo}
                                    onChange={(e) => setNewIntervention({...newIntervention, todo: e.target.value})}
                                />
                            </div>
                            <div className={"inputWrapper"}>
                                <label htmlFor={"newIsDone"}>déjà réalisé ?</label>
                                <input 
                                    type="checkbox" 
                                    id="newIsDone"
                                    checked={newIntervention.isDone}
                                    onChange={(e) => setNewIntervention({...newIntervention, isDone: e.target.checked})}
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
                                value={newSav.log[0].status}
                                onChange={(e) => setNewSav({...newSav, log: [{...newSav.log[0], status: e.target.value as Status}]})}
                            >
                                {statusList.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button className={"submit"} type="submit">Créer le SAV</button>
                </form>                
            </div>
        </Modal>
    )
}

export default ModalToCreateSav;