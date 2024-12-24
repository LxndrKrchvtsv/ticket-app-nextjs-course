"use client"

import {useState, useEffect} from 'react';
import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react";
import {Button} from "@/components/ui/button";


const ToggleMode = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    const dark = theme === 'dark';

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return <Button variant='outline' size='icon' disabled />;
    }


    return (
        <Button
            className='hover:text-primary'
            variant='outline'
            size='icon'
            onClick={() => setTheme(`${dark ? 'light' : 'dark'}`)}>
            {
                dark ? (<Sun />)
                    : (<Moon />)
            }
        </Button>
    );
};

export default ToggleMode;