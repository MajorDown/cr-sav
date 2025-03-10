/**
 * @description génère un identifiant unique à 12 chiffre relatifs à la date et l'heure
 * @returns {string} a unique id
 */
const idMaker = (): string => {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")
    const milliseconds = date.getMilliseconds().toString().padStart(3, "0")
    return year + month + day + hours + minutes + seconds + milliseconds
}

export default idMaker