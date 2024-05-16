import MainNavbar from "@/components/shared/MainNavbar";
import Navbar from "@/components/shared/Navbar";
import { currentUser } from "@/lib/auth";

const OtherLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainNavbar />

      {children}
    </>
  );
};
export default OtherLayout;
