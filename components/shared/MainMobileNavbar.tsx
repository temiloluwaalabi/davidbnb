"use server";
import { currentUser } from "@/lib/auth";
import MobileNavbar from "./MobileNavbar";

const MainMobileNavbar = async () => {
  const user = await currentUser();
  return <MobileNavbar user={user} />;
};

export default MainMobileNavbar;
