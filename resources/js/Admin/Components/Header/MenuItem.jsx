import React from "react";
import DropDown from "@/Frontend/Components/Header/DropDown";
import NavigationLink from "@/Components/NavigationLink";

function MenuItem({ item, setMobileToggle }) {
    const hasChildren = item.children.length > 0;

    return (
        <li className={hasChildren ? "menu-item-has-children" : "menu-item"}>
            {/*<Link to={item.url} onClick={() => setMobileToggle(false)} href={item.url}>*/}
            <NavigationLink href={item.url}>
                {item.name}
            </NavigationLink>
            {hasChildren && (
                <DropDown>
                    <ul>
                        {item.children.map(childItem => (
                            <MenuItem key={childItem.id} item={childItem} />
                        ))}
                    </ul>
                </DropDown>
            )}
        </li>
    );
}

export default MenuItem;
