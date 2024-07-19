import MainNavbar from "@/components/shared/MainNavbar";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/footer";
import { currentUser } from "@/lib/auth";

const OtherLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainNavbar />

      {children}
      <Footer />
    </>
  );
};
export default OtherLayout;
