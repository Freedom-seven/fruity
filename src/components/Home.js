import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Header, ProductCard, Footer } from ".";
import { useProducts, useTheme } from "../context";

import "../styles/Home.css";

import {
  promo1,
  promo2,
  promo3,
  promo4,
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
} from "../assets/images";

function Home() {
  const { isDarkMode } = useTheme();
  const products = useProducts();

  const fruits = products.filter((product) => product.category === "fruits");
  const vegetables = products.filter(
    (product) => product.category === "vegetables"
  );

  return (
    <div
      className={`home-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <Header products={products} />

      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
      >
        <div>
          <img src={carousel1} alt="Fruits 1" />
          <div className="legend">
            <h2>Discover Fresh Fruits</h2>
            <p>Explore a world of flavors and nutrition.</p>
          </div>
        </div>
        <div>
          <img src={carousel2} alt="Fruits 2" />
          <div className="legend">
            <h2>Delicious and Nutritious</h2>
            <p>Find the freshest and healthiest vegetables.</p>
          </div>
        </div>
        <div>
          <img src={carousel3} alt="Fruits 2" />
          <div className="legend">
            <h2>Delicious and Nutritious</h2>
            <p>Find the freshest and healthiest fruits.</p>
          </div>
        </div>
        <div>
          <img src={carousel4} alt="Fruits 2" />
          <div className="legend">
            <h2>Discover Fresh Vegetables</h2>
            <p>Explore a world of flavors and nutrition.</p>
          </div>
        </div>
        <div>
          <img src={carousel5} alt="Fruits 2" />
          <div className="legend">
            <h2>Discover Fresh Fruits</h2>
            <p>Explore a world of flavors and nutrition.</p>
          </div>
        </div>
        {/* Add more slides as needed */}
      </Carousel>

      <h3 className="promotional-title">Promotions</h3>
      <section className="promotional-banners">
        <div className="banner">
          <img src={promo1} alt="Promotion 1" />
          <div className="banner-content">
            <h2>Special Offer</h2>
            <p>Get 20% off on selected fruits</p>
          </div>
        </div>
        <div className="banner">
          <img src={promo2} alt="Promotion 2" />
          <div className="banner-content">
            <h2>Free Delivery</h2>
            <p>Enjoy free delivery on orders over $50</p>
          </div>
        </div>
        <div className="banner">
          <img src={promo3} alt="Promotion 3" />
          <div className="banner-content">
            <h2>New Arrivals</h2>
            <p>Discover our latest fruit arrivals</p>
          </div>
        </div>
        <div className="banner">
          <img src={promo4} alt="Promotion 4" className="promo4" />
          <div className="banner-content">
            <h2>Fresh Fruit & Vegetables</h2>
            <p>Enjoy refreshing fruits for the summer</p>
          </div>
        </div>
      </section>

      <h3 className="featured-title">Featured Products</h3>
      <section className="featured-products">
        <div className="product-list">
          {fruits.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {vegetables.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
