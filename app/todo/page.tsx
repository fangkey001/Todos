import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import GuestComponents from "./(guest)/GuestComponents";
import AuthComponents from "./(auth)/AuthComponents";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) return <AuthComponents />;

  return <GuestComponents />;
}
