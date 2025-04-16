import Image from "next/image";
import logo from "@/assets/ensat.jpeg";

function Test() {
  return (
    <div
      style={{ height: "100vh", backgroundColor: "white" }}
      className="flex items-center justify-center"
    >
        <Image src={logo} width={500} quality={100}/>
    </div>
  );
}
export default Test;
