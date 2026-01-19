import { useState } from "react";

const BadUseMemo = () => {
  const [count, setCount] = useState(0);
  const [numbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  // ❌ Tính toán lại MỖI LẦN component re-render
  const expensiveCalculation = () => {
    console.log("❌ BadUseMemo - Expensive calculation running...");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += 1;
    }
    return numbers.reduce((acc, num) => acc + num, 0);
  };

  const sum = expensiveCalculation();

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">Expensive Calculation</h3>
      <p>Sum of numbers: {sum}</p>
      <p>Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-red-600 rounded mt-2 hover:bg-red-700"
      >
        Increase Count
      </button>
      <p className="text-xs text-gray-400 mt-2">
        👆 Click và cảm nhận độ lag - Calculation chạy lại mỗi lần!
      </p>
    </div>
  );
};

export default BadUseMemo;
