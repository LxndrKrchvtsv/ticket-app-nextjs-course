'use client'

import {z} from "zod";
import {userSchema} from "@/ValidationSchemas/user";
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
import {User} from "@prisma/client";


type UserFormData = z.infer<typeof userSchema>

interface Props {
    user?: User
}

const UserForm = ({user}: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    const form = useForm<UserFormData>({
        resolver: zodResolver(userSchema)
    });

    const onSubmit = async (values: z.infer<typeof userSchema>) => {
        try {
            setIsSubmitting(true);
            setError('');

            if (!user) {
                await axios.post('/api/users', values)
            } else {
                await axios.patch('/api/users/' + user.id, values)
            }

            setIsSubmitting(false);

            router.push(`/users`);
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
                    <FormField name="name" control={form.control} defaultValue={user?.name} render={({field}) => (
                        <FormItem>
                            <FormLabel>Full Name:</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter a Full Name' {...field} />
                            </FormControl>
                        </FormItem>
                    )}/>
                    <FormField name="username" control={form.control} defaultValue={user?.username} render={({field}) => (
                        <FormItem>
                            <FormLabel>Username:</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter a Username' {...field} />
                            </FormControl>
                        </FormItem>
                    )}/>
                    <FormField name="password" control={form.control} defaultValue={user?.password} render={({field}) => (
                        <FormItem>
                            <FormLabel>Password:</FormLabel>
                            <FormControl>
                                <Input type='password' required={!user} placeholder='Enter a Password' {...field} />
                            </FormControl>
                        </FormItem>
                    )}/>
                    <div className='flex w-full space-x-4'>
                        <FormField name='role' control={form.control} defaultValue={user?.role} render={({field}) => (
                            <FormItem>
                                <FormLabel>Role:</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select Role'/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='USER'>User</SelectItem>
                                        <SelectItem value='TECH'>Tech</SelectItem>
                                        <SelectItem value='ADMIN'>Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}/>
                    </div>
                    <Button type='submit' disabled={isSubmitting}>{user ? 'Update' : 'Create'}</Button>
                </form>
            </Form>
            <p className='text-destructive'>{error}</p>
        </div>
    );
};

export default UserForm;