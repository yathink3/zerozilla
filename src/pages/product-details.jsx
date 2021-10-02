import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSingleProduct } from "../../services/products";
import Loader from "react-loader-spinner";
import { useCartDispatch, useCartStore } from "../store/hook";

const ProductDetails = (props) => {
  const { id } = props.match.params;
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const { addToCart, removeFromCart } = useCartDispatch();
  const { items } = useCartStore();

  const cartFind = items.find((el) => el.id == data?.id);

  useEffect(async () => {
    setLoader(true);
    try {
      const results = await getSingleProduct({ id });
      setData(results);
      console.log(results);
    } finally {
      setLoader(false);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3">
      {loader == true ? (
        <div
          className="h-screen w-screen flex items-center justify-center"
          children={
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          }
        />
      ) : data == null ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <span>product not found</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 p-10">
          <img
            className="p-1 rounded transition duration-200 text-gray-100 object-contain h-48 w-full"
            src={data.image}
          />
          <span>category:{data.category}</span>
          <span>description:{data.description}</span>
          <span>price:{data.price}</span>
          {data.rating && (
            <div className="grid grid-cols-1 gap-3">
              <span>count:{data.rating.count}</span>
              <span>rate:{data.rating.rate}</span>
            </div>
          )}
          <button
            className=" text-sm p-1 rounded transition duration-200 text-gray-600 hover:text-white focus:text-white focus:outline-none focus:bg-gray-700 hover:bg-gray-700 "
            onClick={() => addToCart(data)}
          >
            ADD TO CART
          </button>

          {cartFind && (
            <button
              className=" text-sm p-1 rounded transition duration-200 text-gray-600 hover:text-white focus:text-white focus:outline-none focus:bg-gray-700 hover:bg-gray-700 "
              onClick={() => removeFromCart(cartFind)}
            >
              REMOVE FROM CART {cartFind.count > 0 && cartFind.count + 1}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
