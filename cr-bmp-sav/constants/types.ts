// TYPES POUR LE CORNER

export type Contact = {
    tel: string,
    email: string | null
}

export type Corner = {
    id: string
    cornerName: string,
    cornerContact: Contact,
}

export type CornerContext = {
    actualCorner: Corner | null,
    updateActualCorner: (corner: Corner) => void
}

export type ProductCategory = "smartphone" | "tablette" | "laptop" | "montre connectée" | "console"

export type ProductConstructor = "Acer" | "Amazon" | "Apple" | "Asus" | "BlackBerry" | "Dell" | 
    "Fairphone" | "Fujitsu" | "Gigabyte" | "Google" | "HP" | "Honor" | "HTC" | "Huawei" | "Lenovo" | 
    "LG" | "Microsoft" | "Motorola" | "MSI" | "Nintendo" | "Nokia" | "Nvidia" | "OnePlus" | "Oppo" | 
    "Panasonic" | "Realme" | "Razer"| "Samsung" | "Sony" | "TCL" | "Xiaomi"

export type Product = {
    category: ProductCategory,
    constructor: ProductConstructor | string
    model: string,
    informations: string
}

// TYPES POUR LES SAV

export type ProductToSAV = Product & {
    saleDate: Date;
}

export type Status = "livré" | "réparé" | "en réparation" | "pièces en attente" | "commande en attente" 

export type Intervention = {
    todo: string,
    isDone: boolean
}

export type Log = {
    date: Date,
    status: Status,
    report: string,
    interventions: Intervention[]
}

export type SAV = {
    id: string
    corner: string,
    clientName: string,
    clientContact: Contact,
    product: ProductToSAV,
    log: Log[]
}

export type SAVContext = {
    listOfSAV: SAV[] | null,
    updateListOfSAV: (list: SAV[]) => void
}

// TYPES POUR LES REFURBISHMENTS

export type ProductToRefurb = Product & {
    RefurbId: string,
    buyDate: Date,
}

export type Refurbishment = {
    id: string,
    corner: string,
    product: ProductToRefurb,
    log: Log[]
}

export type RefurbishmentContext = {
    listOfRefurb: Refurbishment[] | null,
    updateListOfRefurb: (list: Refurbishment[]) => void
}
