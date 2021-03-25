import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../actions/product";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  brands: ["Apple", "Samsung", "Microsoft", "ASUS", "Toshiba", "Lenovo"],
  colors: ["Black", "Grey", "Silver", "White", "Blue"],
  brand: "",
  color: "",
};

const ProductCreate = () => {

const { user } = useSelector((state) => ({...state }))

  const [values, setValues] = useState(initialState);
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    brand,
    color,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
        if (err.response.status === 400) toast.error(err.response.data);
    })
  };

  const handleOnChange = (e) => {
      setValues({...values, [e.target.name]: e.target.value});
      console.log(e.target.name, ' ------- ', e.target.value)
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h4>Product Create</h4>

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Title</label>
              <input
                type='text'
                name='title'
                id=''
                className='form-control'
                value={title}
                onChange={handleOnChange}
              />
            </div>

            <div className='form-group'>
              <label>Description</label>
              <input
                type='text'
                name='description'
                id=''
                className='form-control'
                value={description}
                onChange={handleOnChange}
              />
            </div>

            <div className='form-group'>
              <label>Price</label>
              <input
                type='text'
                name='price'
                id=''
                className='form-control'
                value={price}
                onChange={handleOnChange}
              />
            </div>

            <div className='form-group'>
              <label>Shipping</label>
              <select
                name='shipping'
                className='form-control'
                onChange={handleOnChange}>
                <option>Please Select</option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </div>

            <div className='form-group'>
              <label>Quantity</label>
              <input
                type='text'
                name='quantity'
                id=''
                className='form-control'
                value={quantity}
                onChange={handleOnChange}
              />
            </div>

            <div className='form-group'>
              <label>Brand</label>
              <select
                name='brand'
                className='form-control'
                onChange={handleOnChange}>
                <option>Please Select</option>
                {brands.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className='form-group'>
              <label>Color</label>
              <select
                name='color'
                className='form-control'
                onChange={handleOnChange}>
                <option>Please Select</option>
                {colors.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            
            <button className="btn btn-outline-info">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
