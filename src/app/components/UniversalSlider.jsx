import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";

import NoItem from "./NoitemElement";

import { useHttp } from "../hooks/useHttp";

import Loader from '../../../public/img/loader.svg';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const UniversalSlider = ({
  endpoint,
  ItemComponent,
  className,
  swiperSettings,
  loaderType = "hero",
  useBullets = false,
}) => {
  const paginationType = useBullets ? "bullets" : "progressbar";
  const [data] = useHttp(endpoint);
  const [prevData, setPrevData] = useState();
  const [isLoading, setIsLoaing] = useState(true);

  let showNavigation;
  let showPagination;

  useEffect(() => {
    if (data) {
      setPrevData(data);

      switch (true) {
        case (window.innerWidth < 768 && data.length >= 2):
          showNavigation = true;
          showPagination = true;
          break;
        case (window.innerWidth < 768 && data.length < 2):
          showNavigation = false;
          showPagination = false;
          break;
        case (window.innerWidth >= 768 && window.innerWidth < 1280 && data.length >= 3):
          showNavigation = true;
          showPagination = true;
          break;
        case (window.innerWidth >= 768 && window.innerWidth < 1280 && data.length < 3):
          showNavigation = false;
          showPagination = false;
          break;
        case (window.innerWidth >= 1280 && data.length > 3):
          showNavigation = true;
          showPagination = true;
          break;
        case (window.innerWidth >= 1280 && data.length < 3):
          showNavigation = false;
          showPagination = false;
          break;
      }

      const timeoutId = setTimeout(() => {
        setIsLoaing(false)
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      }
    }
  }, [data]);

  return (
    <>
      <Swiper
        navigation={showNavigation}
        pagination={
          showPagination
            ? {
              type: paginationType,
            }
            : false
        }
        {...swiperSettings}
        grabCursor={true}
        keyboard={true}
        cssMode={true}
        modules={[Keyboard, Pagination, Navigation, A11y]}
        loop={false}
        className={`swiper ${className}`}
      >
        {
          isLoading
            ? <div className={`${loaderType} loader`}>
              <div className='flex items-center justify-center'>
                <Loader className='animate-spin' />
              </div>
            </div>
            : typeof prevData !== 'undefined' && prevData.length > 0
              ? (prevData.map((item, index) => (
                <SwiperSlide className="flex flex-col items-center" key={`${item.title} ${index}`}>
                  <ItemComponent data={item} />
                </SwiperSlide>
              )))
              : Array.isArray(prevData)
                ? <NoItem type={loaderType} />
                : <div className='flex items-center justify-center'>
                  {prevData}
                </div>
        }
      </Swiper>
    </>
  );
};

export default UniversalSlider;