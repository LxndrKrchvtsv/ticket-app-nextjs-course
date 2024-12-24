"use client"
import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";

const links = [
    {label: 'Dashboard', href: '/', adminOnly: false},
    {label: 'Tickets', href: '/tickets', adminOnly: false},
    {label: 'Users', href: '/users', adminOnly: true},
]

const MainNavLink = ({ role }: { role?: string }) => {
    const path = usePathname()

    return (
        <div className='flex items-center gap-2'>
            {links.filter(link => !link.adminOnly || role === 'ADMIN').map(({label, href}) => (
                <Link
                    key={label}
                    href={href}
                    className={`navbar-link ${path === href
                        && 'cursor-default text-primary/80 hover:text-primary/60'}`}>
                    {label}
                </Link>
            ))}
        </div>
    );
};

export default MainNavLink;