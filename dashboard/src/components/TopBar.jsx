import Menu from "./Menu";

const TopBar = () => {
    return (
        <header className="relative z-50 h-16 shrink-0 border-b border-slate-200 bg-white">
            <Menu />
        </header>
    );
};

export default TopBar;
