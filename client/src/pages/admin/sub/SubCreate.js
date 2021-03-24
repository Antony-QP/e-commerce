import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createSub, 
  removeSub,
} from "../../../actions/sub";
import {
    getCategories,
  } from "../../../actions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import { LocalSearch } from "../../../components/forms/LocalSearch";

// Create Category
const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [keyword, setKeyword] = useState("");

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  //   Get Categories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name: name, parent: category }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}"Sub category has been created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you would like to delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          loadCategories();
          toast.error(`${res.data.msg}`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
            setLoading(false);
          }
        });
    }
  };


 


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
            <h4>Create Sub Category</h4>
          )}

          <div className="form-group">
              <label>Main Category</label>
              <select name="category" className="form-control" onChange={e => setCategory(e.target.value)}>
                  <option>Please Select</option>
                 {categories.length > 0 && categories.map((c) => (
                     <option key={c._id} value={c._id}>{c.name}</option>
                 ))}
              </select>
          </div>
          {JSON.stringify(category)}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword}/>
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
