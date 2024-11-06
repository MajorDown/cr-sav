import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Refurbishment } from "@/constants/types";

/**
 * fonction pour actualiser un reconditionnement
 * @param newRefurb - Refurbishment
 * @returns Promise<Refurbishment>
 */
async function updateRefurb(newRefurb: Refurbishment): Promise<Refurbishment> {
    // création du refurb dans la base de donnée avec prisma
    const refurb = await prisma.refurbishment.update(
        {
            where: { id: newRefurb.id },
            data: {
                corner: newRefurb.corner,
                product: JSON.stringify(newRefurb.product),
                log: JSON.stringify(newRefurb.log),
            },
        }
    );
    console.log(`prisma ~> refurb actualisé : ${refurb.id}`);
    return newRefurb;
}

// Fonction POST pour actualiser le log d'un refurb
export async function PUT(request: Request) {
    const { newRefurb } = await request.json();
    console.log(`api/refurb/update ~> actualisation d'un refurb en cour : ${newRefurb.id}`); 
    try {
        // création du refurb via prisma
        const isRefurbUpdated: Refurbishment = await updateRefurb(newRefurb);
        return NextResponse.json(isRefurbUpdated, { status: 200 });
    } catch (error) {
        console.log(`api/refurb/update ~> error :`, error);
        return NextResponse.json("échec de l'actualisation du refurb", { status: 500 });
    }
}
