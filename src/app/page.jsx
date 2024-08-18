import Products from "@/components/Products";

export const metadata = {
	title: "ekart",
	description: "Products listing page",
};

const products = [
	{
		id: 1,
		name: "Wireless Bluetooth Earbuds",
		price: 999,
		image: "/images/product1.webp",
	},
	{
		id: 2,
		name: "Smartphone (128GB, 5G)",
		price: 12599,
		image: "/images/product2.jpg",
	},
	{
		id: 3,
		name: "4K Ultra HD Smart TV (55-inch)",
		price: 35999,
		image: "/images/product3.jpg",
	},
	{
		id: 4,
		name: "Gaming Laptop (16GB RAM, 512GB SSD)",
		price: 44999,
		image: "/images/product4.jpg",
	},
	{
		id: 5,
		name: "Wireless Noise-Cancelling Headphones",
		price: 2499,
		image: "/images/product5.jpg",
	},
	{
		id: 6,
		name: "Electric toothbrush",
		price: 1459,
		image: "/images/product6.jpg",
	},
	{
		id: 7,
		name: "Digital Camera (20MP, 4K Video)",
		price: 28000,
		image: "/images/product7.jpg",
	},
	{
		id: 8,
		name: "Smartwatch (GPS, Heart Rate Monitor)",
		price: 3599,
		image: "/images/product8.jpg",
	},
	{
		id: 9,
		name: "Portable Bluetooth Speaker",
		price: 2999,
		image: "/images/product9.jpg",
	},
	{
		id: 10,
		name: "Home Security Camera System",
		price: 6559,
		image: "/images/product10.jpg",
	},
];

export default function HomePage() {
	return <Products products={products} />;
}
