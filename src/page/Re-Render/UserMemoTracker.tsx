import { useState } from "react";
import { getUser } from "../../Utils/Utils";
import User from "./Components/User";

const UserMemoTracker = () => {
    const [count,setCount]=useState(0);
    const [user]=useState(getUser()); // Dữ liệu trả về 10000 dòng
    return (
        <div>
            <p>{count}</p>
            <button className="text-black" onClick={()=>setCount(count+1)}>Increment</button>
            <User listUser={user} />
        </div>
    );
};

export default UserMemoTracker;