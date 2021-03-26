import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../actions/product";
import { getCategories } from "../../../actions/category";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

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
  // Fetch user from state
  const { user } = useSelector((state) => ({ ...state }));

  // Get all categories
  useEffect(() => {
    loadCategories();
  }, []);

  //   Load categories
  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const [values, setValues] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" has been added`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

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
          <h4>Product Create</h4>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
