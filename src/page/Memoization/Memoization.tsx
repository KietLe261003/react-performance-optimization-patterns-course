import CompareComponents from "../../components/CompareComponents";
import BadMemo from "./Components/Memo/BadMemo";
import GoodMemo from "./Components/Memo/GoodMemo";
import BadUseMemo from "./Components/UseMemo/BadUseMemo";
import GoodUseMemo from "./Components/UseMemo/GoodUseMemo";
import BadUseCallback from "./Components/UseCallback/BadUseCallback";
import GoodUseCallback from "./Components/UseCallback/GoodUseCallback";
import OptimizedExample from "./Components/Combined/OptimizedExample";

// ==================== MEMO EXPLANATIONS ====================
const badMemoExplanation = `// ❌ Anti-pattern: Không sử dụng memo
const ChildComponent = ({ name }: { name: string }) => {
  console.log("ChildComponent re-rendered!");
  return <div>Hello, {name}!</div>;
};

const Parent = () => {
  const [count, setCount] = useState(0);
  const [name] = useState("Copilot");
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>+</button>
      <ChildComponent name={name} />
    </>
  );
};

// ⚠️ Vấn đề:
// - ChildComponent re-render MỖI KHI Parent re-render
// - Dù props "name" KHÔNG thay đổi
// - Gây lãng phí performance với component phức tạp`;

const goodMemoExplanation = `// ✅ Correct pattern: Sử dụng React.memo
import { memo } from "react";

const ChildComponent = memo(({ name }: { name: string }) => {
  console.log("ChildComponent re-rendered!");
  return <div>Hello, {name}!</div>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  const [name] = useState("Copilot");
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>+</button>
      <ChildComponent name={name} />
    </>
  );
};

// ✅ Lợi ích:
// - memo() so sánh props (shallow compare)
// - ChildComponent CHỈ re-render khi props thay đổi
// - Tiết kiệm performance đáng kể`;

// ==================== USEMEMO EXPLANATIONS ====================
const badUseMemoExplanation = `// ❌ Anti-pattern: Không cache expensive calculations
const Component = () => {
  const [count, setCount] = useState(0);
  const [numbers] = useState([1, 2, 3, 4, 5]);

  // Tính toán lại MỖI LẦN render
  const expensiveCalculation = () => {
    console.log("Calculating...");
    // Giả lập tính toán nặng
    for (let i = 0; i < 100000000; i++) { }
    return numbers.reduce((a, b) => a + b, 0);
  };

  const sum = expensiveCalculation(); // Chạy mỗi render!

  return <div>Sum: {sum}, Count: {count}</div>;
};

// ⚠️ Vấn đề:
// - Calculation chạy lại khi count thay đổi
// - Dù numbers KHÔNG thay đổi
// - Gây lag UI nghiêm trọng`;

const goodUseMemoExplanation = `// ✅ Correct pattern: Sử dụng useMemo
import { useMemo } from "react";

const Component = () => {
  const [count, setCount] = useState(0);
  const [numbers] = useState([1, 2, 3, 4, 5]);

  // Chỉ tính toán khi dependencies thay đổi
  const sum = useMemo(() => {
    console.log("Calculating...");
    // Giả lập tính toán nặng
    for (let i = 0; i < 100000000; i++) { }
    return numbers.reduce((a, b) => a + b, 0);
  }, [numbers]); // Dependency array

  return <div>Sum: {sum}, Count: {count}</div>;
};

// ✅ Lợi ích:
// - Calculation CHỈ chạy khi numbers thay đổi
// - Click count không trigger calculation
// - UI mượt mà, không lag`;

// ==================== USECALLBACK EXPLANATIONS ====================
const badUseCallbackExplanation = `// ❌ Anti-pattern: Function tạo mới mỗi render
const ButtonChild = memo(({ onClick, label }) => {
  console.log("Button rendered!");
  return <button onClick={onClick}>{label}</button>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Function tạo mới MỖI LẦN render
  const handleClick = () => {
    setCount(c => c + 1);
  };

  return (
    <>
      <input onChange={(e) => setText(e.target.value)} />
      <ButtonChild onClick={handleClick} label="Click" />
    </>
  );
};

// ⚠️ Vấn đề:
// - handleClick là object mới mỗi render
// - memo() của ButtonChild VÔ DỤNG
// - Gõ text -> Parent render -> handleClick mới -> Button render`;

const goodUseCallbackExplanation = `// ✅ Correct pattern: Sử dụng useCallback
import { useCallback, memo } from "react";

const ButtonChild = memo(({ onClick, label }) => {
  console.log("Button rendered!");
  return <button onClick={onClick}>{label}</button>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Function được cache, stable reference
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty deps = never recreate

  return (
    <>
      <input onChange={(e) => setText(e.target.value)} />
      <ButtonChild onClick={handleClick} label="Click" />
    </>
  );
};

// ✅ Lợi ích:
// - handleClick giữ reference ổn định
// - memo() của ButtonChild HOẠT ĐỘNG
// - Gõ text -> Parent render -> Button KHÔNG render`;

