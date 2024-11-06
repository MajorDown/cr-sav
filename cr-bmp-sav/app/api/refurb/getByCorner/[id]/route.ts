import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Log, ProductToRefurb, Refurbishment } from "@/constants/types";

// Fonction pour récupérer la liste des SAV par corner
async function getRefurbByCorner(id: string): Promise<Refurbishment[]> {
    // recherche des SAV par corner dans prisma
    const refurbList = await prisma.refurbishment.findMany({
        where: {
            corner: id,
        },
    });

    return refurbList.map((refurb) => ({
        id: refurb.id,
        corner: refurb.corner,
        product: JSON.parse(refurb.product) as ProductToRefurb, // Désérialisation du produit
        log: JSON.parse(refurb.log) as Log[], // Désérialisation des logs
    }));
}

// Fonction GET avec route dynamique
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id as string;
  console.log(`api/refurb/getByCorner/${id} ~> Récupération des reconditionnements du corner ${id}`);
  
  try {
    // récupération de la liste des SAV par corner via prisma
    const refurbList: Refurbishment[] = await getRefurbByCorner(id);
    return NextResponse.json(refurbList, { status: 200 }); // 200 pour succès
  } catch (error) {
    console.log(`api/refurb/getByCorner/${id} ~> error :`, error);
    return NextResponse.json("échec de la récupération des reconditionnement", { status: 500 });
  }
}