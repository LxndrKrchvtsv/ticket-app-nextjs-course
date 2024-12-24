import React from 'react';
import prisma from "@/prisma/db";
import TicketDetail from "@/app/tickets/[id]/TicketDetail";

interface Props {
    params: { id: string }
}

const ViewTicket = async ({params}: Props) => {
    const ticket = await prisma.ticket.findUnique({where: {id: parseInt(params.id)}});
    const users = await prisma.user.findMany();

    if (!ticket) {
        return <h1 className='text-destructive'>The Ticket Does Not Exists.</h1>
    }

    return (
        <TicketDetail ticket={ticket} users={users} />
    );
};

export default ViewTicket;