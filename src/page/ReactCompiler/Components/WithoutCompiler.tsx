/**
 * VÍ DỤ: Code KHÔNG có React Compiler
 *
 * Trong React truyền thống (trước React 19), bạn phải:
 * - Sử dụng React.memo() để tránh re-render component con
 * - Sử dụng useMemo() để cache expensive calculations
 * - Sử dụng useCallback() để ổn định function references
 *
 * Nếu không làm điều này, mỗi lần parent re-render,
 * tất cả children sẽ re-render dù props không đổi.
 */

import { useState, useMemo, useCallback, memo } from "react";

// ❌ CÁCH CŨ: Phải wrap với React.memo để tránh re-render
const ExpensiveListItem = memo(
  ({
    item,
    onSelect,
  }: {
    item: { id: number; name: string; price: number };
    onSelect: (id: number) => void;
  }) => {
    console.log(`[Old Way] Rendering item: ${item.name}`);

    return (
      <div
        onClick={() => onSelect(item.id)}
        className="p-3 m-2 border border-blue-300 rounded cursor-pointer hover:bg-blue-50"
      >
        <span className="font-medium">{item.name}</span>
        <span className="ml-2 text-gray-600">${item.price}</span>
      </div>
    );
  },
);

// ❌ CÁCH CŨ: Component phải dùng useMemo và useCallback
const WithoutCompiler = () => {
  const [count, setCount] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState("");
  console.log("WithoutCompiler rendered");
  // ❌ Phải dùng useMemo để cache danh sách
  const items = useMemo(
    () => [
      { id: 1, name: "iPhone 15", price: 999 },
      { id: 2, name: "MacBook Pro", price: 1999 },
      { id: 3, name: "iPad Pro", price: 799 },
      { id: 4, name: "Apple Watch", price: 399 },
      { id: 5, name: "AirPods Pro", price: 249 },
    ],
    [],);

  // ❌ Phải dùng useMemo cho expensive calculation
  const filteredItems = useMemo(() => {
    console.log("[Old Way] Filtering items...");
    return items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [items, filter]);

  // ❌ Phải dùng useMemo cho expensive calculation
  const totalPrice = useMemo(() => {
    console.log("[Old Way] Calculating total price...");
    return filteredItems.reduce((sum, item) => sum + item.price, 0);
  }, [filteredItems]);

  // ❌ Phải dùng useCallback để ổn định function reference
  const handleSelect = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  return (
    <div className="p-4 border-2 border-orange-400 rounded-lg">
      <h2 className="text-xl font-bold text-orange-600 mb-4">
        ❌ Cách cũ (Không có React Compiler)
      </h2>

      <div className="mb-4 p-3 bg-orange-50 rounded">
        <p className="text-sm text-orange-700">
          Phải sử dụng: <code className="bg-orange-100 px-1">React.memo()</code>
          ,<code className="bg-orange-100 px-1 ml-1">useMemo()</code>,
          <code className="bg-orange-100 px-1 ml-1">useCallback()</code>
        </p>
      </div>

      {/* Counter để trigger re-render */}
      <div className="mb-4">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-600"
        >
          Count: {count} (Click để re-render)
        </button>
      </div>

      {/* Filter input */}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Tìm kiếm sản phẩm..."
        className="w-full p-2 border rounded mb-4"
      />

      {/* Statistics */}
      <div className="mb-4 p-3 bg-gray-100 rounded text-black">
        <p>Tổng sản phẩm: {filteredItems.length}</p>
        <p>Tổng giá trị: ${totalPrice}</p>
        <p>Đã chọn: {selectedId ?? "Chưa chọn"}</p>
      </div>

      {/* Product list */}
      <div>
        {filteredItems.map((item) => (
          <ExpensiveListItem
            key={item.id}
            item={item}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default WithoutCompiler;
