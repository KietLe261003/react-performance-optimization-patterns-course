import { useState } from "react";

// Component con KHÔNG sử dụng memo
const ChildComponent = ({ name }: { name: string }) => {
  console.log("❌ BadMemo - ChildComponent re-rendered!");
  return (
    <div className="p-2 bg-gray-800 rounded mt-2">
      <p>Hello, {name}!</p>
    </div>
  );
};

const BadMemo = () => {
  const [count, setCount] = useState(0);
  const [name] = useState("Copilot");

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">Parent Component</h3>
      <p>Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-red-600 rounded mt-2 hover:bg-red-700"
      >
        Increase Count
      </button>
      <ChildComponent name={name} />
      <p className="text-xs text-gray-400 mt-2">
        👆 Click button và xem console - Child re-render dù props không đổi!
      </p>
    </div>
  );
};

export default BadMemo;
