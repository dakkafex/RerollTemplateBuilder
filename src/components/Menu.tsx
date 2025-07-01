import { NavLink } from "react-router-dom";
import { Home, Dna, Sword, PocketKnife } from "lucide-react";

export default function Menu() {
    return (
        <>
            <aside className="w-16 bg-black text-white flex flex-col items-center py-4 space-y-6">
                <NavLink to="background">
                    <IconButton icon={<Home />} />
                </NavLink>
                <NavLink to="classes">
                    <IconButton icon={<Sword />} />
                </NavLink>
                <NavLink to="subclasses">
                    <IconButton icon={<PocketKnife />} />
                </NavLink>
                <NavLink to="races">
                    <IconButton icon={<Dna />} />
                </NavLink>
            </aside>
        </>

    );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
    return (
        <button className="p-2 bg-gray-400 hover:bg-gray-700 rounded">
            {icon}
        </button>
    );
}