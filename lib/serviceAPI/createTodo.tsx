"use server";

import { authOptions } from "@/auth";
import { PrismaClient, TodoStatus } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export const CreateToDo = async (title: string, description: string) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized: User not authenticated");
  }

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        status: "PENDING" as TodoStatus,
        userId: session.user.id,
      },
    });

    if (!newTodo) {
      throw new Error("Failed to create new todo");
    }

    return newTodo;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error(`Error creating todo: ${error}`);
  }
};
