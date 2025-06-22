import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartModern.css"; // ⬅️ New stylesheet

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getToken = async () => {
    try {
      const API = process.env.REACT_APP_API;
      const { data } = await axios.get(`${API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const API = process.env.REACT_APP_API;
      const { data } = await axios.post(`${API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      setCart([]);
      localStorage.removeItem("cart");
      toast.success("Payment Completed Successfully");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-container">
        <div className="cart-header">
          <h2>
            {auth?.user ? `Hello, ${auth?.user?.name}` : "Hello Guest"}
          </h2>
          <p>
            {cart?.length > 0
              ? `You have ${cart.length} item(s) in your cart.`
              : "Your cart is empty."}
          </p>
        </div>

        <div className="cart-main">
          <div className="cart-items">
            {cart?.map((p) => (
              <div className="cart-card" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="cart-img"
                />
                <div className="cart-details">
                  <h5>{p.name}</h5>
                  <p>{p.description.substring(0, 60)}...</p>
                  <h6>${p.price}</h6>
                  <button
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h4>Cart Summary</h4>
            <hr />
            <p>Total: <strong>{totalPrice()}</strong></p>

            {auth?.user?.address ? (
              <div className="mb-3">
                <h6>Shipping to:</h6>
                <p>{auth?.user?.address}</p>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Add Shipping Address
                  </button>
                ) : (
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Login to Checkout
                  </button>
                )}
              </div>
            )}

            <div className="mt-3">
              {clientToken && auth?.token && cart?.length > 0 && (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-success w-100"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
