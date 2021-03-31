import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct, getProduct } from "../../../actions/product";
import { getCategories } from "../../../actions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'

const initialState = {
  title: "",
  description: "",
  price: "",
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

const ProductUpdate = ({ match }) => {
  // Fetch user from state
  const { user } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);


  const { slug } = match.params;

  useEffect(() => {
    loadProduct()
    loadCategories()
  }, [])

  const loadProduct = () => {
    getProduct(slug)
    .then(p => {
      setValues({ ...values, ...p.data})
    })
    .catch(err => {
      
    })
  }

  const loadCategories = () =>
    getCategories().then((c) => {
      console.log("Get categories in update", c.data)
      setCategories(c.data)
    });

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, " ------- ", e.target.value);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h4>Product Update</h4> 
          {JSON.stringify(values)}
          <ProductUpdateForm 
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          categories={categories}
          values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
