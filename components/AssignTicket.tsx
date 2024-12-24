"use client";

import {Ticket, User} from "@prisma/client";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './ui/select';
import axios from "axios";
import {useState} from "react";

interface Props {
    ticket: Ticket;
    users?: User[];
}

const AssignTicket = ({ticket, users}: Props) => {
    const [isAssigned, setIsAssigned] = useState(false);
    const [error, setError] = useState('');

    const assignTicket = async (userId: string) => {
        setError('');
        setIsAssigned(true);

        await axios.patch(`/api/tickets/${ticket.id}`, {
            assignedToUserId: userId === '0' ? null : userId,
        }).catch( () => {
            setError('Unable to assign a ticket');
        });

        setIsAssigned(false);
    }

    return (
        <>
            <Select defaultValue={ticket.assignedToUserId?.toString() || '0'}
                    onValueChange={assignTicket}
                    disabled={isAssigned}
            >
                <SelectTrigger>
                    <SelectValue defaultValue={ticket.assignedToUserId?.toString() || '0'}
                                 placeholder='Assign user'
                    ></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='0'>Unassign</SelectItem>
                    {users?.map(({id, name}) => (
                        <SelectItem key={id} value={id.toString()}>
                            {name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <p className='text-destructive'>{error}</p>
        </>
    );
};

export default AssignTicket;