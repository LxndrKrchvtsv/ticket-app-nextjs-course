'use client'

import {z} from "zod";
import {ticketSchema} from "@/ValidationSchemas/ticket";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Ticket} from "@prisma/client";


type TicketFormData = z.infer<typeof ticketSchema>

interface Props {
    ticket?: Ticket
}

const TicketForm = ({ticket}: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    const form = useForm<TicketFormData>({
        resolver: zodResolver(ticketSchema)
    });

    const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
        try {
            setIsSubmitting(true);
            setError('');

            if (!ticket) {
                await axios.post('/api/tickets', values)
            } else {
                await axios.patch('/api/tickets/' + ticket.id, values)
            }

            setIsSubmitting(false);

            router.push(`/tickets`);
            router.refresh()
        } catch (error) {
            console.error(error);
            setError('Unknown error Occurred.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className='rounded-md border w-full p-4'>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <FormField name="title" control={form.control} defaultValue={ticket?.title} render={({field}) => (
                        <FormItem>
                            <FormLabel>Ticket Title:</FormLabel>
                            <FormControl>
                                <Input placeholder='Ticket title' {...field} />
                            </FormControl>
                        </FormItem>
                    )}/>
                    <Controller name='description' control={form.control} defaultValue={ticket?.description} render={({field}) => (
                        <SimpleMdeReact placeholder='description...' {...field} />
                    )}/>
                    <div className='flex w-full space-x-4'>
                        <FormField name='status' control={form.control} defaultValue={ticket?.status} render={({field}) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Status...'/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='OPEN'>Open</SelectItem>
                                        <SelectItem value='STARTED'>Started</SelectItem>
                                        <SelectItem value='CLOSED'>Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}/>
                        <FormField name='priority' control={form.control} defaultValue={ticket?.priority} render={({field}) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Status...'/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='LOW'>Low</SelectItem>
                                        <SelectItem value='MEDIUM'>Medium</SelectItem>
                                        <SelectItem value='HIGH'>High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}/>
                    </div>
                    <Button type='submit' disabled={isSubmitting}>{ticket ? 'Update' : 'Create'}</Button>
                </form>
            </Form>
        </div>
    );
};

export default TicketForm;