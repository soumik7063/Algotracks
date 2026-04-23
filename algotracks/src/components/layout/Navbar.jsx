import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/profile", label: "Profile" },
  { to: "/contests", label: "Contests" },
  { to: "/bookmarks", label: "Bookmarks" },
  { to: "/recomend", label: "Recommendation" },
];

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0">
      {/* Glassmorphism bar */}
      <div
        className="border-b border-slate-800/60 backdrop-blur-md"
        style={{ background: "rgba(5, 13, 26, 0.85)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="relative">
                <img
                  className="h-9 w-9 rounded-lg"
                  src="./logo.png"
                  alt="AlgoTracks"
                />
                <div className="absolute inset-0 rounded-lg bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                Algo<span className="text-blue-400">Tracks</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-blue-400 bg-blue-500/10"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop auth button */}
            <div className="hidden md:flex items-center">
              {!isLoggedIn ? (
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </Link>
              ) : (
                <Link
                  onClick={logout}
                  to="/signup"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-rose-400 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 hover:text-rose-300 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log out
                </Link>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 bg-slate-800/60 text-slate-400 hover:text-white hover:border-slate-600 transition-all duration-200"
            >
              <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="md:hidden border-b border-slate-800/60 backdrop-blur-md"
          style={{ background: "rgba(5, 13, 26, 0.95)" }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all duration-200"
              >
                {label}
              </Link>
            ))}

            <div className="pt-3 mt-2 border-t border-slate-800">
              {!isLoggedIn ? (
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                  style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </Link>
              ) : (
                <Link
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  to="/signup"
                  className="flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl text-sm font-semibold text-rose-400 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log out
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;