import Switch from "./Switch";
import Image from "next/image";

export type SAVSearcherProps = {
    onChangeMode: (mode: "byName" | "byModel") => void;
}


const SAVSearcher = (props: SAVSearcherProps) => {

    const handleChangeMode = (mode: "byName" | "byModel") => {
        props.onChangeMode(mode);
    }
    return (
        <div id={"savSearcherContainer"}>
            <Image src={"/images/search.png"} alt={"Rechercher"} width={24} height={24}/>
            <input
                type="savSearcher" 
                name="" 
                id="param" 
            />
            <Switch 
                onChange={(param) => handleChangeMode(param === "left" ? "byName" : "byModel")}
                leftLabel={"par Nom"}
                rightLabel={"par Modèle"}
            />
        </div>
    )
}

export default SAVSearcher