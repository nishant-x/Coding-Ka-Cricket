import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/sisteclogo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Guidelines", to: "/guideline" },
  { label: "Process Flow", to: "/#processflow", isAnchor: true },
  { label: "FAQs", to: "/#faq", isAnchor: true },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0 ">
          <img src={logo} alt="Coding Ka Cricket" className="h-11 w-auto object-contain" />
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:border-indigo-400 hover:text-indigo-300 lg:hidden"
          onClick={() => setIsMenuActive((prev) => !prev)}
          aria-label="Toggle menu"
        >
          Menu
        </button>

        <ul
          className={`absolute left-0 top-full w-full border-b border-slate-800 bg-slate-950/95 px-4 py-4 lg:static lg:flex lg:w-auto lg:items-center lg:gap-7 lg:border-0 lg:bg-transparent lg:p-0 ${
            isMenuActive ? "block" : "hidden lg:flex"
          }`}
        >
          {navItems.map((item) => (
            <li key={item.label} className="py-1 lg:py-0">
              {item.isAnchor ? (
                <a
                  href={item.to}
                  className="text-sm font-medium text-slate-200 transition hover:text-cyan-300"
                  onClick={() => setIsMenuActive(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.to}
                  className="text-sm font-medium text-slate-200 transition hover:text-cyan-300"
                  onClick={() => setIsMenuActive(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li className="mt-3 lg:mt-0">
            <Link
              className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:scale-[1.02]"
              to="/register"
              onClick={() => setIsMenuActive(false)}
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
