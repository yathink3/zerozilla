import React from "react";
import { Link } from "react-router-dom";
import { useCartStore, useCartDispatch } from "../store/hook";

const Cart = () => {
  const { removeFromCart } = useCartDispatch();
  const { items } = useCartStore();

  return (
    <div className="grid grid-cols-1 gap-3">
      {items.length == 0 ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <span>cart is empty</span>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 pl-3 pr-3">
          {items.map((data, ind) => (
            <div key={ind} className="justify-center">
              <Link to={`/product-details/${data.id}`}>
                <img
                  className="p-1 rounded transition duration-200 text-gray-100 object-contain h-48 w-full"
                  src={data.image}
                />
              </Link>
              <span>category:{data.category}</span>
              {/* <span>description:{data.description}</span> */}
              <span>price:{data.price}</span>
              {data.rating && (
                <div>
                  <span>count:{data.rating.count}</span>
                  <span>rate:{data.rating.rate}</span>
                </div>
              )}
              <div>
                <Link to={`/product-details/${data.id}`}>View product</Link>{" "}
              </div>
              <button
                className=" text-xs p-1 rounded transition duration-200 text-gray-600 hover:text-white focus:text-white focus:outline-none focus:bg-gray-700 hover:bg-gray-700 "
                onClick={() => removeFromCart(data)}
              >
                REMOVE FROM CART {data.count > 0 && data.count + 1}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
