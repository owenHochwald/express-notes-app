import { PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-primary text-2xl">Graphium</a>
            </div>
            <div className="navbar-end gap-4 px-4">
                <div>
                    <Link to={"/create"} className="btn btn-primary">
                        <PlusIcon className="size-5" />
                        <span> New Note</span>
                    </Link>
                </div>
                <div>
                    <Link to={"/create"} className="btn btn-primary">
                        <span>View Graphs</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;