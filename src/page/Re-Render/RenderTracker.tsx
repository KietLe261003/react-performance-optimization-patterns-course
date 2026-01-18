import { useState } from "react";
import ProfileCard from "./Components/ProfileCard";

const Index = () => {
  const [value,setValue]=useState<string>("");
  return (
    <div>
      {/* <Child /> */}
      <input
        type="text"
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
        placeholder="Type inside me"
      />
      <ProfileCard name="Kiệt Lê" />
    </div>
  );
};

export default Index;
