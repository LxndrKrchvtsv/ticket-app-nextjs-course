'use client'

import React from 'react';
import {Status, User} from "@prisma/client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts";

interface dataElements {
    name: Status | string;
    total: number
}

interface dataProps {
    data: dataElements[];
    title: string
}

const DashChart = ({data, title}: dataProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className='pl-4'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke='hsl(var(--accent-foreground))' fontSize={14} tickLine={false}
                               axisLine={false}/>
                        <YAxis stroke='hsl(var(--accent-foreground))' fontSize={14} tickLine={false} axisLine={false}
                               allowDecimals={false}
                               padding={{bottom: 8}}/>
                        <Bar dataKey='total' fill='hsl(var(--chart-1))' radius={[8, 8, 8, 8]}/>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default DashChart;