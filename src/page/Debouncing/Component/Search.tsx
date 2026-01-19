import { useEffect, useState } from "react";
import { getUser } from "../../../Utils/Utils";

const Search = () => {
    const [query,setQuery]=useState("");
    const [listUser,setListUser]=useState(getUser());
    useEffect(()=>{
        console.log("❌ Search: useEffect chạy lại...");
        const filteredUsers = getUser().filter(user => user.name.includes(query));
        setListUser(filteredUsers);
    },[query])
    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            {
                listUser.filter(user => user.name.includes(query)).map(user => (
                    <div key={user.id}>{user.name}</div>
                ))
            }
        </div>
    );
};

export default Search;