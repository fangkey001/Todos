"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Navbar as NextUINav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  PowerIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/16/solid";

export default function Navbar() {
  const { data: session, status } = useSession();

  const handleAuth = () => {
    if (status === "authenticated") {
      signOut();
    } else {
      signIn("google");
    }
  };

  return (
    <NextUINav maxWidth="sm" className="border-b border-third bg-secondary">
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown
            placement="bottom-end"
            showArrow
            radius="sm"
            classNames={{
              base: "before:bg-default-200",
              content: "p-0 border border-divider border-third bg-secondary",
            }}
          >
            <DropdownTrigger>
              <Avatar
                radius="full"
                size="md"
                as="button"
                className="shrink-0 border border-third"
                src={
                  session?.user?.image
                    ? session?.user?.image
                    : "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              {status === "authenticated" ? (
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold text-white">
                    {session.user?.name || "ไม่พบชื่อ"}
                  </p>
                  <p className="font-semibold text-white">
                    {session.user?.email || "ไม่พบอีเมล์"}
                  </p>
                </DropdownItem>
              ) : (
                <DropdownItem key="profile" className="py-4">
                  <p className="font-semibold text-white">กรุณาเข้าสู่ระบบก่อน</p>
                </DropdownItem>
              )}
              <DropdownItem
                key="logout"
                color={status !== "authenticated" ? "success" : "danger"}
                className="group"
                startContent={
                  status !== "authenticated" ? (
                    <ArrowRightEndOnRectangleIcon className="w-4 h-4 text-default-500 pointer-events-none flex-shrink-0 duration-200 group-hover:text-green" />
                  ) : (
                    <PowerIcon className="w-4 h-4 text-default-500 pointer-events-none flex-shrink-0 duration-200 group-hover:text-red" />
                  )
                }
                onClick={() => handleAuth()}
              >
                <span className={`text-gray ${status !== "authenticated" ? "group-hover:text-success" : "group-hover:text-danger"}`}>{status !== "authenticated" ? "Sign In" : "Sign Out"}</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </NextUINav>
  );
}
