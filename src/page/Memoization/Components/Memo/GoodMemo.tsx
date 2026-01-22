import { memo, useState } from "react";

// Component con SỬ DỤNG memo
const ChildComponent = memo(({ name }: { name: string }) => {
  console.log("✅ GoodMemo - ChildComponent re-rendered!");
  return (
    <div className="p-2 bg-gray-800 rounded mt-2">
      <p>Hello, {name}!</p>
    </div>
  );
});

const GoodMemo = () => {
  const [count, setCount] = useState(0);
  const [name] = useState("Copilot");

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">Parent Component</h3>
      <p>Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-green-600 rounded mt-2 hover:bg-green-700 text-black"
      >
        Increase Count
      </button>
      <ChildComponent name={name} />
      <p className="text-xs text-gray-400 mt-2">
        👆 Click button và xem console - Child KHÔNG re-render!
      </p>
    </div>
  );
};

export default GoodMemo;
