import WithCompiler from "./Components/WithCompiler";
import WithoutCompiler from "./Components/WithoutCompiler";

/**
 * React Compiler Demo - React 19
 *
 * React Compiler là một build-time optimizer mới trong React 19.
 * Nó tự động áp dụng memoization cho code của bạn.
 *
 * LỢI ÍCH:
 * 1. Không cần React.memo() - Components tự động được memoize
 * 2. Không cần useMemo() - Calculations tự động được cache
 * 3. Không cần useCallback() - Functions tự động có stable reference
 * 4. Code sạch hơn, ít boilerplate hơn
 * 5. Hiệu suất tốt hơn vì compiler biết chính xác cần memoize gì
 *
 * CÁCH HOẠT ĐỘNG:
 * - Compiler phân tích code lúc build time
 * - Tự động thêm memoization vào những chỗ cần thiết
 * - Theo dõi dependencies một cách chính xác
 * - Chỉ re-render/re-calculate khi thực sự cần
 */

const ReactCompiler = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🚀 React Compiler Demo - Automatic Memoization
      </h1>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">📝 Hướng dẫn:</h2>
        <ol className="list-decimal list-inside space-y-1 text-gray-700">
          <li>Mở Console (F12) để xem log khi component re-render</li>
          <li>Click nút "Count" ở mỗi ví dụ để trigger re-render</li>
          <li>Thử tìm kiếm sản phẩm để xem filtering</li>
          <li>Click vào sản phẩm để chọn</li>
          <li>So sánh số lần re-render giữa 2 cách</li>
        </ol>
      </div>

      <div className="mb-6 p-4 bg-purple-50 rounded-lg text-black">
        <h2 className="text-lg font-semibold mb-2">
          ⚡ React Compiler làm gì?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium text-red-600">❌ Trước đây (Manual):</h3>
            <pre className="bg-red-100 p-2 rounded mt-1 overflow-x-auto">
              {`const MemoizedComponent = memo(Component);
const value = useMemo(() => calc(), [deps]);
const fn = useCallback(() => {}, [deps]);`}
            </pre>
          </div>
          <div>
            <h3 className="font-medium text-green-600">
              ✅ React 19 (Automatic):
            </h3>
            <pre className="bg-green-100 p-2 rounded mt-1 overflow-x-auto">
              {`const Component = () => {...};
const value = expensiveCalculation();
const fn = () => doSomething();
// Compiler tự động tối ưu!`}
            </pre>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WithoutCompiler />
        <WithCompiler />
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">💡 Lưu ý quan trọng:</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>
            React Compiler chỉ hoạt động khi đã cấu hình đúng trong
            vite.config.ts
          </li>
          <li>
            Compiler tuân theo "Rules of React" - code phải pure và idiomatic
          </li>
          <li>
            Vẫn có thể dùng useMemo/useCallback nếu cần, nhưng thường không cần
            thiết
          </li>
          <li>
            Compiler thông minh hơn manual memoization vì biết chính xác
            dependencies
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReactCompiler;
