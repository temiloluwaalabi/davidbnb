import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import { Locale } from "@/i18n.config";
import { currentUser } from "@/lib/auth";
import { getDictionary } from "@/lib/dictionaries";
import React from "react";

const page = async ({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) => {
  const { categories } = await getDictionary(lang);
  const user = await currentUser();

  return (
    <MaxWidthContainer classnames="">
      <h2 className="text-2xl font-bold">
        {categories.beach} - {user?.name}
      </h2>
    </MaxWidthContainer>
  );
};

export default page;
