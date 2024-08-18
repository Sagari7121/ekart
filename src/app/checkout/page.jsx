"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { clearCart } from "@/store/cartSlice";

export default function CheckoutPage() {
	const cartItems = useSelector((state) => state.cart.items);
	const dispatch = useDispatch();
	const [orderPlaced, setOrderPlaced] = useState(false);

	const handleCheckout = () => {
		setOrderPlaced(true);
		dispatch(clearCart());
	};

	if (orderPlaced) {
		return (
			<div className="container mx-auto p-4">
				<h1 className="text-3xl font-bold mb-4">
					Thank you for your order!
				</h1>
				<p>Your order has been placed successfully.</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Checkout</h1>
			<div>
				{cartItems.map((product) => (
					<div
						key={product.id}
						className="border p-4 mb-2"
					>
						<span>
							{product.name} - ₹{product.price}
						</span>
					</div>
				))}
				<button
					onClick={handleCheckout}
					className="bg-blue-500 text-white px-4 py-2 mt-4"
				>
					Place Order
				</button>
			</div>
		</div>
	);
}
