import React, { useState, useEffect } from "react";
import TenderItem from "./TenderItem";
import Skeleton from "./Skeleton";

export default function TendersList() {
  const [data] = useHttp("tenders/");
  const [isLoading, setIsLoading] = useState(true);

  let skeleton = [...new Array(3)].map((_, i) => (
    <Skeleton key={i} className="bg-zinc-200" />
  ));

  useEffect(() => {
    setIsLoading(true);
    setData(data.slice(0, 3));
    setIsLoading(false);
  }, []);

  return (
    <>
      <ul
        className="min-w-[18rem] grid gap-6 not-italic leading-normal 
       sm:min-w-[388px]
       md:grid-cols-2 md:justify-between md:min-w-[688px] md:gap-5 
       xl:grid xl:min-w-[1120px] xl:grid-cols-3 xl:gap-6
       2xl:min-w-[1200px] 2xl:gap-5"
      >
        {isLoading
          ? skeleton
          : data.map((tender) => (
              <TenderItem
                key={tender.id}
                tender={tender}
                href={`/tenders/${tender.id}`}
              />
            ))}
      </ul>
    </>
  );
}
