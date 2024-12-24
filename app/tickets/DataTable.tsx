import React from 'react';
import {Ticket} from "@prisma/client";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketPriority from "@/components/TicketPriority";
import Link from 'next/link';
import {SearchParams} from "@/app/tickets/page";
import {ArrowDown} from "lucide-react";

interface Props {
    tickets: Ticket[];
    searchParams: SearchParams;
}

const DataTable = ({tickets, searchParams}: Props) => {
    return (
        <div className='w-full mt-5'>
            <div className='rounded-md sm:border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Link href={{query: {...searchParams, orderBy: 'title'}}}>
                                    Title
                                </Link>
                                {'title' === searchParams.orderBy && <ArrowDown className='inline p-1'/>}
                            </TableHead>
                            <TableHead>
                                <div className="flex justify-center">
                                    <Link href={{query: {...searchParams, orderBy: 'status'}}}>
                                        Status
                                    </Link>
                                    {'status' === searchParams.orderBy && <ArrowDown className='inline p-1'/>}
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex justify-center">
                                    <Link href={{query: {...searchParams, orderBy: 'priority'}}}>
                                        Priority
                                    </Link>
                                    {'priority' === searchParams.orderBy && <ArrowDown className='inline p-1'/>}
                                </div>
                            </TableHead>
                            <TableHead>
                                <Link href={{query: {...searchParams, orderBy: 'createdAt'}}}>
                                    Created At
                                </Link>
                                {'createdAt' === searchParams.orderBy && <ArrowDown className='inline p-1'/>}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets && tickets.map(({id, title, status, priority, createdAt}) => (
                            <TableRow key={id}>
                                <TableCell>
                                    <Link href={`/tickets/${id}`}>{title}</Link>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center">
                                        <TicketStatusBadge status={status}/>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center">
                                        <TicketPriority priority={priority}/>
                                    </div>
                                </TableCell>
                                <TableCell>{createdAt.toLocaleDateString('ru-RU', {
                                    year: '2-digit',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                })}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DataTable;