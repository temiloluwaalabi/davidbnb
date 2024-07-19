import { ArrowDown, DollarSign, Globe } from "lucide-react";
import MaxWidthContainer from "./MaxWidthContainer";

const Footer = () => {
  return (
    <MaxWidthContainer classnames=" hidden md:flex justify-between items-center py-3 border-t sticky bottom-0 bg-white z-10">
      <div className="flex items-center gap-4 text-sm">
        <h2>© 2024 Airbnb, Inc.</h2>
        <ul className="flex items-center gap-4 flex-wrap">
          <li className="">Terms</li>
          <li className="">Sitemap</li>
          <li className="">Privacy</li>
          <li className="">Your Privacy Choices</li>
        </ul>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span
          className="flex items-center
         gap-2"
        >
          <Globe className="size-4" />
          English (US)
        </span>
        <span
          className="flex items-center
         gap-2"
        >
          <DollarSign className="size-4" /> USD
        </span>
        <span
          className="flex items-center
         gap-2"
        >
          Support & Resources <ArrowDown className="size-4" />
        </span>
      </div>
    </MaxWidthContainer>
  );
};

export default Footer;
