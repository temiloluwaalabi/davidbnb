import ListingCard from "@/components/cards/listing-card";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import { Locale } from "@/i18n.config";
import { currentUser } from "@/lib/auth";
import { getDictionary } from "@/lib/dictionaries";
import React from "react";
type Params = Promise<{ lang: Locale }>;

const page = async (props: { params: Params }) => {
  const params = await props.params;
  const { categories } = await getDictionary(params.lang);
  const user = await currentUser();

  return (
    <MaxWidthContainer classnames="py-4">
      <section className="grid ms:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <div key={index} className="w-full">
            <ListingCard />
          </div>
        ))}
      </section>
      <section className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Past experiences</h3>
        <div className="grid ms:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <div key={index} className="w-full">
              <ListingCard sharebtn />
            </div>
          ))}
        </div>
      </section>
      {/* <h2 className="text-2xl font-bold">
        {categories.beach} - {user?.name}
      </h2> */}
    </MaxWidthContainer>
  );
};

export default page;
