import { memo, useCallback, useState } from "react";

// Component con với memo
const ButtonChild = memo(({ onClick, label }: { onClick: () => void; label: string }) => {
  console.log(`✅ GoodUseCallback - ButtonChild "${label}" re-rendered!`);
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 mr-2 text-black"
    >
      {label}
    </button>
  );
});

const GoodUseCallback = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // ✅ Function được cache, chỉ tạo mới khi dependencies thay đổi
  // -> memo của ButtonChild hoạt động đúng
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">useCallback Demo</h3>
      <p>Count: {count}</p>
      <div className="flex gap-2 mt-2">
        <ButtonChild onClick={handleClick} label="Increase" />
        <ButtonChild onClick={handleReset} label="Reset" />
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        className="mt-3 p-2 bg-gray-800 border border-gray-600 rounded w-full"
      />
      <p className="text-xs text-gray-400 mt-2">
        👆 Gõ text và xem console - Buttons KHÔNG re-render!
      </p>
    </div>
  );
};

export default GoodUseCallback;
