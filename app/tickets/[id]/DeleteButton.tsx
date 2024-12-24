"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {useState} from "react";
import {useRouter} from "next/navigation";
import axios, {AxiosError} from "axios";
import {buttonVariants} from "@/components/ui/button";


const DeleteButton = ({ticketId}: { ticketId: number }) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    const deleteTicket = async () => {
        try {
            setIsDeleting(true);
            await axios.delete('/api/tickets/' + ticketId);
            setIsDeleting(false);
            router.push("/tickets");
            router.refresh();
        } catch (error: any) {
            setIsDeleting(false)
            setError(error.response?.data?.errors?.[0])
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className={buttonVariants({variant: 'destructive'})}
                                disabled={isDeleting}>Delete</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your Ticket.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className={buttonVariants({variant: 'destructive'})}
                                       disabled={isDeleting}
                                       onClick={deleteTicket}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
};

export default DeleteButton;