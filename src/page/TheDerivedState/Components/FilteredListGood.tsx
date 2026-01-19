import { useMemo, useState } from "react";

/**
 * ✅ CÁCH ĐÚNG: Sử dụng Derived State
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

const FilteredListGood = () => {
    const [users] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");

    const filteredUsers = useMemo(() => {
        console.log("✅ FilteredListGood: useMemo tính toán...");
        
        let result = users;
        
        if (searchTerm) {
            result = result.filter(user => 
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (roleFilter !== "All") {
            result = result.filter(user => user.role === roleFilter);
        }
        
        return result;
    }, [users, searchTerm, roleFilter]);

    const filteredCount = filteredUsers.length;
    const hasResults = filteredUsers.length > 0;
    
    const averageAge = useMemo(() => {
        if (filteredUsers.length === 0) return 0;
        const totalAge = filteredUsers.reduce((acc, user) => acc + user.age, 0);
        return Math.round(totalAge / filteredUsers.length);
    }, [filteredUsers]);

    const roles = ["All", "Developer", "Designer", "Manager"];

    return (
        <div className="p-4 bg-green-950/30 border border-green-900 rounded-lg">
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
                Tìm thấy: <span className="text-green-400 font-bold">{filteredCount}</span> người dùng
                {hasResults && <span className="text-gray-500"> | Tuổi TB: {averageAge}</span>}
            </p>
            
            <ul className="list-none p-0 max-h-36 overflow-auto">
                {hasResults ? (
                    filteredUsers.map(user => (
                        <li key={user.id} className="py-2 border-b border-gray-800 text-sm text-gray-400">
                            {user.name} - {user.age} tuổi - <span className="text-gray-500">{user.role}</span>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-600 py-2">Không tìm thấy kết quả</li>
                )}
            </ul>
        </div>
    );
};

export default FilteredListGood;
