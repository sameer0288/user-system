import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-xl font-bold">
            Your App Name
          </Link>
        </div>
        <ul className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/profile" className="text-white hover:text-gray-300">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="text-white hover:text-gray-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="text-white hover:text-gray-300">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white hover:text-gray-300">
                  Signin
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
