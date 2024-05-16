"use server";
import { currentUser } from "@/lib/auth";
import Navbar from "./Navbar";

const MainNavbar = async () => {
  const user = await currentUser();
  return <Navbar user={user} />;
};

export default MainNavbar;
