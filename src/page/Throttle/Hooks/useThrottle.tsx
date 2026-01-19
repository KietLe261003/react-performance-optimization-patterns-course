import { useEffect, useRef, useState } from "react"

export const useThrottle = (value: any, delay: number=300)=>{
    const lastExecuted = useRef(Date.now());
    const [throttle,setThrottle] = useState(value);

    useEffect(()=>{
        const  handler = setTimeout(()=>{
            const now = Date.now();
            if(now -lastExecuted.current >= delay){
                setThrottle(value);
                lastExecuted.current = now;
            }
        },delay)

        return ()=> clearTimeout(handler);
    },[value,delay])

    return throttle;
}