"use client";

import { DeleteIcon } from "@/public/icons/DeleteIcon";
import { EditIcon } from "@/public/icons/EditIcon";
import { VerticalDotsIcon } from "@/public/icons/VerticalDotsIcon";
import { matchStatus } from "@/utils/matchStatus";
import {
  Card,
  CardHeader,
  Avatar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  CardBody,
  CardFooter,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  Divider,
  ModalBody,
} from "@nextui-org/react";
import moment from "moment";
import Link from "next/link";
import { todo } from "node:test";
import React from "react";

export default function GuestComponents() {
  return (
    <div className="flex flex-col items-center gap-8">
      <Card className="card">
        <CardHeader className="w-full flex gap-3">
          <Avatar
            radius="full"
            size="lg"
            src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
            className="shrink-0 border border-third"
          />
          <Button className="w-full p-2 rounded-full bg-third hover:opacity-80 cursor-pointer">
            <span className="text-xs md:text-sm text-gray">{`Login ก่อนเข้าใช้งานระบบ`}</span>
          </Button>
        </CardHeader>
      </Card>

      <Card className="card">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              radius="full"
              size="md"
              src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
              className="shrink-0 border border-third"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-md font-semibold leading-none text-default-600">
                Contribute to the planet
              </h4>
              <h5 className="text-xs tracking-tight text-default-400">
                {moment("2024-05-16").format("YYYY MM DD")}
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
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  aria-label="Delete this todo"
                  aria-labelledby="Delete this todo"
                  description="Delete this todo"
                  startContent={
                    <DeleteIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                  }
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <CardFooter className="gap-3">
          <Chip size="sm" color="success">
            COMPLETE
          </Chip>
        </CardFooter>
      </Card>

      <Card className="card">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              radius="full"
              size="md"
              src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
              className="shrink-0 border border-third"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-md font-semibold leading-none text-default-600">
                Contribute to the planet
              </h4>
              <h5 className="text-xs tracking-tight text-default-400">
                {moment("2024-05-16").format("YYYY MM DD")}
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
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  aria-label="Delete this todo"
                  aria-labelledby="Delete this todo"
                  description="Delete this todo"
                  startContent={
                    <DeleteIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                  }
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <CardFooter className="gap-3">
          <Chip size="sm" color="danger">
            PADDING
          </Chip>
        </CardFooter>
      </Card>

      <Card className="card">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              radius="full"
              size="md"
              src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
              className="shrink-0 border border-third"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-md font-semibold leading-none text-default-600">
                Contribute to the planet
              </h4>
              <h5 className="text-xs tracking-tight text-default-400">
                {moment("2024-05-16").format("YYYY MM DD")}
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
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  aria-label="Delete this todo"
                  aria-labelledby="Delete this todo"
                  description="Delete this todo"
                  startContent={
                    <DeleteIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                  }
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <CardFooter className="gap-3">
          <Chip size="sm" color="warning">
            IN PROGRESS
          </Chip>
        </CardFooter>
      </Card>
    </div>
  );
}
