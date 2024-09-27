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

export type SAVStatus = {
    pending: boolean,
    isPiecesOrdered: boolean,
    isPiecesReceived: boolean,
    isWaitingClient: boolean,
    isRepaired: boolean
    isSolved: boolean
}

export type Log = {
    date: Date,
    status: SAVStatus,
    comment: string
}

export type SAV = {
    id: string
    clientName: string,
    clientContact: Contact,
    product: Product,
    actualStatus: SAVStatus,
    log: Log[]
}