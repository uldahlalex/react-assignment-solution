import ThemeSwitcher from "./ThemeSwitcher.tsx";
import Menu from "./Menu.tsx";

export default function Navigation() {
    return (
        <div className="navbar bg-base-100 h-16 min-h-[4rem]">
            <div className="flex-1">
                <Menu />
            </div>
            <div className="flex-none">
                <ThemeSwitcher />
            </div>
        </div>
    );
}