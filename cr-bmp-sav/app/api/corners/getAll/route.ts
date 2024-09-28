import { NextResponse } from "next/server";
import { Corner } from "@/constants/types";
import prisma from "@/prisma/prisma";

// Fonction pour récupérer la liste des corners
async function getCorners(): Promise<Corner[]> {
  let corners = await prisma.corner.findMany();

  return corners.map(corner => ({
    id: corner.id,
    cornerName: corner.cornerName,
    cornerContact: JSON.parse(corner.cornerContact), // Désérialisation du contact
  }));
}

export const GET = async (request: Request) => {
  console.log("api/corners/getAll ~> Récupération de la liste des corners");
  try {
    // récupération de la liste des corners via prisma
    const cornersList: Corner[] = await getCorners();
    return NextResponse.json(cornersList, { status: 201 });
  } catch (error) {
    console.log("api/corners/getAll ~> error :", error);
    return NextResponse.json("échec de la récupération des corners", { status: 500 });
  }
};
