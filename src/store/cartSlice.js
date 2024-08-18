"use client";

import { createSlice } from "@reduxjs/toolkit";

// Helper functions to handle localStorage
const saveCartToLocalStorage = (cart) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("cart", JSON.stringify(cart));
	}
};

const loadCartFromLocalStorage = () => {
	if (typeof window !== "undefined") {
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : [];
	}
};

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: loadCartFromLocalStorage(),
	},
	reducers: {
		addToCart(state, action) {
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id
			);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}
			saveCartToLocalStorage(state.items);
		},
		removeFromCart(state, action) {
			state.items = state.items.filter(
				(item) => item.id !== action.payload
			);
			saveCartToLocalStorage(state.items);
		},
		updateQuantity(state, action) {
			const item = state.items.find(
				(item) => item.id === action.payload.id
			);
			if (item && action.payload.quantity > 0) {
				item.quantity = action.payload.quantity;
			} else if (item && action.payload.quantity === 0) {
				state.items = state.items.filter((i) => i.id !== item.id); // Remove item if quantity is 0
			}
			saveCartToLocalStorage(state.items);
		},
		clearCart: (state) => {
			state.items = [];
			saveCartToLocalStorage(state.items);
		},
	},
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
