import React from 'react';
import {Status} from "@prisma/client";
import {Badge} from "@/components/ui/badge";

interface Props {
    status: Status
}

const statusMap: Record<Status, { label: string, color: string }> = {
    OPEN: {label: 'Open', color: 'bg-red-400'},
    STARTED: {label: 'Started', color: 'bg-orange-400'},
    CLOSED: {label: 'Closed', color: 'bg-green-400'},
}

const TicketStatusBadge = ({status}: Props) => {
    return (
        <Badge className={`${statusMap[status].color} hover:${statusMap[status].color}`}>
            {statusMap[status].label}
        </Badge>
    );
};

export default TicketStatusBadge;