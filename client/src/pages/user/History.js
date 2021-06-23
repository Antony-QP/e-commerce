import React, { useState, useEffect } from 'react'
import UserNav from '../../components/nav/UserNav'
import { getUserOrders } from '../../actions/user'
import { useSelector, useDispatch } from 'react-redux'
import { CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
import { toast } from 'react-toastify'

export const History = () => {

    const [orders, setOrders] = useState([])
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadUserOrders()
    }, [])

    const loadUserOrders = () => {
        getUserOrders(user.token).then(res => {
            console.log(JSON.stringify(res.data, null, 4))
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav/>
                </div>
                <div className="col"><h1>User History Page</h1></div>
            </div>
        </div>
    )
}

export default History;
