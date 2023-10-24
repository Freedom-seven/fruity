import React from "react";
import { useTheme } from "../../context";

import { logo, cards } from "../../assets/images";

import "../../styles/Footer.css";

function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`footer ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Fruity Logo" />
        </div>
        <div className="footer-text">
          <p>
            Welcome to Fruity, your one-stop shop for fresh and delicious fruits
            and vegetables. We are dedicated to delivering the finest quality
            produce sourced from around the world. Explore our extensive
            selection of fruits and vegetables and embark on a journey towards a
            healthier and more vibrant lifestyle. At Fruity, we believe in
            nourishing both your body and your palate with nature's goodness.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Shipping & Returns</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Customer Service</h3>
            <ul>
              <li>Customer Support</li>
              <li>Live Chat</li>
              <li>Help Center</li>
              <li>Track Your Order</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Site Information</h3>
            <ul>
              <li>Site Map</li>
              <li>Search</li>
              <li>Site Performance</li>
            </ul>
          </div>
          <div className="footer-column newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter for updates and promotions.</p>
            <form className="newsletter-form">
              <input
                className="newsletter-input"
                type="email"
                placeholder="Your Email"
              />
              <button className="newsletter-submit" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="footer-social">
          <h3>Connect with Us</h3>
          <ul>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </ul>
        </div>
        <div className="footer-payment">
          <h3>Payment Options</h3>
          <p>We accept major credit cards and online payment methods.</p>
          <img src={cards} alt="Credit Card Logos" />
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-legal">
          <p>&copy; 2023 Fruity. All rights reserved.</p>
        </div>
        <div className="footer-accessibility">
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Accessibility</li>
            <li>Language</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
