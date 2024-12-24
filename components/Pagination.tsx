"use client"

import {ChevronFirst, ChevronLast, ChevronLeft, ChevronRight} from 'lucide-react';
import {useRouter, ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({itemCount, pageSize, currentPage}: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount / pageSize);

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push('?' + params.toString());
    }

    if (pageCount <= 1) {
        return null
    }

    return (
        <div className='mt-4 flex flex-col gap-2'>
            <div>
                <Button variant='outline'
                        disabled={currentPage === 1}
                        onClick={() => changePage(1)}>
                    <ChevronFirst/>
                </Button>
                <Button variant='outline'
                        disabled={currentPage === 1}
                        onClick={() => changePage(currentPage - 1)}>
                    <ChevronLeft/>
                </Button>
                <Button variant='outline'
                        disabled={currentPage === pageCount}
                        onClick={() => changePage(currentPage + 1)}>
                    <ChevronRight/>
                </Button>
                <Button variant='outline'
                        disabled={currentPage === pageCount}
                        onClick={() => changePage(pageCount)}>
                    <ChevronLast/>
                </Button>
            </div>
            Page: {currentPage} of {pageCount}
        </div>
    );
};

export default Pagination;