import React from 'react';
import UserForm from "@/components/UserForm";
import DataTableSimple from "@/app/users/data-table-simple";
import prisma from "@/prisma/db";
import {getServerSession} from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

const Users = async () => {
    // const session = await getServerSession(options);
    //
    // if (session?.user.role !== 'ADMIN') {
    //     return <h1 className='text-destructive'>Access required!</h1>
    // }

    const users = await prisma.user.findMany();

    return (
        <div>
            <UserForm />
            {users && <DataTableSimple users={users}/>}
        </div>
    );
};

export default Users;