import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../actions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { fetchProductsByFilter } from "../actions/product";
import { Menu, Slider } from "antd";

const { SubMenu, ItemGroup } = Menu;

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);

  let { search } = useSelector((state) => ({ ...state }));
  const text = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  // Products loaded by default
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // Fetch specific products from query
  useEffect(() => {
    fetchProducts({ query: text });
  }, [text]);

  const fetchProducts = (arg) => {
    console.log("Sending argument to the backend", arg);
    fetchProductsByFilter(arg)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Load products based on product range

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <h4>Search/Filter</h4>
          <Menu mode="inline">
            <SubMenu>
              <div className=''>
                <Slider
                  className='ml-4 mr-4'
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={(value) => setPrice(value)}
                />
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className='col-md-9'>
          {loading ? (
            <h4 className='text-danger'>Products</h4>
          ) : (
            <h4 className=''>Products</h4>
          )}

          {products.length < 1 && <p>No Products Found</p>}

          <div className='row pb-5'>
            {products.map((p) => (
              <div className='col-md-4 mt-3' key={p._id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
