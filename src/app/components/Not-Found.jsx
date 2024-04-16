import React from "react";

import Action from "./Action";

import { useTranslation } from "../i18n/client";

export default function NotFound({ lng }) {
  const { t } = useTranslation(lng, "notFound");
  return (
    <div
      className="mt-[2rem] mx-auto mb-16 max-w-[20rem] font-body text-center
    md:mb-[9.5rem] md:mt-[9.5rem] md:max-w-full
    xl:mb-[8.25rem] xl:mt-[3.75rem]
    2xl:mb-40"
    >
      <h2
        className="text-[6.25rem] font-bold leading-[1.2] tracking-[0.13rem] text-deepBlue
      md:text-[10.63rem] md:tracking-[0.21rem]
      xl:text-[16rem] xl:tracking-[0.32rem] "
      >
        404
      </h2>
      <p
        className="mb-[2rem] text-lg leading-7 text-black 
      md:text-3xl md:mb-[3.75rem]
      xl:text-[2rem] xl:leading-normal"
      >
        {t("text")}
      </p>

      <Action
        href="/"
        rel="noopener noreferrer"
        target="_self"
        reload="true"
        className="inline-block p-4 text-xl text-white duration-300 border-2 rounded cursor-pointer lg:self-center bg-violet border-violet hover:bg-white hover:text-violet"
      >
        {t("button")}
      </Action>
    </div>
  );
}