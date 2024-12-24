import React from 'react';
import {Ticket, User} from "@prisma/client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketPriority from "@/components/TicketPriority";
import {buttonVariants} from "@/components/ui/button";
import ReactMarkdown from 'react-markdown'
import Link from "next/link";
import DeleteButton from "@/app/tickets/[id]/DeleteButton";
import AssignTicket from "@/components/AssignTicket";

interface Props {
    ticket: Ticket
    users?: User[]
}

const TicketDetail = ({ticket, users}: Props) => {
    const {id, title, description, status, priority, createdAt, updatedAt} = ticket

    return (
        <div className='lg:grid lg:grid-cols-4'>
            <Card className='mx-4 mb-4 lg:col-span-3 lg:mr-4'>
                <CardHeader>
                    <div className='flex justify-between mb-3'>
                        <TicketStatusBadge status={status}/>
                        <TicketPriority priority={priority}/>
                    </div>
                    <CardTitle>{title}</CardTitle>
                    Created: {createdAt.toLocaleDateString('ru-RU', {
                    year: '2-digit',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                })}
                </CardHeader>
                <CardContent>
                    <CardDescription className='prose dark:prose-invert'>
                        <ReactMarkdown>
                            {description}
                        </ReactMarkdown>
                    </CardDescription>
                </CardContent>
                <CardFooter>
                    Updated: {updatedAt.toLocaleDateString('ru-RU', {
                    year: '2-digit',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                })}
                </CardFooter>
            </Card>
            <div className='mx-4 flex lg:flex-col lg:mx-0 gap-2'>
                <AssignTicket ticket={ticket} users={users} />
                <Link href={`/tickets/edit/${id}`} className={buttonVariants({variant: 'default'})}>Edit</Link>
                <DeleteButton ticketId={id}/>
            </div>
        </div>
    );
};

export default TicketDetail;