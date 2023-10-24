import React, { useState, useEffect } from "react";
import { useAuth } from "../../context";

import "../../styles/UserProfile.css";

const UserProfile = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    const profilePicture = document.querySelector(".profile-picture");
    if (profilePicture) {
      // Function to generate random color in hex format
      const getRandomColor = () =>
        "#" + Math.floor(Math.random() * 16777215).toString(16);

      // Set random background-color
      profilePicture.style.setProperty("--random-bg-color", getRandomColor());

      // Set random text color (to contrast with background color)
      profilePicture.style.setProperty("--random-text-color", getRandomColor());
    }
  }, []);

  const [activeTab, setActiveTab] = useState("orders");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderOrders = () => {
    return user?.orders.map((order) => (
      <div key={order.id}>
        <p>Order Number: {order.orderNumber}</p>
        <p>Date: {order.date}</p>
        <p>Status: {order.status}</p>
        {/* Display order details here */}
      </div>
    ));
  };

  const renderAddresses = () => {
    return user?.addresses.map((address) => (
      <div key={address.id}>
        <p>Type: {address.type}</p>
        <p>Address: {address.address}</p>
      </div>
    ));
  };

  const renderPaymentMethods = () => {
    return user?.paymentMethods.map((method) => (
      <div key={method.id}>
        <p>Type: {method.type}</p>
        <p>Last Four Digits: {method.lastFourDigits}</p>
        <p>Cardholder Name: {method.cardholderName}</p>
      </div>
    ));
  };

  const renderWishlist = () => {
    return user?.wishlist.map((item) => (
      <div key={item.id}>
        <p>Name: {item.name}</p>
        <p>Price: {item.price}</p>
      </div>
    ));
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="user-profile">
      {user ? (
        <div className="user-info">
          <div className="profile-picture">
            {`${user.firstName[0]}${user.lastName[0]}`}{" "}
            {/* Display initials as profile picture */}
          </div>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>Email: {user.email}</p>
        </div>
      ) : null}
      <div className="user-tabs">
        <button onClick={() => handleTabChange("orders")}>Order History</button>
        <button onClick={() => handleTabChange("addresses")}>Addresses</button>
        <button onClick={() => handleTabChange("paymentMethods")}>
          Payment Methods
        </button>
        <button onClick={() => handleTabChange("wishlist")}>Wishlist</button>
      </div>
      <div className="user-content">
        {activeTab === "orders" && renderOrders()}
        {activeTab === "addresses" && renderAddresses()}
        {activeTab === "paymentMethods" && renderPaymentMethods()}
        {activeTab === "wishlist" && renderWishlist()}
      </div>
      <div className="logout">
        <div
          className="draggable-logout"
          onDragEnd={handleLogout}
          draggable="true"
        >
          <span>Drag to Logout</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
