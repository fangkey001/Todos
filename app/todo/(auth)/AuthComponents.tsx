"use client";

import React, { FormEvent, useState } from "react";
import { CreateToDo } from "@/lib/serviceAPI/createTodo";
import { useSession } from "next-auth/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Avatar,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetToDo } from "@/lib/serviceAPI/getTodo";
import moment from "moment";
import { matchStatus } from "@/utils/matchStatus";
import { VerticalDotsIcon } from "@/public/icons/VerticalDotsIcon";
import { EditIcon } from "@/public/icons/EditIcon";
import { DeleteIcon } from "@/public/icons/DeleteIcon";
import { DeleteToDo } from "@/lib/serviceAPI/deleteTodo";
import Link from "next/link";

export default function AuthComponents() {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await GetToDo(),
    queryKey: ["todo"],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await CreateToDo(title, description);

      if (!response) return;

      queryClient.invalidateQueries({ queryKey: ["todo"] });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await DeleteToDo(id);

      if (!response) return;

      queryClient.invalidateQueries({ queryKey: ["todo"] });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <Card className="card">
        <CardHeader className="w-full flex gap-3">
          <Avatar
            radius="full"
            size="lg"
            src={
              session?.user?.image
                ? session?.user?.image
                : "https://images.unsplash.com/broken"
            }
            className="shrink-0 border border-third"
          />
          <Button
            onClick={() => onOpen()}
            className="w-full p-2 rounded-full bg-third hover:opacity-80 cursor-pointer"
          >
            <span className="text-xs md:text-sm text-gray">{`What's on your mind, ${session?.user?.name}`}</span>
          </Button>
        </CardHeader>
      </Card>

      {data &&
        (data as Todos[]).map((todo) => (
          <Card key={todo.id} className="card">
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar
                  radius="full"
                  size="md"
                  src={
                    session?.user?.image
                      ? session?.user?.image
                      : "https://images.unsplash.com/broken"
                  }
                  className="shrink-0 border border-third"
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-md font-semibold leading-none text-default-600">
                    {todo.title}
                  </h4>
                  <h5 className="text-xs tracking-tight text-default-400">
                    {moment(todo.createdAt).format("DD MMMM YYYY")}
                  </h5>
                </div>
              </div>
              <div className="relative flex justify-end items-center gap-2">
                <Dropdown className="bg-third">
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <VerticalDotsIcon className="text-default-300" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu color="secondary">
                    <DropdownItem
                      key="edit"
                      aria-label="Allows you to edit the todo"
                      aria-labelledby="Allows you to edit the todo"
                      description="Allows you to edit the todo"
                      startContent={
                        <EditIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                      }
                    >
                      <Link href={`todo/edit/${todo.id}`}>Edit</Link>
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      aria-label="Delete this todo"
                      aria-labelledby="Delete this todo"
                      description="Delete this todo"
                      startContent={
                        <DeleteIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                      }
                      onClick={() => handleDelete(todo.id as string)}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              <p>{todo.description}</p>
            </CardBody>
            <CardFooter className="gap-3">
              <Chip size="sm" color={matchStatus(todo.status)}>
                {todo.status}
              </Chip>
            </CardFooter>
          </Card>
        ))}

      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={onClose}
        className="border border-third bg-secondary"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center font-semibold text-white">
                Create Todo
              </ModalHeader>
              <Divider className="bg-third" />
              <ModalBody>
                <div className="flex items-center gap-2">
                  <Avatar
                    radius="full"
                    size="md"
                    as="button"
                    className="shrink-0 border border-third"
                    src={
                      session?.user?.image
                        ? session?.user?.image
                        : "https://images.unsplash.com/broken"
                    }
                  />
                  <span className="text-sm text-white">
                    {session?.user?.name}
                  </span>
                </div>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <input
                    id="title"
                    name="title"
                    placeholder="Enter title todo?"
                    aria-label="input title todo"
                    className="form-input rounded-full font-semibold text-sm"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter description todo?"
                    aria-label="textarea desxription todo"
                    className="form-input rounded-2xl text-sm"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button
                    isDisabled={false}
                    type="submit"
                    color="success"
                    variant="flat"
                    onPress={onClose}
                    className="w-full font-semibold text-white bg-green duration-200"
                  >
                    Create
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
