"use client";

import React, { useState, useEffect } from "react";

import Container from "@/app/components/Container";
import PoliciesTitles from "./PoliciesTitles";
import PoliciesList from "./PoliciesList";
import Pagination from "../Pagination";
import BreadCrumbs from "../BreadCrumbs";

import { useTranslation } from "@/app/i18n/client";

import Loader from '../../../../public/img/loader.svg'

const Policies = ({ data, lng }) => {
    const { t } = useTranslation(lng, "policies-procedures");

    const [procesData, setProcesData] = useState(null);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [marginPagesDisplayed, setMarginPagesDisplayed] = useState(0);

    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const endOffset = itemOffset + itemsPerPage;

    useEffect(() => {
        setItemsPerPage(window.innerWidth < 1280 ? 10 : 9);
        setMarginPagesDisplayed(window.innerWidth < 1280 ? 0 : 1);
    }, [])

    useEffect(() => {
        if (data) {
            setIsLoading(true);
            setProcesData(data);
        }
    }, [data])

    useEffect(() => {
        if (procesData && typeof data.props === 'undefined') {
            setCurrentItems(procesData.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(procesData.length / itemsPerPage));
            setIsLoading(false)
        }
        if (data && typeof data.props !== 'undefined') {
            setIsLoading(false)
        }
    }, [itemOffset, itemsPerPage, procesData]);

    useEffect(() => {
        if (data && typeof data.props === 'undefined') {
            let items;
            if (searchText === 'https://github.com/dav1dashka') {
                items = data;
            } else {
                items = data.filter(el => el.title.toLowerCase().includes(searchText.toLowerCase()) ? true : false);
            }

            setProcesData(items);
        }
    }, [searchText])


    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0 });
        }, 100);
    }, [itemOffset])

    const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <Container className='mt-6 md:mt-[43px] xl:mt-[41px] 2xl:mt-[52px]' >
            <BreadCrumbs
                className='max-w-fit flex items-center gap-2 text-sm xl:text-xl text-deepBlue hover:text-violet mb-10 !mt-0
                sm:mb-[48px] 
                md:text-lg md:mb-[67px] 
                xl:mb-8 2xl:mb-[59px]'
                href='/'
                text={t('home')}
                textColor='#2563EB'
            />
            <PoliciesTitles lng={lng} setSearchText={setSearchText} />
            {isLoading
                ? <div className='flex items-center justify-center 
                        min-h-[160px] md:min-h-[393px] xl:min-h-[270px] 2xl:min-h-[310px]'
                >
                    <Loader className='animate-spin' />
                </div>
                : typeof data.props === 'undefined'
                    ? procesData && procesData.length
                        ? <PoliciesList currentItems={currentItems} />
                        : <div className="mb-6 text-base font-normal 
                                md:text-xl md:mb-8"
                        >
                            {t('not-found')}
                        </div>
                    : <div className='flex items-center justify-center my-10'>
                        {data}
                    </div>
            }
            <div className="flex justify-center md:justify-end">
                <Pagination
                    handlePageClick={handlePageClick}
                    pageCount={pageCount}
                    marginPagesDisplayed={marginPagesDisplayed}
                />
            </div>
        </Container>
    );
}

export default Policies;