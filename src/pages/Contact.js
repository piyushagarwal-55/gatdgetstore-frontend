import React, { useState } from "react";
import "../styles/Contact.css";

import Header from './../components/Layout/Header';
import Footer from './../components/Layout/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <>
      <Header />
      <section className="contact-wrapper">
        <h2 className="contact-title">Contact Us</h2>
        <div className="contact-section">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />

              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
              />

              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter the subject"
                value={formData.subject}
                onChange={handleChange}
                required
                autoComplete="off"
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                required
                autoComplete="off"
              ></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>
          <div className="map-container">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1696124215167!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
