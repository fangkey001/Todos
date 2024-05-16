"use server";

import { authOptions } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export const GetToDoById = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized: User not authenticated");
  }

  try {
    const result = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!result || result.userId !== session.user.id) {
      throw new Error("Todo not found or not authorized to view");
    }

    const { userId, ...todoWithoutUserId } = result;

    return todoWithoutUserId as Todos;
  } catch (error) {
    console.error("Error getting todo:", error);
    throw new Error(`Error getting todo: ${error}`);
  }
};