import React from "react";
import { Link } from "react-router-dom";
import "../../styles/FooterStyle.css";

const Footer = () => {
  return (
    <footer className="section-footer">
      <div className="footer-container container">
        <div className="content content_1">
          <p>
            Welcome to Gadget Store, your ultimate destination for
            cutting-edge gadgets!
          </p>
          <img src="https://i.postimg.cc/Nj9dgJ98/cards.png" alt="cards" />
        </div>
        <div className="content content_2">
          <h4>SHOPPING</h4>
          <ul>
            <li>Computer Store</li>
            <li>Laptop Store</li>
            <li>Accessories</li>
            <li>Sales & Discount</li>
          </ul>
        </div>
        <div className="content content_3">
          <h4>EXPERIENCE</h4>
          <ul>
            <li>About</li>
             <li><Link to="/contact">Contact</Link></li>
            <li>Privacy Policy</li>
            <li>Payment Method</li>
            <li>Delivery</li>
            <li>Return and Exchange</li>
          </ul>
        </div>
        <div className="content content_4">
          <h4>NEWSLETTER</h4>
          <p>Be the first to know about new arrivals, sales & promos!</p>
          <div className="f-mail">
            <input type="email" placeholder="Your Email" />
            <button type="submit"><i className="bx bx-envelope"></i></button>
          </div>
        </div>
      </div>
      <div className="f-design">
        <p>Design and Code by Piyush Agarwal</p>
      </div>
    </footer>
  );
};

export default Footer;
