import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faSearch,
  faMoon,
  faSun,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useCart, useProducts, useTheme, useAuth } from "../../context";
import { logo } from "../../assets/images";
import "../../styles/Header.css";
import { UserProfile, CartItems } from "..";

function Header() {
  const { cart } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchInputVisible, setSearchInputVisible] = useState(false);
  const [searchTimer, setSearchTimer] = useState(null);
  const searchInputRef = useRef(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchResultsVisible, setSearchResultsVisible] = useState(false);
  const { isAuthenticated } = useAuth(); // Get the authentication status and logout function
  const [isUserProfileVisible, setUserProfileVisible] = useState(false); // State to manage user profile visibility

  useEffect(() => {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalCount);
  }, [cart]);

  const products = useProducts();

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
    setSearchResultsVisible(true);
  };

  const toggleSearchInput = () => {
    setSearchInputVisible(!isSearchInputVisible);
    if (!isSearchInputVisible) {
      setSearchQuery("");
      setSearchResultsVisible(false);
    }
  };

  const handleSearchInputBlur = () => {
    if (isSearchInputVisible) {
      setSearchTimer(
        setTimeout(() => {
          setSearchInputVisible(false);
          setSearchQuery("");
        }, 2000)
      );
    }
  };

  const handleSearchInputFocus = () => {
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
    setSearchResultsVisible(false);
  };

  const toggleUserProfile = () => {
    setUserProfileVisible(!isUserProfileVisible);
  };

  const handleLogout = () => {
    // Close the user profile when logging out
    setUserProfileVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isCartOpen && !e.target.closest(".cart-icon")) {
        setCartOpen(false);
      }
      if (!e.target.closest(".search-bar")) {
        setSearchResultsVisible(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isCartOpen]);

  return (
    <header className={`header ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="background-blur"></div>
      <div className="glass-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Fruity Logo" />
          </Link>
        </div>

        <div className="right-items">
          <div className="search-bar">
            <div
              className={`search-toggle ${
                isSearchInputVisible ? "hidden" : ""
              }`}
              onClick={toggleSearchInput}
            >
              <FontAwesomeIcon icon={faSearch} />
            </div>
            {isSearchInputVisible && (
              <>
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onBlur={handleSearchInputBlur}
                  onFocus={handleSearchInputFocus}
                  ref={searchInputRef}
                />
              </>
            )}
          </div>
          <div className="cart-icon">
            <div onClick={toggleCart}>
              <FontAwesomeIcon icon={faShoppingBasket} />
              <span className="cart-count">{cartCount}</span>
            </div>
            {isCartOpen && <CartItems />}
          </div>
          <div className="mode-toggle" onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </div>
          {isAuthenticated && (
            <div className="user-icon">
              <FontAwesomeIcon icon={faBars} onClick={toggleUserProfile} />
              {isUserProfileVisible && <UserProfile onLogout={handleLogout} />}
            </div>
          )}
          {console.log("IsAuthenticated:", isAuthenticated)}
        </div>
      </div>
      {isSearchResultsVisible && (
        <div className="search-results">
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map((product) => (
                <li key={product.id}>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="results">No results found</p>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
