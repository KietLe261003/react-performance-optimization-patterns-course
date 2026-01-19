import type React from "react";
import { useMemo } from "react";

/**
 * ✅ CÁCH ĐÚNG: Sử dụng Derived State với useMemo
 */

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartGoodProps {
    items: CartItem[];
}

const CartGood: React.FC<CartGoodProps> = ({ items }) => {
    const total = useMemo(() => {
        console.log("✅ CartGood: Tính toán total...");
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [items]);

    const itemCount = items.length;
    const totalQuantity = useMemo(() => {
        return items.reduce((acc, item) => acc + item.quantity, 0);
    }, [items]);

    const hasItems = items.length > 0;
    const isExpensiveCart = total > 1000;

    return (
        <div className="p-3">
            <h4 className="text-base font-medium mb-2 text-gray-300">
                🛒 Giỏ hàng ({itemCount} loại, {totalQuantity} sản phẩm)
            </h4>
            
            {hasItems ? (
                <>
                    <ul className="list-none p-0 max-h-32 overflow-auto">
                        {items.map(item => (
                            <li key={item.id} className="py-1 border-b border-gray-700 text-sm text-gray-400">
                                {item.name} x{item.quantity} - ${item.price * item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p className={`mt-3 text-lg font-bold ${isExpensiveCart ? 'text-amber-400' : 'text-green-400'}`}>
                        💰 Tổng: ${total.toLocaleString()}
                        {isExpensiveCart && " 🔥 Đơn hàng lớn!"}
                    </p>
                </>
            ) : (
                <p className="text-gray-500">Giỏ hàng trống</p>
            )}
        </div>
    );
};

export default CartGood;
