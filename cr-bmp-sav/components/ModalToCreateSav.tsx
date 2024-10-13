import { categoriesList, constructorsList, SAV } from "@/constants/types"
import Modal from "./Modal"
import { FormEvent, useState } from "react"
import { useSAVContext } from "@/contexts/SAVContext"

export type ModalToCreateSavProps = {
    onClose: (isClosed: boolean) => void
}

const ModalToCreateSav = (props: ModalToCreateSavProps) => {
    const { listOfSAV, updateListOfSAV } = useSAVContext()
    const [newSav, setNewSav] = useState<SAV>({
        id: Math.random().toString(),
        corner: "",
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

    const handleSubmit = async (event: FormEvent) => {}

    return (
        <Modal onClose={props.onClose}>
            <div id={"modalToCreateSAV"}>
                <h3>Nouveau SAV</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
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
                                    onChange={() => setNewSav({...newSav, product: {...newSav.product, category: newSav.product.category}})}
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
                                    onChange={() => setNewSav({...newSav, product: {...newSav.product, constructor: newSav.product.constructor}})}
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
                        <p>Remplissez ce formulaire pour établir le premier Log</p>
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
                </form>                
            </div>
        </Modal>
    )
}

export default ModalToCreateSav;