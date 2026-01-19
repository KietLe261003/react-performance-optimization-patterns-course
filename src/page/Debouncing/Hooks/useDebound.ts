import { useEffect, useState } from "react"

export const useDebounce = (value: string, delay: number=500)=>{
    const [debouncedValue, setDebouncedValue]=useState("");
    useEffect(()=>{
        const handler = setTimeout(() => {
            // Call the debounced function
            console.log("Debounced value:", value);
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };

    }, [value, delay])
    return debouncedValue;
}