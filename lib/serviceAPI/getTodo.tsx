"use server";

import { authOptions } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export const GetToDo = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized: User not authenticated");
  }

  try {
    const result = await prisma.todo.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        status: true,
      },
    });

    return result;
  } catch (error) {
    console.error("Error getting todos:", error);
    throw new Error(`Error getting todos: ${error}`);
  }
};
