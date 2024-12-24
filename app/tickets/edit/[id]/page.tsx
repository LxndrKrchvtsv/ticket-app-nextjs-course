import dynamic from "next/dynamic";
import {Ticket} from "lucide-react";
import prisma from "@/prisma/db";

const TicketForm = dynamic(() => import("@/components/TicketForm"), {ssr: false});

interface Props {
    params: { id: string };
}

const EditTicket = async ({params}: Props) => {
    const ticket = await prisma.ticket.findUnique({
        where: {
            id: parseInt(params.id),
        }
    });

    if (!ticket) {
        return <h1>The Ticket Does Not Exists.</h1>
    }

    return (
        <TicketForm ticket={ticket} />
    );
};

export default EditTicket;