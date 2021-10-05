import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { getAllProdByCategory } from '../../services/products';

const Category = props => {
  const { category } = props.match.params;

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(async () => {
    setLoader(true);
    try {
      const results = await getAllProdByCategory({ category });
      setData(results);
      console.log(results);
    } finally {
      setLoader(false);
    }
  }, []);

  return (
    <div className='grid grid-cols-1 gap-3'>
      {loader == true ? (
        <div className='h-screen w-screen flex items-center justify-center' children={<Loader type='Puff' color='#00BFFF' height={100} width={100} />} />
      ) : data.length === 0 ? (
        <div className='h-screen w-screen flex items-center justify-center'>
          <span>empty category</span>
        </div>
      ) : (
        <div className='grid grid-cols-4 gap-3 pl-3 pr-3'>
          {data.map((prod, ind) => (
            <Link key={ind} to={`/product-details/${prod.id}`}>
              <div className='justify-center'>
                <img className='p-1 rounded transition duration-200 text-gray-100 object-contain h-48 w-full' src={prod.image} />
                <span className='p-1 w-full justify-center'>{prod.title}</span>
              </div>
            </Link>
          ))}
        </div>
      )}{' '}
    </div>
  );
};

export default Category;
