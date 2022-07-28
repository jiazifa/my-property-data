import React from "react";
import { Link } from "react-router-dom";
import { IMenu, menus } from "../../utils/routes";

const MenuBuilder = (menus: Array<IMenu>): Array<React.ReactNode> => {
    return (menus.map((i) => (
        <Link key={i.key} to={i.path} className="navbar-item">
            {i.title}
        </Link>
    )));
};
const Navigation = (isContainer: boolean = true) => {
    const MENUS = MenuBuilder(menus);
    const brand = (
        <div className="navbar-brand">
            <a href="#" className="navbar-item">
                <span>{/*Tool hub*/}</span>
            </a>
        </div>
    );

    const navEnd = (
        <div className="navbar-end">
            {MENUS}
        </div>
    );
    let body = (
        <nav className="navbar is-light" role="navigation">
            {brand}
            {navEnd}
        </nav>
    );
    if (isContainer === true) {
        body = (
            <nav className="navbar is-light" role="navigation">
                <div className="container">
                    {brand}
                    {navEnd}
                </div>
            </nav>
        );
    }
    return <div>{body}</div>;
};


export { Navigation };