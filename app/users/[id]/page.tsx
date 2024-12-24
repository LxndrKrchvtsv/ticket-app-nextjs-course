import React from 'react';
import prisma from "@/prisma/db";
import UserForm from "@/components/UserForm";
import {getServerSession} from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

interface Props {
    params: { id: string }
}

const EditUser = async ({params}: Props) => {
    const session = await getServerSession(options);

    if (session?.user.role !== 'ADMIN') {
        return <h1 className='text-destructive'>Access required!</h1>
    }

    const user = await prisma.user.findUnique({
        where: {id: parseInt(params.id)}
    });

    if (!user) {
        return <h1 className='text-destructive'>The User Does Not Exists.</h1>
    }

    user.password = "";

    return (
        <UserForm user={user }/>
    );
};

export default EditUser;