import { useMemo, useState } from "react";

const GoodUseMemo = () => {
  const [count, setCount] = useState(0);
  const [numbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  // ✅ Chỉ tính toán lại khi `numbers` thay đổi
  const sum = useMemo(() => {
    console.log("✅ GoodUseMemo - Expensive calculation running...");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += 1;
    }
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">Expensive Calculation</h3>
      <p>Sum of numbers: {sum}</p>
      <p>Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-green-600 rounded mt-2 hover:bg-green-700 text-black"
      >
        Increase Count
      </button>
      <p className="text-xs text-gray-400 mt-2">
        👆 Click mượt mà - Calculation KHÔNG chạy lại!
      </p>
    </div>
  );
};

export default GoodUseMemo;
