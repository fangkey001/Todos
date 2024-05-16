"use server";

import { authOptions } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export const UpdateTodo = async (todo: Todos) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized: User not authenticated");
  }

  try {
    const existingTodo = await prisma.todo.findUnique({
      where: { id: todo.id },
      select: { userId: true },
    });

    if (!existingTodo || existingTodo.userId !== session.user.id) {
      throw new Error("Todo not found or not authorized to update");
    }

    const result = await prisma.todo.update({
      where: { id: todo.id },
      data: {
        title: todo.title,
        description: todo.description,
        status: todo.status,
        updatedAt: new Date(),
      },
    });

    return result;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw new Error(`Error updating todo: ${error}`);
  }
};
