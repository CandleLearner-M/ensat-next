"use client";

import { LocalizedHeroComponent } from "@/types/strapi";
import Image from "next/image";

function NavItemHero({ data }: { data: LocalizedHeroComponent }) {
  console.log(data);
  return (
    <section>
      <Image
        src={data.background}
        alt="hero"
        width={1000}
        height={500}
        className="w-full h-auto object-cover"
      />
    </section>
  );
}
export default NavItemHero;
