import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/default.png";
import ProductListItems from './ProductListItems'

const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const { title, images } = product;
  return (
    <>
      <div className='col-md-7'>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop={true}>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={Laptop}
                style={{ height: "450", objectFit: "cover" }}
                className='mb-3'
              />
            }></Card>
        )}
      </div>

      <div className='col-md-5'>
      <h1 className="bg-info p-3">{title}</h1>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className='text-success' /> Add to cart
            </>,
            <Link to='/'>
              <HeartOutlined className='text-info' />
              <br />
              Add To Wishlist
            </Link>,
          ]}>
          <ProductListItems product={product}/>
        </Card>
      </div>
    </>    
  );
};

export default SingleProduct;
