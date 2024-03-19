"use client";

import React, { useState, useEffect } from "react";

import Section from "../Section";
import Container from "../Container";
import ProjectPageList from "./ProjectPageList";
import Pagination from "../Pagination";
import ProjectsHeader from "./ProjectsHeader";

import Loader from '../../../../public/img/loader.svg';

export default function ProjectsPagination({ data, isLoading }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ProjectsHeader />
      <Container>
        <Section className="mt-8 sm:mt-10 xl:mt-20">
          {isLoading
            ? <div className='flex items-center justify-center overflow-hidden my-16'>
              <Loader className='animate-spin' />
            </div>
            : <>
              <ProjectPageList
                currentItems={currentItems}
              />
              <Pagination
                handlePageClick={handlePageClick}
                pageCount={pageCount}
              />
            </>
          }
        </Section>
      </Container>
    </>
  );
}