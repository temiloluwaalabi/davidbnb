import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import RegistrationForm from "../forms/authentication/RegisterFormStep";

const RegisterModal = () => {
  return (
    <>
      <Card className=" border-none shadow-none ">
        <CardHeader className="shadow-none border-b border-b-borderB p-0 py-3">
          <CardTitle className="text-base text-ellipsis font-bold text-center">
            Finish signing up
          </CardTitle>
        </CardHeader>
        <CardContent className="relative overflow-y-auto custom-scrollbar px-4 pt-6 ">
          <RegistrationForm />
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterModal;
