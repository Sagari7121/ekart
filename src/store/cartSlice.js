"use client";

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [],
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
		},
		removeFromCart(state, action) {
			state.items = state.items.filter(
				(item) => item.id !== action.payload
			);
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
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
