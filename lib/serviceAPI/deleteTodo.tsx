"use server";

import { authOptions } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export const DeleteToDo = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized: User not authenticated");
  }

  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!todo || todo.userId !== session.user.id) {
      throw new Error("Todo not found or not authorized to delete");
    }

    const result = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    return result;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw new Error(`Error deleting todo: ${error}`);
  }
};