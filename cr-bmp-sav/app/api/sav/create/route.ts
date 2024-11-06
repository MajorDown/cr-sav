import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { SAV } from "@/constants/types";

/**
 * fonction pour créer un SAV
 * @param newSav - SAV
 * @returns Promise<SAV>
 */
async function createSAV(newSav: SAV): Promise<SAV> {
    // création du SAV dans la base de donnée avec prisma
    const sav = await prisma.sAV.create({
        data: {
            id: newSav.id,
            corner: newSav.corner,
            clientName: newSav.clientName,
            clientContact: JSON.stringify(newSav.clientContact),
            product: JSON.stringify(newSav.product),
            log: JSON.stringify(newSav.log),
        },
    });
    console.log(`prisma ~> SAV créé : ${sav.id}`);
    return newSav;
}

// Fonction POST pour actualiser le log d'un SAV
export async function POST(request: Request) {
    const { newSAV } = await request.json();
    console.log(`api/sav/create ~> création d'un nouveau SAV en cour : ${newSAV.id}`); 
    try {
        // création du SAV via prisma
        const isSAVCreated: SAV = await createSAV(newSAV);
        return NextResponse.json(isSAVCreated, { status: 200 });
    } catch (error) {
        console.log(`api/sav/create ~> error :`, error);
        return NextResponse.json("échec de la création du SAV", { status: 500 });
    }
}
