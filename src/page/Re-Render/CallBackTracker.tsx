import { useCallback, useState } from "react";
import ChilCallBack from "./Components/ChilCallBack";


const CallBackTracker = () => {
    const [count, setCount] = useState(0);
    console.log("CallBackTracker Rendered");
    const handleClick = useCallback(()=>{
        console.log("Button Clicked");
    },[])
    return (
        <div className="flex flex-col gap-5">
            <button className="text-black" onClick={() => setCount(count + 1)}>Increment Count: {count}</button>
            <ChilCallBack onClick={handleClick} />
        </div>
    );
};

export default CallBackTracker;