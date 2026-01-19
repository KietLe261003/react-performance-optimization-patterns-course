import CompareComponents from "../../components/CompareComponents";
import BadScroll from "./Components/BadScroll";
import GoodScroll from "./Components/GoodScroll";

const badCodeExplanation = `// ❌ Anti-pattern: Không sử dụng throttle
const [scrollY, setScrollY] = useState<number>(0);

useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
    console.log("Scroll Y:", window.scrollY); // Gọi liên tục khi scroll
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

// ⚠️ Vấn đề: 
// - console.log chạy LIÊN TỤC mỗi khi scroll
// - setState được gọi quá nhiều lần
// - Gây lag, giật khi scroll nhanh
// - Tốn tài nguyên CPU không cần thiết`;

const goodCodeExplanation = `// ✅ Correct pattern: Sử dụng useThrottle hook
const [scrollY, setScrollY] = useState<number>(0);
const throttledScrollY = useThrottle(scrollY, 300);

useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

useEffect(() => {
  console.log("Throttled Scroll Y:", throttledScrollY);
}, [throttledScrollY]);

// ✅ Lợi ích:
// - console.log chỉ chạy mỗi 300ms
// - Giảm số lần re-render đáng kể
// - Scroll mượt mà, không lag
// - Tiết kiệm tài nguyên CPU`;

const Throttle = () => {
  return (
    <div className="w-full h-full overflow-y-auto p-6 text-base">
      <h1 className="text-3xl font-bold mb-6 text-violet-400">
        🎯 Throttle Examples
      </h1>
      <section className="mb-8 p-5 bg-gray-900 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          📌 Ví dụ 1: Throttle Scroll - Mở console.log và so sánh cách làm
        </h2>

        <CompareComponents
          badComponent={<BadScroll />}
          goodComponent={<GoodScroll />}
          badCodeExplanation={badCodeExplanation}
          goodCodeExplanation={goodCodeExplanation}
          badTitle="❌ Cách SAI (No Throttle)"
          goodTitle="✅ Cách ĐÚNG (With Throttle)"
        />
      </section>
    </div>
  );
};

export default Throttle;