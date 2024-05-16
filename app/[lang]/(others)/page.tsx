import { sendOtp } from "@/actions/sms";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import { Locale } from "@/i18n.config";
import { currentUser } from "@/lib/auth";
import { getDictionary, getTranslations } from "@/lib/dictionaries";
import { useEffect } from "react";

export default async function Home({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
  // const t = await getTranslations(lang);
  const { categories } = await getDictionary(lang);
  const user = await currentUser();
  return (
    <MaxWidthContainer classnames="">
      <h2 className="text-2xl font-bold">
        {categories.beach} - {user?.firstName}
      </h2>
    </MaxWidthContainer>
  );
}
