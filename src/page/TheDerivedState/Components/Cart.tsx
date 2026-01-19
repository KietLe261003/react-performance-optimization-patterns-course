import type React from "react";
import { useEffect, useState } from "react";

/**
 * ❌ CÁCH SAI: Sử dụng useState + useEffect để tính total
 */

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartProps {
    items: CartItem[];
}

const Cart: React.FC<CartProps> = ({ items }) => {
    const [total, setTotal] = useState<number>(0);
    
    useEffect(() => {
        console.log("❌ CartBad: useEffect chạy, tính toán total...");
        const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(sum);
    }, [items]);

    return (
        <div className="p-3">
            <h4 className="text-base font-medium mb-2 text-gray-300">🛒 Giỏ hàng ({items.length} sản phẩm)</h4>
            <ul className="list-none p-0 max-h-32 overflow-auto">
                {items.map(item => (
                    <li key={item.id} className="py-1 border-b border-gray-700 text-sm text-gray-400">
                        {item.name} x{item.quantity} - ${item.price * item.quantity}
                    </li>
                ))}
            </ul>
            <p className="mt-3 text-lg font-bold text-red-400">
                💰 Tổng: ${total.toLocaleString()}
            </p>
        </div>
    );
};

export default Cart;