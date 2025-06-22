import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css"; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = process.env.REACT_APP_API;
      const res = await axios.post(`${API}/api/v1/auth/register`, formData);
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommerce App">
      <div className="register-wrapper">
        <div className="form-card">
          <h2 className="form-title">Create Account</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            {["name", "email", "password", "phone", "address", "answer"].map(
              (field, index) => (
                <div className="input-group" key={index}>
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                  <label>
                    {field === "answer"
                      ? "Favorite sport (for recovery)"
                      : `Enter your ${field}`}
                  </label>
                </div>
              )
            )}
            <button type="submit" className="submit-btn">
              Register
            </button>
            <div className="login-link">
              Already registered? <Link to="/login">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
