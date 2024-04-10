import { cn } from "@/lib/utils";

interface MaxWidthContainerProps {
  children: React.ReactNode;
  classnames?: string;
}
const MaxWidthContainer = ({
  children,
  classnames,
}: MaxWidthContainerProps) => {
  return (
    <section className={cn("px-5 xl:px-16 py-2", classnames)}>
      {children}
    </section>
  );
};

export default MaxWidthContainer;
