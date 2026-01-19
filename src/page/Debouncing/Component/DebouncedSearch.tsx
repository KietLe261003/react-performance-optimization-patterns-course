import { useEffect, useState } from "react";
import { getUser } from "../../../Utils/Utils";
import { useDebounce } from "../Hooks/useDebound";

const DebouncedSearch = () => {
    const [query,setQuery]=useState("");
    const [listUser,setListUser]=useState(getUser());
    const debouncedQuery = useDebounce(query);
    useEffect(()=>{
        console.log("✅ DebouncedSearch: useEffect chạy lại...");
        const filteredUsers = getUser().filter(user => user.name.includes(debouncedQuery));
        setListUser(filteredUsers);
    },[debouncedQuery])
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

export default DebouncedSearch;