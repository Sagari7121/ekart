"use client";

import { addToCart, updateQuantity, removeFromCart } from "@/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";

export default function Products({ products }) {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.items);
	const [cartVisible, setCartVisible] = useState(false);

	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
	};

	const handleQuantityChange = (product, quantity) => {
		if (quantity < 1) {
			dispatch(removeFromCart(product.id));
		} else {
			dispatch(updateQuantity({ id: product.id, quantity }));
		}
	};

	const getProductQuantity = (productId) => {
		const cartItem = cartItems.find((item) => item.id === productId);
		return cartItem ? cartItem.quantity : 0;
	};

	return (
		<div className="bg-gray-50">
			{/* Landing Banner */}
			<div className="bg-blue-600 text-white p-20 text-center mb-8">
				<h1 className="text-5xl font-bold">Welcome to Our Store</h1>
				<p className="mt-4 text-lg">
					Discover amazing products at great prices!
				</p>
			</div>

			<div className="container mx-auto">
				<h2 className="text-3xl font-bold text-center mb-8">
					Our Products
				</h2>
				<div className="grid grid-cols-3 gap-6 p-4">
					{products.map((product) => {
						const quantity = getProductQuantity(product.id);
						return (
							<div
								key={product.id}
								className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:shadow-xl"
							>
								<Image
									src={product.image}
									alt={product.name}
									width={400}
									height={400}
									className="w-full h-64 object-cover transform transition-transform duration-200 hover:scale-105"
								/>
								<div className="p-4">
									<h3 className="text-xl font-semibold text-gray-800 mb-2">
										{product.name}
									</h3>
									<p className="text-lg font-medium text-gray-600 mb-4">
										₹{product.price.toFixed(2)}
									</p>
									{quantity > 0 ? (
										<div className="flex items-center space-x-4">
											<button
												onClick={() =>
													handleQuantityChange(
														product,
														quantity - 1
													)
												}
												className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
											>
												-
											</button>
											<span className="text-lg font-semibold">
												{quantity}
											</span>
											<button
												onClick={() =>
													handleQuantityChange(
														product,
														quantity + 1
													)
												}
												className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
											>
												+
											</button>
										</div>
									) : (
										<button
											onClick={() =>
												handleAddToCart(product)
											}
											className="mt-4 w-full bg-green-500 text-white text-center py-2 rounded-md hover:bg-green-600 transition-colors"
										>
											Add to Cart
										</button>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Floating Cart Button */}
			<button
				onClick={() => setCartVisible(!cartVisible)}
				className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg focus:outline-none"
			>
				<ShoppingCart className="w-8 h-8" />
				{cartItems.length > 0 && (
					<span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">
						{cartItems.length}
					</span>
				)}
			</button>

			{/* Cart Overlay */}
			{cartVisible && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 flex justify-end">
					<div className="w-1/3 bg-white shadow-lg p-6">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold">Your Cart</h2>
							<button
								onClick={() => setCartVisible(false)}
								className="focus:outline-none hover:bg-transparent"
							>
								<X className="w-6 h-6 text-gray-600" />
							</button>
						</div>

						{cartItems.length > 0 ? (
							<div>
								<div className="flex justify-between items-center mb-6">
									<span className="text-lg font-medium">
										Total Items:{" "}
										{cartItems.reduce(
											(acc, item) => acc + item.quantity,
											0
										)}
									</span>
									<span className="text-lg font-medium">
										Cart value: ₹
										{cartItems
											.reduce(
												(acc, item) =>
													acc +
													item.price * item.quantity,
												0
											)
											.toFixed(2)}
									</span>
								</div>

								{cartItems.map((item) => (
									<div
										key={item.id}
										className="flex justify-between items-center mb-4"
									>
										<div className="flex items-center">
											<Image
												src={item.image}
												alt={item.name}
												width={64}
												height={64}
												className="w-16 h-16 object-cover mr-4"
											/>
											<div>
												<span>{item.name}</span>
												<div className="flex items-center mt-2">
													<button
														onClick={() =>
															handleQuantityChange(
																item,
																item.quantity -
																	1
															)
														}
														className="bg-red-500 text-white px-4 py-1 rounded-md"
													>
														-
													</button>
													<span className="mx-2">
														{item.quantity}
													</span>
													<button
														onClick={() =>
															handleQuantityChange(
																item,
																item.quantity +
																	1
															)
														}
														className="bg-blue-500 text-white px-4 py-1 rounded-md"
													>
														+
													</button>
												</div>
											</div>
										</div>
										<div className="text-right">
											<span className="block">
												₹{item.price.toFixed(2)} *{" "}
												{item.quantity} = ₹
												{(
													item.price * item.quantity
												).toFixed(2)}
											</span>
										</div>
										<button
											onClick={() =>
												dispatch(
													removeFromCart(item.id)
												)
											}
											className="text-red-500 focus:outline-none ml-4"
										>
											<X className="w-5 h-5" />
										</button>
									</div>
								))}

								<Link
									href="/checkout"
									className="bg-green-500 text-white px-4 py-2 rounded-md block text-center"
								>
									Proceed to Checkout
								</Link>
							</div>
						) : (
							<p>Your cart is empty.</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
