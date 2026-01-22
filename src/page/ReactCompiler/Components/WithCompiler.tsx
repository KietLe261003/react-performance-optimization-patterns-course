/**
 * VÍ DỤ: Code VỚI React Compiler (React 19)
 *
 * React Compiler tự động tối ưu hóa:
 * - Tự động memoize components (không cần React.memo)
 * - Tự động cache expensive calculations (không cần useMemo)
 * - Tự động ổn định function references (không cần useCallback)
 *
 * ✅ Code sạch hơn, dễ đọc hơn, ít boilerplate hơn!
 */

import { useState } from "react";

// ✅ CÁCH MỚI: Không cần React.memo - Compiler tự động tối ưu
const ExpensiveListItem = ({
  item,
  onSelect,
}: {
  item: { id: number; name: string; price: number };
  onSelect: (id: number) => void;
}) => {
  console.log(`[React Compiler] Rendering item: ${item.name}`);

  return (
    <div
      onClick={() => onSelect(item.id)}
      className="p-3 m-2 border border-green-300 rounded cursor-pointer hover:bg-green-50"
    >
      <span className="font-medium">{item.name}</span>
      <span className="ml-2 text-gray-600">${item.price}</span>
    </div>
  );
};

// ✅ CÁCH MỚI: Code tự nhiên, không cần manual memoization
const WithCompiler = () => {
  const [count, setCount] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState("");

  // ✅ Không cần useMemo - Compiler tự động cache
  const items = [
    { id: 1, name: "iPhone 15", price: 999 },
    { id: 2, name: "MacBook Pro", price: 1999 },
    { id: 3, name: "iPad Pro", price: 799 },
    { id: 4, name: "Apple Watch", price: 399 },
    { id: 5, name: "AirPods Pro", price: 249 },
  ];

  // ✅ Không cần useMemo - Compiler nhận biết và tối ưu
  console.log("[React Compiler] Filtering items...");
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase()),
  );

  // ✅ Không cần useMemo cho calculation
  console.log("[React Compiler] Calculating total price...");
  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);

  // ✅ Không cần useCallback - Compiler tự động ổn định reference
  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  return (
    <div className="p-4 border-2 border-green-400 rounded-lg">
      <h2 className="text-xl font-bold text-green-600 mb-4">
        ✅ React Compiler (React 19)
      </h2>

      <div className="mb-4 p-3 bg-green-50 rounded">
        <p className="text-sm text-green-700">
          Không cần <code className="bg-green-100 px-1">React.memo()</code>,
          <code className="bg-green-100 px-1 ml-1">useMemo()</code>,
          <code className="bg-green-100 px-1 ml-1">useCallback()</code>-
          Compiler tự động tối ưu!
        </p>
      </div>

      {/* Counter để trigger re-render */}
      <div className="mb-4">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 text-black"
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

export default WithCompiler;
