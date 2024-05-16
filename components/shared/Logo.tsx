"use client";
// import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const Logo = () => {
  const params = useParams();
  // console.log(params);
  // const user = useCurrentUser();
  const router = useRouter();
  return (
    <>
      <Image
        alt="logo"
        className="hidden md:flex cursor-pointer"
        onClick={() => router.push(`/${params.lang}`)}
        height={100}
        width={100}
        src="/images/logo.png"
      />
      {/* <p>{user?.email}</p> */}
    </>
  );
};

export default Logo;
