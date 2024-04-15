"use client";

import React, { useRef, useState } from "react";

import Action from "../Action";

import { useTranslation } from "@/app/i18n/client";

export const PaymentBody = ({ lng }) => {
  const { t } = useTranslation(lng, "payment");
  const [isCopied, setIsCopied] = useState(false);
  const iban = "UA393355480000026009053637832";
  const ref = useRef(null);

  const copyToClipboard = async (e) => {
    try {
      await navigator.clipboard.writeText(iban);
      e.target.focus();
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <div className="text-sm sm:text-base md:text-lg xl:text-xl">
      <h2
        className="m-auto mb-6 max-w-[223px] font-semibold text-center antialiased
      sm:max-w-[320px] sm:text-xl
      md:max-w-[400px] md:text-2xl md:mb-8
      xl:max-w-[493px] xl:text-3xl"
      >
        {t("title")}
      </h2>
      <ul className="mb-2 flex flex-col gap-1 md:mb-4">
        <li>
          <p> {t("EDRPOU")}</p>
        </li>
        <li>
          <p>{t("IBAN")}</p>
        </li>
        <li>
          <p> {t("BankName")}</p>
        </li>
      </ul>
      <p className="mb-1 font-bold"> {t("PurposeOfPayment")}</p>
      <p className="mb-6"> {t("text")}</p>
      <Action
        onClick={copyToClipboard}
        ref={ref}
        disabled={isCopied}
        className={`mb-6 min-w-[184px] text-lg text-white bg-violet hover:text-violet transition border-2 rounded
           ${isCopied ? "payment" : ""}`}
      >
        {!isCopied ? t("copyIBAN") : t("copied")}
      </Action>
      <p className="font-bold"> {t("gratitude")}</p>
    </div>
  );
};