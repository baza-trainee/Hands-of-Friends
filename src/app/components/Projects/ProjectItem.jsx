import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { OLCLASS, ULCLASS } from "@/app/helpers/consts";
import { useTranslation } from "@/app/i18n/client";
import { useCurrentLang } from "@/app/hooks/useCurrentLang";

export default function ProjectItem({ data, lng }) {
  const { t } = useTranslation(lng, "project-section");
  const [formattedDescription, setFormattedDescription] = useState();
  const router = useRouter();

  const lang = useCurrentLang() === 'uk' ? 'ua' : 'en';
  const pathname = usePathname();
  const pathParts = pathname.split('/');

  const modPath = pathParts.length > 2
    ? pathParts[pathParts.length - 1]
    : `${lang}/projects`;

  useEffect(() => {
    if (data) {
      const desc = data.description
        .replace(/<ul/g, `<ul class="${ULCLASS}"`)
        .replace(/<ol/g, `<ol class="${OLCLASS}"`);
      setFormattedDescription(desc);
    }
  }, [data]);

  return (

    <li key={data.id}>

      <Image
        src={data.image}
        alt="Photo of the project"
        width={288}
        height={400}
        className="min-w-[288px] h-[320px] object-cover
        sm:min-w-[388px] sm:h-[430px]
        md:min-w-full md:h-[371px]
        xl:min-w-full xl:h-[426px]
        2xl:min-w-full 2xl:h-[426px]"
      />
      <h3
        className="mb-1 mt-6 text-xl font-['Open_Sans'] font-bold line-clamp-2 h-[60px] w-[288px]
        sm:w-full sm:line-clamp-2
        md:mt-8"
      >
        {data.title}
      </h3>
      <span className="text-base font-body md:text-lg">
        {data.start_date} - {data.end_date ? data.end_date : t("act")}

      </span>

      <p
        className="mt-4 w-[288px] h-[396px] text-base leading-6 text-left text-black font-body 
            sm:w-full sm:h-[316px]
            md:w-full md:h-[468px] md:text-lg
            xl:w-full xl:h-[468px]
            2xl:w-full 2xl:h-[408px]"
        dangerouslySetInnerHTML={{
          __html: formattedDescription,
        }}
      ></p>
      <button
        onClick={() => router.push(`${modPath}/${data.id}`)}
        type="button"
        className="block w-[198px] min-h-[60px] mx-auto rounded-md underline underline-offset-4 px-0 mt-4 font-normal bg-transparent text-black text-xl border border-transparent hover:border hover:border-deepBlue hover:bg-lightBlue md:mt-8 md:text-2xl md:min-h-[64px] xl:mt-4 2xl:mt-8 2xl:text-xl 2xl:min-h-[60px]"
      >
        {t("btn")}
      </button>

    </li>
  );
}
