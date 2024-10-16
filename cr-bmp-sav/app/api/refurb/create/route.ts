import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Refurbishment } from "@/constants/types";

/**
 * fonction pour créer un reconditionnement
 * @param newRefurb - Refurbishment
 * @returns Promise<Refurbishment>
 */
async function createRefurb(newRefurb: Refurbishment): Promise<Refurbishment> {
    // création du refurb dans la base de donnée avec prisma
    let refurb = await prisma.refurbishment.create({
        data: {
            id: newRefurb.id,
            corner: newRefurb.corner,
            product: JSON.stringify(newRefurb.product),
            log: JSON.stringify(newRefurb.log),
        },
    });
    return newRefurb;
}

// Fonction POST pour actualiser le log d'un refurb
export async function POST(request: Request) {
    const { newRefurb } = await request.json();
    console.log(`api/refurb/create ~> création d'un nouveau refurb en cour : ${newRefurb.id}`); 
    try {
        // création du refurb via prisma
        const isRefurbCreated: Refurbishment = await createRefurb(newRefurb);
        return NextResponse.json(isRefurbCreated, { status: 200 });
    } catch (error) {
        console.log(`api/refurb/create ~> error :`, error);
        return NextResponse.json("échec de la création du refurb", { status: 500 });
    }
}
