import React from "react";
import Skeleton from "./Skeleton";
import TenderItem from "./TenderItem";

export default function TenderList({ currentItems, activeTab, isLoading }) {
  let skeletonItems = [...new Array(6)].map((_, i) => (
    <Skeleton key={i} className="bg-zinc-200" />
  ));


  return (
    <ul className="grid gap-8 min-w-[288px] not-italic leading-normal
    sm:min-w-[388px] sm:gap-8
    md:min-w-[688px] md:grid-cols-2 md:gap-6
    xl:min-w-[1120px] xl:grid-cols-3 xl:gap-8
    2xl:min-w-[1200px]">
      {isLoading
        ? skeletonItems
        : currentItems.map(
            (data) =>
              (activeTab === "all" ||
                (activeTab === "active" && tender.is_active)) && (
                <TenderItem
                  key={data.id}
                  data={data}
                  
                />
              )
          )}
    </ul>
  );
}
