import { User2 } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="bg-gray-900 text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link
					href="/"
					className="text-white text-3xl font-bold"
				>
					ekart
				</Link>

				<div className="flex items-center gap-2">
					<span>Sagari K S</span>
					<User2 />
				</div>
			</div>
		</nav>
	);
}
