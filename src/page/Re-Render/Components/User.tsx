import { memo, useMemo } from "react";

interface UserProps {
    id: number;
    name: string;
}
interface ListUserProps {
    listUser: UserProps[];
}
const User:React.FC<ListUserProps> = ({ listUser }) => {
    console.log("User Component Rendered");
    const sortedListUser = useMemo(()=>{
        console.log("Sorting users");
        return [...listUser].sort((a, b) => a.name.localeCompare(b.name));
    }, [listUser])
    return (
        <>
            {sortedListUser.map((user) => (
                <div key={user.id}>
                    <p className="text-3xl font-bold">{user.name}</p>
                </div>
            ))}
        </>
    );
};

export default memo(User);