import { memo } from "react";

interface ChildCallBackProps {
    onClick: ()=>void
}
const ChildCallBack:React.FC<ChildCallBackProps> = ({onClick}) => {
    console.log("ChildCallBack Rendered");
    return (
        <div>
           <button className="text-black" onClick={onClick}>Click me</button>
        </div>
    );
};  

export default memo(ChildCallBack);