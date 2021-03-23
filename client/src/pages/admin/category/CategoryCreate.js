import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../actions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// Create Category
const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  //   Get Categories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name: name }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        loadCategories()
        toast.success(`"${res.data.name}" category has been created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async(slug) => {
    if(window.confirm("Are you sure you would like to delete?")){
        setLoading(true)
        removeCategory(slug, user.token)
        .then(res => {
            setLoading(false)
            loadCategories()
            toast.error(`${res.data.msg}`)
        })
        .catch(err => {
            if (err.response.status === 400){
                toast.error(err.response.data);
                setLoading(false)
            } 
        })
    }
  }

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <button className='btn btn-outline-primary mt-2'>Save</button>
      </div>
    </form>
  );

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading..</h4>
          ) : (
            <h4>Create category</h4>
          )}
          {categoryForm()}
          {categories.map((c) => (
            <div className='alert alert-secondary' key={c._id}>
              {c.name}{" "}
              <span className='btn btn-sm float-right text-danger' onClick={() => handleRemove(c.slug)}>
                <DeleteOutlined />
              </span>{" "}
              <Link to={`/admin/category/${c.slug}`}>
                <span className='btn btn-sm float-right text-danger text-warning'>
                  <EditOutlined />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
