import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import "./HeaderModern.css"; // NEW CSS

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };

  return (
    <header className="main-header">
      <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand logo-text">
            🛒 Gadget Store
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto align-items-lg-center gap-2">
              <SearchInput />

              <NavLink to="/" className="nav-link nav-item-custom">
                Home
              </NavLink>

              <div className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle nav-item-custom"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link className="dropdown-item" to={`/category/${c.slug}`}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {!auth?.user ? (
                <div className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle nav-user-btn"
                    data-bs-toggle="dropdown"
                  >
                    <FaUserAlt />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <NavLink to="/register" className="dropdown-item">
                        Register
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" className="dropdown-item">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact" className="dropdown-item">
                        Contact Us
                      </NavLink>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle nav-user-btn"
                    data-bs-toggle="dropdown"
                  >
                    <FaUserAlt /> {auth?.user?.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <NavLink
                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        className="dropdown-item"
                      >
                        <MdDashboard /> Dashboard
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/contact" className="dropdown-item">
                          Contact Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" onClick={handleLogout} className="dropdown-item">
                        <FiLogOut /> Logout
                      </NavLink>
                    </li>
                    
                  </ul>
                </div>
              )}

              <NavLink to="/cart" className="nav-link cart-icon">
                <Badge count={cart?.length} showZero offset={[6, -2]}>
                  <FaShoppingCart />
                </Badge>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
