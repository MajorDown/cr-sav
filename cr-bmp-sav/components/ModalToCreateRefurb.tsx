import { categoriesList, constructorsList, Intervention, ProductCategory, ProductConstructor, Refurbishment, Status, statusList } from "@/constants/types"
import Modal from "./Modal"
import { useState, FormEvent } from "react"
import { useRefurbContext } from "@/contexts/RefurbContext"
import { useCornerContext } from "@/contexts/CornerContext"
import idMaker from "@/constants/idMaker"
import InterventionCard from "./InterventionCard"


export type ModalToUpdateSavProps = {
    onClose: (isClosed: boolean) => void
}

const ModalToCreateSav = (props: ModalToUpdateSavProps) => {
    const { listOfRefurb, updateListOfRefurb } = useRefurbContext();
    const { actualCorner } = useCornerContext();
    const [newIntervention, setNewIntervention] = useState<Intervention>({todo: "", isDone: false})
    const [newRefurb, setNewRefurb] = useState<Refurbishment>({
        id: idMaker(),
        corner: actualCorner ? actualCorner.id : "",
        product: {
            RefurbId: "",
            category: "smartphone",
            constructor: "Apple",
            model: "",
            informations: "",
            buyDate: new Date()
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

    const handleCreateIntervention = () => {}

    const handleUpdateIntervention = (intervention: any) => {}

    const handleDeleteIntervention = (intervention: any) => {}

    const handleSubmit = async (event: FormEvent) => {}

    return (
        <Modal onClose={props.onClose}>
            <div id={"modalToCreateRefurb"}>
                <h3>Nouveau reconditionnement</h3>
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
                                    value={newRefurb.product.category}
                                    onChange={(e) => setNewRefurb({...newRefurb, product: {...newRefurb.product, category: e.target.value as ProductCategory}})}
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
                                    value={newRefurb.product.constructor}
                                    onChange={(e) => setNewRefurb({...newRefurb, product: {...newRefurb.product, constructor: e.target.value as ProductConstructor}})}
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
                                    value={newRefurb.product.model}
                                    onChange={(e) => setNewRefurb({...newRefurb, product: {...newRefurb.product, model: e.target.value}})}
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="informations">Informations: </label>
                                <textarea
                                    name="informations"
                                    id="informations"
                                    placeholder="Informations"
                                    value={newRefurb.product.informations}
                                    onChange={(e) => setNewRefurb({...newRefurb, product: {...newRefurb.product, informations: e.target.value}})}
                                />
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="saleDate">acheté le* : </label>
                                <input
                                    required
                                    type="date"
                                    id="saleDate"
                                    name="saleDate"
                                    value={newRefurb.product.buyDate.toISOString().split("T")[0]}
                                    onChange={(e) => {
                                        const newDate = new Date(e.target.value);
                                        setNewRefurb({...newRefurb, product: {...newRefurb.product, buyDate: newDate}});
                                    }}
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
                                value={newRefurb.log[0].report}
                                onChange={(e) => setNewRefurb({...newRefurb, log: [{...newRefurb.log[0], report: e.target.value}]})}
                                maxLength={200}
                                rows={2} 
                                cols={40}
                            />
                        </div>
                        <div id={"interventionsLister"}>
                            {newRefurb.log[0].interventions.map((intervention, index) => (
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
                                value={newRefurb.log[0].status}
                                onChange={(e) => setNewRefurb({...newRefurb, log: [{...newRefurb.log[0], status: e.target.value as Status}]})}
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