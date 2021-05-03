import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/default.png";
import { showAverage } from "../../actions/rating";
import { useSelector, useDispatch } from 'react-redux'
import _ from "lodash";

const { Meta } = Card;

export const ProductCard = ({ product }) => {
  const { description, title, images, slug, price } = product;

  const [toolTip, setToolTip] = useState("Click to add");

  const { user, cart } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    // Create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // If cart is in localstorage, retrieve it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // Push new product into cart
      cart.push({
        ...product,
        count: 1,
      });
      // Remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      // Show tool tip
      setToolTip("Added");

      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      })
    }
  };

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className='text-center'>No Rating Yet</div>
      )}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className='p-2'
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <>
              <EyeOutlined className='text-warning' />
              <br />
              View Product
            </>
          </Link>,
          <Tooltip title={toolTip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className='text-danger' />
              <br />
              Add To Cart
            </a>
          </Tooltip>,
        ]}>
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
