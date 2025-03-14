import Image from "next/image";

import logo from '../../assets/logo.png'

function Logo() {
  return (
    <>
      <Image src={logo} alt="ENSA" title="ENSA Tanger" height={80} priority />
    </>
  );
}
export default Logo;
