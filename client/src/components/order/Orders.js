import React from 'react'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import ShowPaymentInfo from "../cards/ShowPaymentInfo"

const Orders = ({ orders, handleStatusChange }) => (
    <>
        {orders.map((order) => (
            <div className="row pb-5" key={order._id}>
                <ShowPaymentInfo order={order}/>
            </div>
        ))}
    </>
)

export default Orders