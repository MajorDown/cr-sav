export type Contact = {
    tel: string,
    email: string | null
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
    saleDate: Date | null
    informations: string
}

export type SAVStatus = "livré" | "réparé" | "en réparation" | "pièces en attente" | "commande en attente" 

export type Log = {
    date: Date,
    status: SAVStatus,
    comment: string
}

export type SAV = {
    id: string
    corner: string,
    clientName: string,
    clientContact: Contact,
    product: Product,
    actualStatus: SAVStatus,
    log: Log[]
}

export type SAVContext = {
    listOfSAV: SAV[] | null,
    updateListOfSAV: (list: SAV[]) => void
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