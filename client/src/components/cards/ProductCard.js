import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/default.png";
import { showAverage } from "../../actions/rating";

const { Meta } = Card;

export const ProductCard = ({ product }) => {
  const { description, title, images, slug } = product;
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
          <>
            <ShoppingCartOutlined className='text-danger' />
            <br />
            Add To Cart
          </>,
        ]}>
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
