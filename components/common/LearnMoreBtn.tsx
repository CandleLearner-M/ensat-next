import { Link } from "@/i18n/navigation";
import { useScreenSize } from "@/utils/useScreenSize";
import { ReactNode } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

function LearnMoreBtn({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const { isMobile } = useScreenSize();

  return (
    <Link
      href={href}
      className="group flex items-center gap-2 md:gap-3 hover:text-[#007EFF] transition duration-300 ease-in-out text-sm md:text-base"
    >
      <button
        className={`flex items-center justify-center bg-[#656f77] ${
          isMobile ? "w-7 h-7" : "w-8    h-8"
        } rounded-full group-hover:bg-[#007EFF] transition duration-300 ease-in-out cursor-pointer`}
      >
        <FaLongArrowAltRight size={isMobile ? 14 : 18} className="text-white" />
      </button>
      <span className="font-small">{children}</span>
    </Link>
  );
}

export default LearnMoreBtn;
