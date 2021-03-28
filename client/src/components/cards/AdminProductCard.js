import React from "react";
import { Card } from "antd";
import laptop from "../../images/default.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug} = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "150px", objectFit: "cover" }}
          className='p-2'
        />
      }
      actions={[
        <EditOutlined className='text-warning' />,
        <DeleteOutlined className='text-danger' onClick={() => handleRemove(slug)}/>,
      ]}>
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
