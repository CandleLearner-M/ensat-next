type Props = {
  children: React.ReactNode;
  custom: boolean;
};

function SwapUp({ children, custom = false }: Props) {
  const className = custom ? "group-hover:-translate-y-10 gap-1" : "";
  const margin = !custom ? "!mt-[9px]": ''
  return (
    <div>
      <div className={`group h-[32px] p-2 !mr-4 overflow-hidden !mt-1 ${margin}`}>
        <div
          className={`flex flex-col items-center justify-center gap-2 group-hover:-translate-y-8 transition duration-600 ${className}`}
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}
export default SwapUp;
