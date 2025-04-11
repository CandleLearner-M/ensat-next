import { Link } from "@/i18n/navigation";
import { ReactNode } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

function LearnMoreBtn({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className=" group flex items-center gap-3 hover:text-[#007EFF] transition duration-300 ease-in-out "
    >
      <button className="flex items-center justify-center bg-[#656f77] w-10 h-10 rounded-full group-hover:bg-[#007EFF] transition duration-300 ease-in-out cursor-pointer">
        <FaLongArrowAltRight size={23} className="text-white" />
      </button>
      {children}
    </Link>
  );
}
export default LearnMoreBtn;
