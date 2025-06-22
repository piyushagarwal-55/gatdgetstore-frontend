import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsModern.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    setLoadingProduct(true);
    try {
      const API = process.env.REACT_APP_API;
       const { data } = await axios.get(`${API}/api/v1/product/get-product/${params.slug}`);
      

      if (data?.product) {
        setProduct(data.product);

        const productId = data.product._id;
        const categoryId = data.product.category?._id;

        if (productId && categoryId) {
          getSimilarProduct(productId, categoryId);
        } else {
          setRelatedProducts([]);
          setLoadingRelated(false);
        }
      } else {
        setProduct({});
        setRelatedProducts([]);
        setLoadingRelated(false);
      }
    } catch (error) {
      console.log("Error fetching product:", error);
      setProduct({});
      setRelatedProducts([]);
      setLoadingRelated(false);
    }
    setLoadingProduct(false);
  };

  const getSimilarProduct = async (pid, cid) => {
    setLoadingRelated(true);
    try {
      const API = process.env.REACT_APP_API;
      const { data } = await axios.get(
        `${API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products || []);
    } catch (error) {
      console.log("Error fetching related products:", error);
    }
    setLoadingRelated(false);
  };

  return (
    <Layout>
      <div className="product-container">
        {/* Product Detail */}
        {loadingProduct ? (
          <p className="loading-text">Loading product...</p>
        ) : !product || !product._id ? (
          <p className="loading-text">No product found.</p>
        ) : (
          <div className="product-detail-card">
            <div className="product-image">
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
            </div>
            <div className="product-info">
              <h2>{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">
                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p className="product-category">
                Category: <strong>{product?.category?.name}</strong>
              </p>
              <button className="btn-primary">Add to Cart</button>
            </div>
          </div>
        )}

        <hr className="divider" />

        {/* Similar Products */}
        <div className="similar-products-section">
          <h3>Similar Products ➡️</h3>

          {loadingRelated ? (
            <p className="loading-text">Loading similar products...</p>
          ) : !relatedProducts || relatedProducts.length === 0 ? (
            <p>No similar products found.</p>
          ) : (
            <div className="d-flex flex-wrap">
              {relatedProducts.map((p) => (
                <div className="similar-product-card" key={p._id}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="similar-product-info">
                    <h5>{p.name}</h5>
                    <p className="price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                    <p>{p.description.substring(0, 60)}...</p>
                    <button
                      className="btn-secondary"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
