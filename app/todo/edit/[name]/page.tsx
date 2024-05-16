"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GetToDoById } from "@/lib/serviceAPI/getToDoId";
import { UpdateTodo } from "@/lib/serviceAPI/editTodo";
import {
  Card,
  CardHeader,
  Avatar,
  Button,
  CardBody,
  Divider,
  Radio,
  RadioGroup,
} from "@nextui-org/react";

export default function EditTodo() {
  const router = useRouter();
  const pathname = usePathname();
  const splitPath = pathname.split("/");
  const id = splitPath[splitPath.length - 1];

  const [todo, setTodo] = useState<Todos | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await GetToDoById(id),
    queryKey: ["todo_edit"],
  });

  useEffect(() => {
    if (data) {
      setTodo(data);
    }
  }, [data]);

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setTodo(prevState => {
      if (prevState === null) {
        return prevState;
      }
  
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      if (!todo) return;
      
      const response = await UpdateTodo(todo);

      if (!response) return;

      router.push("/todo");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Card className="card">
        <CardHeader className="flex justify-center text-white">
          Edit {data?.title}
        </CardHeader>
        <Divider className="bg-third" />
        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              id="title"
              name="title"
              placeholder="Enter title todo?"
              aria-label="input title todo"
              value={todo?.title}
              onChange={(e) => handleChangeForm(e)}
              className="form-input rounded-full font-semibold text-sm"
            />
            <textarea
              id="description"
              name="description"
              placeholder="Enter description todo?"
              aria-label="textarea desxription todo"
              value={todo?.description}
              onChange={(e) => handleChangeForm(e)}
              className="form-input rounded-2xl text-sm"
            />
            <RadioGroup
              name="status"
              orientation="horizontal"
              onChange={(e) => handleChangeForm(e)}
              value={todo?.status}
            >
              <Radio value="PENDING" color="danger">
                <span className="text-sm text-white">PENDING</span>
              </Radio>
              <Radio value="IN_PROGRESS" color="warning">
                <span className="text-sm text-white">IN PROGRESS</span>
              </Radio>
              <Radio value="COMPLETED" color="success">
                <span className="text-sm text-white">COMPLETED</span>
              </Radio>
            </RadioGroup>
            <Button
              isDisabled={false}
              type="submit"
              color="success"
              variant="flat"
              className="w-full font-semibold text-white bg-green duration-200"
            >
              Create
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
