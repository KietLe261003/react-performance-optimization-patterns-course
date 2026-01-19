import { memo, useCallback, useMemo, useState } from "react";

// ✅ memo: Chỉ re-render khi props thay đổi
const UserCard = memo(({ user, onSelect }: { 
  user: { id: number; name: string; score: number }; 
  onSelect: (id: number) => void 
}) => {
  console.log(`✅ OptimizedExample - UserCard "${user.name}" rendered`);
  return (
    <div 
      className="p-3 bg-gray-800 rounded mb-2 cursor-pointer hover:bg-gray-700 transition"
      onClick={() => onSelect(user.id)}
    >
      <p className="font-medium">{user.name}</p>
      <p className="text-sm text-gray-400">Score: {user.score}</p>
    </div>
  );
});

const OptimizedExample = () => {
  const [users] = useState([
    { id: 1, name: "Alice", score: 95 },
    { id: 2, name: "Bob", score: 82 },
    { id: 3, name: "Charlie", score: 78 },
    { id: 4, name: "Diana", score: 91 },
    { id: 5, name: "Eve", score: 88 },
  ]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterText, setFilterText] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // ✅ useMemo: Cache expensive calculations
  const filteredAndSortedUsers = useMemo(() => {
    console.log("✅ OptimizedExample - Computing filtered & sorted users...");
    
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return filtered.sort((a, b) =>
      sortOrder === "asc" ? a.score - b.score : b.score - a.score
    );
  }, [users, filterText, sortOrder]);

  // ✅ useMemo: Cache expensive statistics
  const statistics = useMemo(() => {
    console.log("✅ OptimizedExample - Computing statistics...");
    const total = filteredAndSortedUsers.reduce((acc, user) => acc + user.score, 0);
    const avg = filteredAndSortedUsers.length > 0 
      ? (total / filteredAndSortedUsers.length).toFixed(1) 
      : 0;
    const max = filteredAndSortedUsers.length > 0 
      ? Math.max(...filteredAndSortedUsers.map((u) => u.score)) 
      : 0;
    const min = filteredAndSortedUsers.length > 0 
      ? Math.min(...filteredAndSortedUsers.map((u) => u.score)) 
      : 0;
    
    return { total, avg, max, min, count: filteredAndSortedUsers.length };
  }, [filteredAndSortedUsers]);

  // ✅ useCallback: Stable function reference
  const handleSelect = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  // ✅ useCallback: Stable toggle function
  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  const selectedUser = users.find((u) => u.id === selectedId);

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">🏆 User Leaderboard (Optimized)</h3>
      
      {/* Filter Input */}
      <input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Search by name..."
        className="p-2 bg-gray-800 border border-gray-600 rounded w-full mb-3"
      />

      {/* Sort Button */}
      <button
        onClick={toggleSortOrder}
        className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 mb-3"
      >
        Sort by Score: {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
      </button>

      {/* Statistics - cached with useMemo */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="p-2 bg-blue-900 rounded text-center">
          <p className="text-xs text-gray-400">Count</p>
          <p className="font-bold">{statistics.count}</p>
        </div>
        <div className="p-2 bg-green-900 rounded text-center">
          <p className="text-xs text-gray-400">Average</p>
          <p className="font-bold">{statistics.avg}</p>
        </div>
        <div className="p-2 bg-yellow-900 rounded text-center">
          <p className="text-xs text-gray-400">Max</p>
          <p className="font-bold">{statistics.max}</p>
        </div>
        <div className="p-2 bg-red-900 rounded text-center">
          <p className="text-xs text-gray-400">Min</p>
          <p className="font-bold">{statistics.min}</p>
        </div>
      </div>

      {/* User List - each item wrapped with memo */}
      <div className="max-h-48 overflow-y-auto">
        {filteredAndSortedUsers.map((user) => (
          <UserCard key={user.id} user={user} onSelect={handleSelect} />
        ))}
      </div>

      {/* Selected User */}
      {selectedUser && (
        <div className="mt-3 p-3 bg-cyan-900 rounded">
          <p className="font-medium">Selected: {selectedUser.name}</p>
          <p className="text-sm">Score: {selectedUser.score}</p>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-3">
        👆 Mở console và tương tác - Chỉ component cần thiết mới re-render!
      </p>
    </div>
  );
};

export default OptimizedExample;
