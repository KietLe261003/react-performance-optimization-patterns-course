import { useMemo, useState } from "react";
import { getUser } from "../../Utils/Utils";
import CartBad from "./Components/Cart";
import CartGood from "./Components/CartGood";
import FilteredListBad from "./Components/FilteredListBad";
import FilteredListGood from "./Components/FilteredListGood";
import FormValidation from "./Components/FormValidation";
import ExplainCode from "../../components/ExplainCode";

/**
 * =============================================================================
 * 🎯 DERIVED STATE - KHÁI NIỆM VÀ VÍ DỤ
 * =============================================================================
 *
 * DERIVED STATE (Trạng thái phái sinh) là gì?
 * - Là những giá trị được TÍNH TOÁN từ state hoặc props có sẵn
 * - KHÔNG CẦN lưu trữ trong useState riêng
 * - Được tính toán lại mỗi khi component render
 *
 * TẠI SAO NÊN DÙNG DERIVED STATE?
 * 1. ✅ Tránh data không đồng bộ (out of sync)
 * 2. ✅ Giảm số lượng state cần quản lý
 * 3. ✅ Code dễ đọc và maintain hơn
 * 4. ✅ Tránh re-render không cần thiết
 *
 * KHI NÀO DÙNG useMemo?
 * - Khi phép tính PHỨC TẠP và TỐN THỜI GIAN
 * - Khi muốn tránh tính toán lại không cần thiết
 * =============================================================================
 */

