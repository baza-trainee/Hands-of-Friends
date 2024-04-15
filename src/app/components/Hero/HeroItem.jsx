import React from "react";
import Image from "next/image";

export default function HeroItem({ data }) {
  return (
    <>
      <div className="bg-[#E0F2FE]">
        <Image
          src={data.image}
          alt={`${data.image}`}
          width={1440}
          height={869}
          priority={true}
          className="relative w-[1440px] h-[1024px] xs:h-[240px] sm:h-[288px] md:h-[440px] xl:h-[685px] 2xl:h-[869px] object-cover object-top "
        />
        <p className="hidden cursor-default 
            md:block md:absolute xs:absolute md:left-1/2 md:transform -translate-x-1/2 md:bottom-[84px] xl: bottom-[120px] 2xl:bottom-[144px] 
            font-semibold italic mx-0 xs:text-black xs:text md:text-white text-[24px] md:w-[688px] lg:w-[881px] lg:text-[40px] xl:text-4xl 
            2xl:text-5xl xl:w-[881px] 2xl:w-[1175px] swiper-hero-shadow"
        >
          {data.title}
        </p>
      </div>
      <p className="md:hidden cursor-default sm:text-[24px] font-bold italic xs:text-[18px] xs:max-w-[288px] sm:max-w-[388px] mt-8 h-[115px] sm:h-[140px]">
        {data.title}
      </p>
    </>
  );
}