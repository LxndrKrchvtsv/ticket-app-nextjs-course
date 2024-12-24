import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/db";
import {userSchema} from "@/ValidationSchemas/user";
import bcrypt from "bcryptjs";

interface Props {
    params: { id: string }
}

export async function PATCH(request: NextRequest, {params}: Props) {
    const body = await request.json();
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400});
    }

    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!user) {
        return NextResponse.json('User not exists', {status: 400});
    }

    if (body?.password && body?.password !== "") {
        body.password = await bcrypt.hash(body.password, 10);
    } else {
        delete body.password;
    }

    if (user?.username !== body?.username) {
        const duplicated = await prisma.user.findUnique({
            where: { username: body.username },
        });

        if (duplicated) {
            return NextResponse.json('Duplicated username', {status: 409});
        }
    }

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { ...body },
    });

    return NextResponse.json(updatedUser, {status: 201});
}