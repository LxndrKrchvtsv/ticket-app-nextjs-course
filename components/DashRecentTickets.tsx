import React from 'react';
import {Prisma} from "@prisma/client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import Link from 'next/link';
import TicketPriority from './TicketPriority';

type TicketWithUser = Prisma.TicketGetPayload<{
    include: { assignedToUser: true },
}>

interface Props {
    tickets: TicketWithUser[];
}

const DashRecentTickets = ({tickets}: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recently Updated</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='space-y-8'>
                    {tickets && tickets.map(({id, assignedToUser, status, priority, title}: TicketWithUser) => (
                        <div key={id} className='flex items-center'>
                            <TicketStatusBadge status={status}/>
                            <div className='ml-4 space-y-1'>
                                <Link href={`tickets/${id}`}>
                                    <p>{title}</p>
                                    <p>{assignedToUser?.name || 'Unassigned ticket'}</p>
                                </Link>
                            </div>
                            <div className='ml-auto'>
                                <TicketPriority priority={priority}/>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default DashRecentTickets;