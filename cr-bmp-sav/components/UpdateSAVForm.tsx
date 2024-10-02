import { SAV, categoriesList, constructorsList, ProductConstructor, ProductCategory } from "@/constants/types"
import { useState } from "react"
import LogCard from "./LogCard";

export type UpdateSAVFormProps = {
    actualSav: SAV | null;
}

const UpdateSAVForm = (props: UpdateSAVFormProps) => {
    const [category, setCategory] = useState<ProductCategory | "">(props.actualSav?.product.category || "");
    const [constructor, setConstructor] = useState<ProductConstructor | "">(props.actualSav?.product.constructor || "");
    const [model, setModel] = useState<string>(props.actualSav?.product.model || "");
    const [informations, setInformations] = useState<string>(props.actualSav?.product.informations || "");
    const [saleDate, setSaleDate] = useState<Date | null>(props.actualSav?.product.saleDate || null);
    const [clientName, setClientName] = useState<string>(props.actualSav?.clientName || "");
    const [clientTel, setClientTel] = useState<string>(props.actualSav?.clientContact.tel || "");
    const [clientMail, setClientMail] = useState<string>(props.actualSav?.clientContact.email || "");

    const handleUpdateSAV = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic
    };

    return (
        <form id="updateSavForm" onSubmit={handleUpdateSAV}>
            <h3>SAV n°{props.actualSav && props.actualSav.id}</h3>

            {/* Encapsulation avec verticalWrapper */}
            <div className="verticalWrapper">
                <div className={"horizontalWrapper"}>
                    <p>Produit concerné :</p>
                    <div className="inputWrapper">
                        <label htmlFor="category">Catégorie : </label>
                        <select
                            required
                            name="category"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value as ProductCategory)}
                        >
                            {categoriesList.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="constructor">Fabriquant : </label>
                        <select
                            required
                            name="pieceMark"
                            id="pieceMark"
                            value={constructor}
                            onChange={(e) => setConstructor(e.target.value as ProductConstructor)}
                        >
                            {constructorsList.map((constructor, index) => (
                                <option key={index} value={constructor}>
                                    {constructor}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="inputWrapper">
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
                    <div className="inputWrapper">
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
                    <div className="inputWrapper">
                        <label htmlFor="saleDate">Vendu le : </label>
                        <input
                            required
                            type="date"
                            id="saleDate"
                            name="saleDate"
                            value={saleDate ? saleDate.toISOString().split("T")[0] : ""}
                            onChange={(e) => setSaleDate(new Date(e.target.value))}
                        />
                    </div>
                </div>

                <div className={"horizontalWrapper"}>                
                    <p>Informations sur le client :</p>
                    <div className="inputWrapper">
                        <label htmlFor="clientName">Nom du client : </label>
                        <input
                            required
                            type="text"
                            id="clientName"
                            name="clientName"
                            placeholder="Nom du client"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="clientContact">Tel du client : </label>
                        <input
                            required
                            type="tel"
                            id="clientContact"
                            name="clientContact"
                            placeholder="Contact du client"
                            value={clientTel}
                            onChange={(e) => setClientTel(e.target.value)}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="clientMail">Mail du client : </label>
                        <input
                            required
                            type="email"
                            id="clientMail"
                            name="clientMail"
                            placeholder="Mail du client"
                            value={clientMail}
                            onChange={(e) => setClientMail(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className={"VerticalWrapper"}>
                <p>Historique du SAV :</p>
                {props.actualSav?.log.map((log, index, arr) => (
                    <LogCard key={arr.length - 1 - index} log={arr[arr.length - 1 - index]} />
                ))}
            </div>
            <button type="submit">Valider les Modifications</button>
        </form>
    );
};

export default UpdateSAVForm;
