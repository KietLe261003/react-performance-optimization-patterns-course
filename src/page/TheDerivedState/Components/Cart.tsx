import type React from "react";

interface CartProps {
    items: { id: number; name: string; price: number }[];
}

const Cart:React.FC<CartProps> = ({items}) => {
    return (
        <div>
            
        </div>
    );
};

export default Cart;