import { useEffect, useState } from "react";

/**
 * ❌ CÁCH SAI: Sử dụng useState + useEffect để filter
 */

interface User {
    id: number;
    name: string;
    age: number;
    role: string;
}

const initialUsers: User[] = [
    { id: 1, name: "Alice", age: 28, role: "Developer" },
    { id: 2, name: "Bob", age: 35, role: "Designer" },
    { id: 3, name: "Charlie", age: 22, role: "Developer" },
    { id: 4, name: "Diana", age: 31, role: "Manager" },
    { id: 5, name: "Eve", age: 26, role: "Developer" },
    { id: 6, name: "Frank", age: 40, role: "Designer" },
];

const FilteredListBad = () => {
    const [users] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    const [filteredCount, setFilteredCount] = useState<number>(users.length);

    useEffect(() => {
        console.log("❌ FilteredListBad: useEffect chạy lại...");
        
        let result = users;
        
        if (searchTerm) {
            result = result.filter(user => 
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (roleFilter !== "All") {
            result = result.filter(user => user.role === roleFilter);
        }
        
        setFilteredUsers(result);
        setFilteredCount(result.length);
    }, [users, searchTerm, roleFilter]);

    const roles = ["All", "Developer", "Designer", "Manager"];

    return (
        <div className="p-4 bg-red-950/30 border border-red-900 rounded-lg">
            <div className="mb-4 flex flex-wrap gap-2">
                <input
                    type="text"
                    placeholder="Tìm kiếm tên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500"
                />
                
                <select 
                    value={roleFilter} 
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500"
                >
                    {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>
            
            <p className="text-sm text-gray-400 mb-2">
                Tìm thấy: <span className="text-red-400 font-bold">{filteredCount}</span> người dùng
            </p>
            
            <ul className="list-none p-0 max-h-36 overflow-auto">
                {filteredUsers.map(user => (
                    <li key={user.id} className="py-2 border-b border-gray-800 text-sm text-gray-400">
                        {user.name} - {user.age} tuổi - <span className="text-gray-500">{user.role}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilteredListBad;
