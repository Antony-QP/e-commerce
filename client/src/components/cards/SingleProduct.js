import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/default.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modals/RatingModal";

const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, images, description, _id } = product;
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
        <Tabs type='card'>
          <TabPane tab='Description' key='1'>
            {description && description}
          </TabPane>
          <TabPane tab='More' key='2'>
            Call to find out more about the product on 12345 678 91011
          </TabPane>
        </Tabs>
      </div>

      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>
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
            <RatingModal>
            <StarRating
              name={_id}
              numberOfStars={5}
              rating={2}
              changeRating={(newRating, name) =>
                console.log("newRating", newRating, "name", name)
              }
              isSelectable={true}
              starRatedColor='red'
            />
          </RatingModal>
          ]}>
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