// ==================== COMBINED EXPLANATION ====================
const combinedExplanation = `// 🚀 TỔNG HỢP: Kết hợp memo + useMemo + useCallback

// 1️⃣ memo: Wrap component con để tránh re-render không cần thiết
const UserCard = memo(({ user, onSelect }) => {
  return <div onClick={() => onSelect(user.id)}>{user.name}</div>;
});

// 2️⃣ useMemo: Cache expensive calculations & derived data
const filteredUsers = useMemo(() => {
  return users
    .filter(u => u.name.includes(filterText))
    .sort((a, b) => b.score - a.score);
}, [users, filterText]);

const statistics = useMemo(() => {
  return {
    avg: filteredUsers.reduce((a, u) => a + u.score, 0) / filteredUsers.length,
    max: Math.max(...filteredUsers.map(u => u.score)),
  };
}, [filteredUsers]);

// 3️⃣ useCallback: Stable function references for child components
const handleSelect = useCallback((id) => {
  setSelectedId(id);
}, []);

// 📊 KẾT QUẢ:
// - UserCard chỉ re-render khi user data thay đổi
// - filteredUsers chỉ tính lại khi users/filterText đổi
// - statistics chỉ tính lại khi filteredUsers đổi
// - handleSelect không gây re-render UserCard

// 🎯 NGUYÊN TẮC SỬ DỤNG:
// ┌─────────────┬────────────────────────────────────────┐
// │ memo        │ Component nhận props từ parent         │
// │ useMemo     │ Tính toán phức tạp, derived state      │
// │ useCallback │ Function truyền xuống component con    │
// └─────────────┴────────────────────────────────────────┘`;

const Memoization = () => {
  return (
    <div className="w-full h-full overflow-y-auto p-6 text-base">
      <h1 className="text-3xl font-bold mb-6 text-violet-400">
        🧠 Memoization Techniques
      </h1>

      {/* SECTION 1: React.memo */}
      <section className="mb-8 p-5 bg-gray-900 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          📌 1. React.memo - Tránh re-render component con
        </h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 px-2 py-1 rounded">memo()</code> là HOC giúp 
          component chỉ re-render khi props thay đổi (shallow compare).
        </p>
        <CompareComponents
          badComponent={<BadMemo />}
          goodComponent={<GoodMemo />}
          badCodeExplanation={badMemoExplanation}
          goodCodeExplanation={goodMemoExplanation}
          badTitle="❌ Không dùng memo"
          goodTitle="✅ Có dùng memo"
        />
      </section>

      {/* SECTION 2: useMemo */}
      <section className="mb-8 p-5 bg-gray-900 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          📌 2. useMemo - Cache expensive calculations
        </h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 px-2 py-1 rounded">useMemo()</code> cache 
          kết quả tính toán, chỉ tính lại khi dependencies thay đổi.
        </p>
        <CompareComponents
          badComponent={<BadUseMemo />}
          goodComponent={<GoodUseMemo />}
          badCodeExplanation={badUseMemoExplanation}
          goodCodeExplanation={goodUseMemoExplanation}
          badTitle="❌ Không dùng useMemo"
          goodTitle="✅ Có dùng useMemo"
        />
      </section>

      {/* SECTION 3: useCallback */}
      <section className="mb-8 p-5 bg-gray-900 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          📌 3. useCallback - Stable function references
        </h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 px-2 py-1 rounded">useCallback()</code> cache 
          function, giữ reference ổn định giữa các lần render.
        </p>
        <CompareComponents
          badComponent={<BadUseCallback />}
          goodComponent={<GoodUseCallback />}
          badCodeExplanation={badUseCallbackExplanation}
          goodCodeExplanation={goodUseCallbackExplanation}
          badTitle="❌ Không dùng useCallback"
          goodTitle="✅ Có dùng useCallback"
        />
      </section>

      {/* SECTION 4: Combined Example */}
      <section className="mb-8 p-5 bg-gray-900 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          🚀 4. Ví dụ Tổng Hợp - Kết hợp cả 3 kỹ thuật
        </h2>
        <p className="text-gray-300 mb-4">
          Một ví dụ thực tế kết hợp <code className="bg-gray-800 px-2 py-1 rounded">memo</code>, 
          <code className="bg-gray-800 px-2 py-1 rounded">useMemo</code>, và 
          <code className="bg-gray-800 px-2 py-1 rounded">useCallback</code> để 
          tối ưu performance tối đa.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="p-4 bg-green-950 border border-green-800 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-green-400">
              ✅ Optimized Component
            </h3>
            <OptimizedExample />
          </div>
          
          <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-yellow-400">
              📝 Code Explanation
            </h3>
            <pre className="text-xs bg-gray-900 text-gray-300 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {combinedExplanation}
            </pre>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="mb-8 p-5 bg-linear-to-r from-purple-900 to-indigo-900 border border-purple-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-yellow-400">
          📊 Tổng Kết - Khi nào sử dụng?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-black/30 rounded-lg">
            <h3 className="font-bold text-blue-400 mb-2">memo()</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✓ Component render thường xuyên</li>
              <li>✓ Props ít thay đổi</li>
              <li>✓ Component con phức tạp</li>
              <li>✓ Pure component (no side effects)</li>
            </ul>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <h3 className="font-bold text-green-400 mb-2">useMemo()</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✓ Tính toán phức tạp/nặng</li>
              <li>✓ Filter/sort large arrays</li>
              <li>✓ Derived state từ props/state</li>
              <li>✓ Object/array truyền xuống child</li>
            </ul>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <h3 className="font-bold text-orange-400 mb-2">useCallback()</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✓ Function truyền xuống memo child</li>
              <li>✓ Function trong useEffect deps</li>
              <li>✓ Event handlers cho child</li>
              <li>✓ Kết hợp với memo()</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-red-900/50 rounded-lg">
          <p className="text-sm text-red-300">
            ⚠️ <strong>Lưu ý:</strong> Đừng lạm dụng! Memoization có chi phí memory. 
            Chỉ sử dụng khi thực sự cần thiết và đo lường performance trước/sau.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Memoization;