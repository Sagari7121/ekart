"use client";

import Navbar from "@/components/Navbar";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import "./globals.css";

// export const metadata = {
// 	title: "E-Commerce App",
// 	description: "An e-commerce app built with Next.js and Redux Toolkit",
// };

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Provider store={store}>
					<Navbar />
					{children}
				</Provider>
			</body>
		</html>
	);
}
