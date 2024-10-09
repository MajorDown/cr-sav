import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Contact, Log, ProductToSAV, SAV } from "@/constants/types";

// Fonction pour actualiser le log d'un SAV
async function updateSAVLog(id: string, Log: Log): Promise<SAV> {
    // update du log du SAV
    let sav = await prisma.sAV.update({
        where: {
            id: id,
        },
        data: {
            log: JSON.stringify([...JSON.parse((await prisma.sAV.findUnique({ where: { id: id } }))?.log || '[]'), Log]), // Ajout du nouveau log
        },
    });
    return {
        id: sav.id,
        corner: sav.corner,
        clientName: sav.clientName,
        clientContact: JSON.parse(sav.clientContact) as Contact, // Désérialisation du contact client
        product: JSON.parse(sav.product) as ProductToSAV, // Désérialisation du produit
        log: JSON.parse(sav.log) as Log[], // Désérialisation des logs
    }
}

// Fonction UPDATE pour actualiser le log d'un SAV
export async function UPDATE(request: Request) {
    const { id, log } = await request.json();
    console.log(`api/sav/updateLog} ~> actualisation du log du SAV ${id}`);
  
    try {
        // récupération de la liste des SAV par corner via prisma
        const isLogUpdated: SAV = await updateSAVLog(id, log);
        return NextResponse.json(isLogUpdated, { status: 200 });
    } catch (error) {
        console.log(`api/sav/getByCorner/${id} ~> error :`, error);
        return NextResponse.json("échec de la récupération des SAV", { status: 500 });
    }
}