const DerrivedState = () => {
  const users = getUser();

  // =====================================================================
  // VÍ DỤ 1: DERIVED STATE ĐƠN GIẢN (KHÔNG CẦN useMemo)
  // =====================================================================
  const totalUser = users.length;

  // =====================================================================
  // VÍ DỤ 2: DERIVED STATE VỚI useMemo (phép tính phức tạp)
  // =====================================================================
  const expensiveCalculation = useMemo(() => {
    console.log("🔄 Đang tính toán phức tạp...");
    return users.reduce((acc, user) => acc + user.name.length, 0);
  }, [users]);

  // =====================================================================
  // VÍ DỤ 3: DEMO SO SÁNH CART COMPONENT
  // =====================================================================
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "iPhone 15", price: 999, quantity: 1 },
    { id: 2, name: "MacBook Pro", price: 2499, quantity: 1 },
    { id: 3, name: "AirPods", price: 199, quantity: 2 },
  ]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: `Product ${cartItems.length + 1}`,
      price: Math.floor(Math.random() * 500) + 100,
      quantity: 1,
    };
    setCartItems([...cartItems, newItem]);
  };

  const removeLastItem = () => {
    if (cartItems.length > 0) {
      setCartItems(cartItems.slice(0, -1));
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto p-6 text-base">
      <h1 className="text-3xl font-bold mb-6 text-violet-400">
        🎯 Derived State Examples
      </h1>

      {/* VÍ DỤ 1: Đơn giản */}
      <section className="mb-8 p-5 bg-gray-900 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          📌 Ví dụ 1: Derived State Đơn Giản
        </h2>
        <p className="mb-2">
          <span className="text-gray-400">Total Users:</span>{" "}
          <span className="text-green-400 font-bold">{totalUser}</span>
        </p>
        <p className="mb-4">
          <span className="text-gray-400">Expensive Calculation Result:</span>{" "}
          <span className="text-green-400 font-bold">
            {expensiveCalculation}
          </span>
        </p>
        <ExplainCode code={
            `// ✅ ĐÚNG: Derived State
const totalUser = users.length;

// ✅ useMemo cho phép tính phức tạp
const expensiveCalc = useMemo(() => {
    return users.reduce((acc, user) => acc + user.name.length, 0);
}, [users]);`
        }/>
      </section>

      {/* VÍ DỤ 2: So sánh Cart */}
      <section className="mb-8 p-5 bg-gray-900 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          📌 Ví dụ 2: Cart Component - So sánh cách làm
        </h2>

        <div className="flex flex-wrap gap-5">
          <div className="flex-1 p-4 bg-red-950 border border-red-800 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-red-400">
              ❌ Cách SAI (useState + useEffect)
            </h3>
            <CartBad items={cartItems} />
            <ExplainCode
              code={`// ❌ Anti-pattern
const [total, setTotal] = useState(0);
useEffect(() => {
    const sum = items.reduce(...);
    setTotal(sum);  // Gây re-render thêm!
}, [items]);`}
            />
          </div>

          <div className="flex-1 p-4 bg-green-950 border border-green-800 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-green-400">
              ✅ Cách ĐÚNG (Derived State)
            </h3>
            <CartGood items={cartItems} />
            <ExplainCode
              code={`// ✅ Best practice
const total = useMemo(() => {
    return items.reduce((acc, item) => 
        acc + item.price * item.quantity, 0
    );
}, [items]);`}
            />
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={addItem}
            className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors"
          >
            ➕ Thêm sản phẩm
          </button>
          <button
            onClick={removeLastItem}
            className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            ➖ Xóa sản phẩm cuối
          </button>
        </div>
      </section>

      {/* VÍ DỤ 3: Filtered List */}
      <section className="mb-8 p-5 bg-gray-900 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          📌 Ví dụ 3: Filtered List - Lọc danh sách
        </h2>
        <div className="flex flex-wrap gap-5">
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-3 text-red-400">
              ❌ Cách SAI
            </h3>
            <FilteredListBad />
            <ExplainCode
              code={`
                // ❌ Anti-pattern
                const [filteredItems, setFilteredItems] = useState([]);
                useEffect(() => {
                    const results = items.filter(item => item.name.includes(searchTerm));
                    setFilteredItems(results);
                }, [items, searchTerm]);
            `}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-3 text-green-400">
              ✅ Cách ĐÚNG
            </h3>
            <FilteredListGood />
            <ExplainCode
              code={`// ✅ Best practice
            const filteredItems = useMemo(() => {
                return items.filter(item => item.name.includes(searchTerm));
            }, [items, searchTerm]);
            `}
            />
          </div>
        </div>
      </section>

      {/* VÍ DỤ 4: Form Validation */}
      <section className="mb-8 p-5 bg-gray-900 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          📌 Ví dụ 4: Form Validation
        </h2>
        <FormValidation />
      </section>

      {/* TỔNG KẾT */}
      <section className="p-5 bg-gray-900 border border-violet-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-violet-400">
          📚 Tổng kết - Khi nào dùng gì?
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-700 text-left text-gray-300">
                  Tình huống
                </th>
                <th className="p-3 border border-gray-700 text-left text-gray-300">
                  Giải pháp
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-800/50">
                <td className="p-3 border border-gray-700">
                  Phép tính đơn giản từ state/props
                </td>
                <td className="p-3 border border-gray-700 text-green-400">
                  ✅ Derived State trực tiếp
                </td>
              </tr>
              <tr className="hover:bg-gray-800/50">
                <td className="p-3 border border-gray-700">
                  Phép tính phức tạp, tốn thời gian
                </td>
                <td className="p-3 border border-gray-700 text-green-400">
                  ✅ useMemo
                </td>
              </tr>
              <tr className="hover:bg-gray-800/50">
                <td className="p-3 border border-gray-700">
                  Lọc/sắp xếp danh sách lớn
                </td>
                <td className="p-3 border border-gray-700 text-green-400">
                  ✅ useMemo
                </td>
              </tr>
              <tr className="hover:bg-gray-800/50">
                <td className="p-3 border border-gray-700">
                  Validation từ input
                </td>
                <td className="p-3 border border-gray-700 text-green-400">
                  ✅ Derived State trực tiếp
                </td>
              </tr>
              <tr className="bg-red-950/50 hover:bg-red-950">
                <td className="p-3 border border-gray-700">
                  useState + useEffect để sync
                </td>
                <td className="p-3 border border-gray-700 text-red-400">
                  ❌ TRÁNH - Anti-pattern!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DerrivedState;
