"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import getFetchedData from "@/app/helpers/helperAPI";
import Skeleton from "./Skeleton";
import { useHttp } from "@/app/hooks/useHttp";

// import { dataTenders } from "./data";

// async function getTenders() {
//   try {
//     const response = await axios.get(
//       "https://hands-of-friends-backend.onrender.com/api/content_management/tenders/"
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }

export default function TenderList() {
  //TODO
  //Для прикладу як можна використати хук, але тоді треба змінити
  // логіку як ви робите setData(tenderData.slice(0, 3));

  // const [data, setData, isLoading] = useHttp("tenders/");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let skeleton = [...new Array(3)].map((_, i) => (
    <Skeleton id={i + 1} key={i} className="bg-zinc-200" />
  ));

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const tenderPromise = getFetchedData("tenders/", {
        "Accept-Language": "uk",
      });

      const [tenderData] = await Promise.all([tenderPromise]);
      setData(tenderData.slice(0, 3));
      // console.log(tenderData);
    }
    fetchData();
    setIsLoading(false);
  }, []);

  return (
    <>
      <ul className="flex gap-5 not-italic leading-normal">
        {isLoading
          ? skeleton
          : data.map((item) => (
              <li
                key={item.id}
                className="flex flex-col p-9 min-w-[22.5rem] bg-[#E0F2FE]"
              >
                <Link href={`/tenders/${item.id}`}>
                  <div className="flex justify-between font-body text-lg">
                    <span
                      className={`font-bold text-lg ${
                        item.is_active ? "text-green" : "text-lightGray"
                      }`}
                    >
                      {item.is_active ? "Активний" : "Архівний"}
                    </span>
                    <span className="text-black">{item.date}</span>
                  </div>
                  <p className="font-sans mt-6 text-left text-2xl text-black font-medium">
                    {item.title}
                  </p>
                </Link>
              </li>
            ))}
      </ul>
    </>
  );
}
