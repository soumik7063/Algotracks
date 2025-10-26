import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg fixed w-full z-10 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site name */}
          <div className="flex-shrink-0 flex flex-row items-center">
            <Link to="/" className="font-bold text-xl flex gap-2 items-center">
            <img className="h-10 w-10 " src="./logo.png" alt="" />
              AlgoTracks
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Profile
              </Link>
              <Link
                to="/contests"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Contests
              </Link>
              <Link
                to="/bookmarks"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Bookmarks
              </Link>
              <Link
                to="/recomend"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Recomendation
              </Link>
            </div>
          </div>

          {/* User section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center">
              {!isLoggedIn ? (
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
              ) : (
                <Link
                  onClick={logout}
                  to="/signup"
                  className="bg-red-400 hover:bg-red-500 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Log out
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/contests"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Contests
            </Link>
            <Link
              to="/bookmarks"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Bookmarks
            </Link>
            <Link
              to="/recomend"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Recomendation
            </Link>
          </div>
          <div className="px-2 pt-2 pb-3">
            {!isLoggedIn ? (
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            ) : (
              <Link
                onClick={logout}
                to="/signup"
                className="bg-red-400 hover:bg-red-500 px-4 py-2 rounded-md text-sm font-medium"
              >
                Log out
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
