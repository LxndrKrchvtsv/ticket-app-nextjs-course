import React from 'react';
import {User} from "@prisma/client";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Link from 'next/link';

interface Props {
    users: User[];
}

const DataTableSimple = ({users}: Props) => {
    return (
        <div className="w-full mt-5">
            <div className='rounded-md sm:border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-medium'>Name</TableHead>
                            <TableHead className='font-medium'>Username</TableHead>
                            <TableHead className='font-medium'>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users && users.map(({id, name, username, role}: User) => (
                            <TableRow key={id} data-href='/'>
                                <TableCell>
                                    <Link href={`/users/${id}`}>{name}</Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/users/${id}`}>{username}</Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/users/${id}`}>{role}</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DataTableSimple;