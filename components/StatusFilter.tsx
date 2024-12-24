"use client"

import React from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const statuses: { label: string; value?: string }[] = [
    {label: 'All'},
    {label: 'Open / Started', value: 'OPEN_AND_STARTED'},
    {label: 'Open', value: 'OPEN'},
    {label: 'Started', value: 'STARTED'},
    {label: 'Closed', value: 'CLOSED'},
]

const StatusFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <div className="w-1/6">
            <Select defaultValue={searchParams.get('status') || ''}
                    onValueChange={(status: string) => {
                        const params = new URLSearchParams();

                        if (status) {
                            params.append('status', status);
                        }

                        if (status === '0') {
                            params.delete('status')
                        }

                        const query = params.size ? `?${params.toString()}` : '';
                        router.push('/tickets' + query);
                    }}
            >
                <SelectTrigger>
                    <SelectValue placeholder='Filter by Status'/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {statuses.map(({label, value}) => (
                            <SelectItem value={value || '0'} key={value || '0'}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default StatusFilter;