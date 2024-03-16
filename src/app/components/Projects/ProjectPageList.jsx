import React from "react";
import Skeleton from "./Skeleton";
import ProjectItem from "./ProjectItem";

export default function ProjectPageList({ currentItems, isLoading }) {
  const skeletonItems = Array.from({ length: 3 }, (_, index) => (
    <Skeleton key={index} className="bg-zinc-300" />
  ));

  return (
    <ul
      className="mt-0 grid gap-8 min-w-[288px] not-italic leading-normal
    sm:gap-8
    md:min-w-[688px] md:grid-cols-2 md:gap-6
    xl:min-w-[1120px] xl:grid-cols-3 xl:gap-8
    2xl:min-w-[1200px] 2xl:gap-6"
    >
      {isLoading
        ? skeletonItems
        : currentItems.map((data) => (data.is_shown? (
            <ProjectItem
              key={data.id}
              data={data}
              
              className="flex flex-col w-[280px] h-[908px]
                  sm:w-[380px] sm:h-[858px]
                  md:w-[334px] md:h-[983px]
                  xl:w-[360px] xl:min-h-[944px] 
                  2xl:w-[384px] 2xl:min-h-[994px]"
              // className="projects-page-item"
            />) : (<></>)
          ))}
    </ul>
  );
}
