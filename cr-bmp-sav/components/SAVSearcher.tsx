import { useState } from "react";
import Switch from "./Switch";
import Image from "next/image";

export type SAVSearcherProps = {
    onChangeMode: (mode: "byName" | "byModel") => void;
    onChangeSearchValue: (searchValue: string) => void;
}


const SAVSearcher = (props: SAVSearcherProps) => {
    const [mode, setMode] = useState<"byName" | "byModel">("byName");
    const [searchValue, setSearchValue] = useState<string>("");

    const handleChangeMode = (mode: "byName" | "byModel") => {
        setMode(mode);
        props.onChangeMode(mode);
    }

    const handleChangeSearchValue = (searchVal: string) => {
        setSearchValue(searchVal);
        props.onChangeSearchValue(searchVal);
    }

    return (
        <div id={"savSearcherContainer"}>
            <Image src={"/images/search.png"} alt={"Rechercher"} width={24} height={24}/>
            <input
                type="savSearcher" 
                id="param" 
                placeholder={`rentrez un ${mode === "byName" ? "nom" : "modèle"}`}
                value={searchValue}
                onChange={(e) => handleChangeSearchValue(e.target.value)}

            />
            <Switch 
                onChange={(param) => handleChangeMode(param === "left" ? "byName" : "byModel")}
                leftLabel={"par Nom"}
                rightLabel={"par Modèle"}
            />
        </div>
    )
}

export default SAVSearcher;