import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Contact, Log, ProductToSAV, SAV } from "@/constants/types";

/**
 * fonction pour actualiser les infos d'un SAV
 * @param updatedSAV - SAV
 * @returns Promise<SAV>
 */
async function updateSAVInfos(updatedSAV: SAV): Promise<SAV> {
    // update des infos du SAV
    const sav = await prisma.sAV.update({
        where: {
            id: updatedSAV.id,
        },
        data: {
            clientName: updatedSAV.clientName,
            clientContact: JSON.stringify(updatedSAV.clientContact), // Sérialisation du contact client
            product: JSON.stringify(updatedSAV.product), // Sérialisation du produit
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

// Fonction UPDATE pour actualiser les infos d'un SAV
export async function PUT(request: Request) {
    const { updatedSAV } = await request.json();
    console.log(`api/sav/updateInfos ~> actualisation des infos du SAV ${updatedSAV.id}`);
  
    try {
        // récupération de la liste des SAV par corner via prisma
        const isLogUpdated: SAV = await updateSAVInfos(updatedSAV);
        return NextResponse.json(isLogUpdated, { status: 200 });
    } catch (error) {
        console.log(`api/sav/updateLog ~> error :`, error);
        return NextResponse.json("échec de la récupération des SAV", { status: 500 });
    }
}
