import ClientOnly from "@/components/shared/ClientOnly";
import MainMobileNavbar from "@/components/shared/MainMobileNavbar";
import MobileNavbar from "@/components/shared/MobileNavbar";
import { currentUser } from "@/lib/auth";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  return (
    <div className="h-screen flex flex-col items-center ">
      <MainMobileNavbar />
      <div className=" w-full h-full flex justify-center items-center">
        <ClientOnly>{children}</ClientOnly>
      </div>
    </div>
  );
};
export default AuthLayout;
