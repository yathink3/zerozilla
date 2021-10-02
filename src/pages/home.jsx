import React, { useState, useEffect } from "react";
import { getAllCategories, getAllProducts } from "../../services/products";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(async () => {
    setLoader(true);
    try {
      const results = await getAllCategories();
      setCategories(results);
      console.log(results);
      const results1 = await getAllProducts();
      setProducts(results1);
      console.log(results1);
    } finally {
      setLoader(false);
    }
  }, []);

  return loader == true ? (
    <div
      className="h-screen w-screen flex items-center justify-center"
      children={<Loader type="Puff" color="#00BFFF" height={100} width={100} />}
    />
  ) : (
    <div>
      <div>
        <div className="text-center"> All Categories</div>
        <div className="grid grid-cols-4 text-center">
          {categories.map((category, ind) => (
            <Link key={ind} to={`/category/${category}`}>
              <div className="justify-center pb-4 ">
                <span className="p-1 w-full justify-center border-solid border-2 rounded">
                  {category}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3 pl-3 pr-3">
          {products.map((prod, ind) => (
            <Link key={ind} to={`/product-details/${prod.id}`}>
              <div className="justify-center">
                <img
                  className="p-1 rounded transition duration-200 text-gray-100 object-contain h-48 w-full"
                  src={prod.image}
                />
                <span className="p-1 w-full justify-center">{prod.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
