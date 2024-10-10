import { SAV, categoriesList, constructorsList, ProductConstructor, ProductCategory } from "@/constants/types"
import { useSAVContext } from "@/contexts/SAVContext";
import { useState } from "react"

export type UpdateSAVInfosFormProps = {
    actualSav: SAV | null;
}

const UpdateSAVInfosForm = (props: UpdateSAVInfosFormProps) => {
    const { listOfSAV, updateListOfSAV } = useSAVContext();
    const [category, setCategory] = useState<ProductCategory | "">(props.actualSav?.product.category || "");
    const [constructor, setConstructor] = useState<ProductConstructor | "">(props.actualSav?.product.constructor || "");
    const [model, setModel] = useState<string>(props.actualSav?.product.model || "");
    const [informations, setInformations] = useState<string>(props.actualSav?.product.informations || "");
    const [saleDate, setSaleDate] = useState<Date>(props.actualSav?.product.saleDate || new Date());
    const [clientName, setClientName] = useState<string>(props.actualSav?.clientName || "");
    const [clientTel, setClientTel] = useState<string>(props.actualSav?.clientContact.tel || "");
    const [clientMail, setClientMail] = useState<string>(props.actualSav?.clientContact.email || "");

    const handleUpdateSAV = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!category || !constructor || !model || !saleDate || !clientName || !clientTel) {
            alert("Veuillez remplir tous les champs obligatoires (*)");
            return;
        }
        const updatedSAV: SAV = {
            id: props.actualSav?.id || "",
            corner: props.actualSav?.corner || "",
            clientName: clientName,
            clientContact: { tel: clientTel, email: clientMail },
            product: { category: category, constructor: constructor, model: model, informations: informations, saleDate: saleDate },
            log: props.actualSav?.log || []
        }
        const updateSavInfos = await fetch("/api/sav/updateInfos", {
            method: "PUT",
            body: JSON.stringify({ updatedSAV: updatedSAV }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (updateSavInfos.ok) {
            const updatedSAV = await updateSavInfos.json();
            alert(`Les informations du SAV ${updatedSAV.id} ont bien été mises à jour`);
            // Mise à jour de la liste des SAV dans le contexte
            updateListOfSAV(listOfSAV?.map(sav => sav.id === updatedSAV.id ? updatedSAV : sav) || []);
            // simule l'appuye sur la touche  'échap" pour fermer le modal
            const event = new KeyboardEvent("keydown", { key: "Escape" });
            document.dispatchEvent(event);
        } else {
            alert("Une erreur est survenue lors de la mise à jour des informations. Veuillez réessayer plus tard.");
        }
    };

        // Fonction utilitaire pour formater la date au format YYYY-MM-DD
        const formatDate = (date: Date): string => {
            const newdate = new Date(date)
            const year = newdate.getFullYear();
            const month = String(newdate.getMonth() + 1).padStart(2, '0');
            const day = String(newdate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

    return (
        <form id="updateSAVInfosForm" onSubmit={handleUpdateSAV}>
            <div className="verticalWrapper">
                <div className={"horizontalWrapper"}>
                    <p>Produit concerné :</p>
                    <div className="inputWrapper">
                        <label htmlFor="category">Catégorie* : </label>
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
                        <label htmlFor="constructor">Fabriquant* : </label>
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
                        <label htmlFor="model">Modèle* : </label>
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
                            name="informations"
                            id="informations"
                            placeholder="Informations"
                            value={informations}
                            onChange={(e) => setInformations(e.target.value)}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="saleDate">Vendu le* : </label>
                        <input
                            required
                            type="date"
                            id="saleDate"
                            name="saleDate"
                            value={formatDate(saleDate)}
                            onChange={(e) => {
                                const newDate = new Date(e.target.value);
                                setSaleDate(newDate);
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
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
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
                            value={clientTel}
                            onChange={(e) => setClientTel(e.target.value)}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="clientMail">Mail du client : </label>
                        <input
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
            <button className={"submit"} type="submit">Valider les Modifications</button>
        </form>
    );
};

export default UpdateSAVInfosForm;
