import CompareComponents from "../../components/CompareComponents";
import DebouncedSearch from "./Component/DebouncedSearch";
import Search from "./Component/Search";

const badCodeExplanation = `// ❌ Anti-pattern
const [query,setQuery]=useState("");
const [listUser,setListUser]=useState(getUser());

useEffect(()=>{
    const filteredUsers = getUser().filter(user => user.name.includes(query));
    setListUser(filteredUsers);
},[query])`;

const goodCodeExplanation = `// ✅ Correct pattern - useDebounce hook
const [debouncedValue, setDebouncedValue]=useState("");

useEffect(()=>{
    const handler = setTimeout(() => {
        console.log("Debounced value:", value);
        setDebouncedValue(value);
    }, delay);
    return () => {
        clearTimeout(handler);
    };
}, [value, delay])

// Usage in component
const [query,setQuery]=useState("");
const [listUser,setListUser]=useState(getUser());
const debouncedQuery = useDebounce(query);

useEffect(()=>{
    const filteredUsers = getUser().filter(user => user.name.includes(debouncedQuery));
    setListUser(filteredUsers);
},[debouncedQuery])`;

const Debouncing = () => {
  return (
    <div className="w-full h-full overflow-y-auto p-6 text-base">
      <h1 className="text-3xl font-bold mb-6 text-violet-400">
        🎯 Debouncing Examples
      </h1>
      <section className="mb-8 p-5 bg-gray-900 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          📌 Ví dụ 1: Debounce Search - Mở console.log và so sánh cách làm
        </h2>

        <CompareComponents
          badComponent={<Search />}
          goodComponent={<DebouncedSearch />}
          badCodeExplanation={badCodeExplanation}
          goodCodeExplanation={goodCodeExplanation}
          badTitle="❌ Cách SAI (Search)"
          goodTitle="✅ Cách ĐÚNG (Debounced Search)"
        />
      </section>
    </div>
  );
};

export default Debouncing;
