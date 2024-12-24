import prisma from "@/prisma/db";
import DataTable from "@/app/tickets/DataTable";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import {Status, Ticket} from "@prisma/client";
import * as sea from "node:sea";

export interface SearchParams {
    status: Status & 'OPEN_AND_STARTED';
    page: string;
    orderBy: keyof Ticket;
}

const Tickets = async ({searchParams}: { searchParams: SearchParams }) => {
    const pageSize = 10;
    const page = parseInt(searchParams.page) || 1;

    const orderBy = searchParams.orderBy || 'createdAt';

    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

    let where = {};
    if (searchParams.status === 'OPEN_AND_STARTED') {
        where = { status: { in: [Status.OPEN, Status.STARTED] } }
    } else if (status) {
        where = {
            status
        }
    } else {
        where = {}
    }

    const ticketCount = await prisma.ticket.count({
        where
    });

    const tickets = await prisma.ticket.findMany({
        where,
        orderBy: {
            [orderBy]: 'desc',
        },
        take: pageSize,
        skip: (page - 1) * pageSize
    });

    return (
        <div>
            <div className='flex justify-between'>
                <Link href='/tickets/new' className={buttonVariants({variant: 'default'})}>New Ticket</Link>
                <StatusFilter/>
            </div>
            <DataTable tickets={tickets} searchParams={searchParams}/>
            <Pagination itemCount={ticketCount} pageSize={pageSize} currentPage={page}/>
        </div>
    );
};

export default Tickets;