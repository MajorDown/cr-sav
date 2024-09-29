import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Contact, Log, ProductToSAV, SAV } from "@/constants/types";

// Fonction pour récupérer la liste des SAV par corner
async function getSavByCorner(id: string): Promise<SAV[]> {
    // recherche des SAV par corner dans prisma
    let savList = await prisma.sAV.findMany({
        where: {
            corner: id,
        },
    });

    return savList.map((sav) => ({
        id: sav.id,
        corner: sav.corner,
        clientName: sav.clientName,
        clientContact: JSON.parse(sav.clientContact) as Contact, // Désérialisation du contact client
        product: JSON.parse(sav.product) as ProductToSAV, // Désérialisation du produit
        log: JSON.parse(sav.log) as Log[], // Désérialisation des logs
    }));
}

// Fonction GET avec route dynamique
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id as string;
  console.log(`api/sav/getByCorner/${id} ~> Récupération des SAV du corner ${id}`);
  
  try {
    // récupération de la liste des SAV par corner via prisma
    const savList: SAV[] = await getSavByCorner(id);
    return NextResponse.json(savList, { status: 200 }); // 200 pour succès
  } catch (error) {
    console.log(`api/sav/getByCorner/${id} ~> error :`, error);
    return NextResponse.json("échec de la récupération des SAV", { status: 500 });
  }
}
