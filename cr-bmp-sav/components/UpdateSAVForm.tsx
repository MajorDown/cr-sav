import { categoriesList, SAV, constructorsList, ProductConstructor, ProductCategory } from "@/constants/types"
import { useState } from "react"

export type UpdateSAVFormProps = {
    actualSav: SAV
}

const UpdateSAVForm = (props: UpdateSAVFormProps) => {
    const [category, setCategory] = useState<ProductCategory>(props.actualSav.product.category)
    const [constructor, setConstructor] = useState<ProductConstructor | "">(props.actualSav.product.constructor)
    const [model, setModel] = useState<string>(props.actualSav.product.model)
    const [informations, setInformations] = useState<string>(props.actualSav.product.informations)

    const handleUpdateSAV = (e: React.FormEvent<HTMLFormElement>) => {}

    return (
        <form 
            id={"updateSavForm"}
            onSubmit={(e) => handleUpdateSAV(e)}
        >
            <h3>SAV n°{props.actualSav.id}</h3>
            <p>Produit concerné :</p>
            <div className={"inputWrapper"}>
                <label htmlFor="category">Catégorie : </label>
                <select 
                    required
                    name="category" 
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                >
                    {categoriesList.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className={"inputWrapper"}>
                <label htmlFor="constructor">Fabriquant : </label>
                <select 
                    required
                    name="pieceMark" 
                    id="pieceMark"
                    value={constructor}
                    onChange={(e) => setConstructor(e.target.value as ProductConstructor)}
                >
                    {constructorsList.map((constructor, index) => (
                        <option key={index} value={constructor}>{constructor}</option>
                    ))}
                </select>
            </div>
            <div className={"inputWrapper"}>
                <label htmlFor="model">Modèle : </label>
                <input 
                    required
                    type="text" 
                    id="model" 
                    name="model" 
                    placeholder="Modèle"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />
            </div>
            <div className={"inputWrapper"}>
                <label htmlFor="informations">Informations: </label>
                <textarea 
                    required
                    name="informations" 
                    id="informations" 
                    placeholder="Informations"
                    value={informations}
                    onChange={(e) => setInformations(e.target.value)}
                />
            </div>
            <button type={"submit"}>Valider les Modifications</button>
        </form>
    );
}

export default UpdateSAVForm;