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
  colors: ["Apple", "Samsung", "Microsoft", "ASUS", "Toshiba", "Lenovo"],
  brands: ["Black", "Grey", "Silver", "White", "Blue"],
  color: "",
};
const ProductCreate = () => {
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
    color,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnChange = (e) => {};

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
              <label>Color</label>
              <select
                name='color'
                className='form-control'
                onChange={handleOnChange}>
                <option>Please Select</option>
                {colors.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className='form-group'>
              <label>Brand</label>
              <select
                name='color'
                className='form-control'
                onChange={handleOnChange}>
                <option>Please Select</option>
                {brands.map((b) => (
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
