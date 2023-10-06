import React from "react";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { NavbarComponent } from "../ui/navbar";

const Navbars = async () => {
  const session = await getAuthSession();

  return <NavbarComponent session={session} />;
};

export default Navbars;
