import React, { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import SearchIcon from '../assets/search.svg?component';
import './App.css';
import { useCartStore } from './store/hook';

const withLazy = comp => props => {
  const Component = lazy(comp);
  return (
    <Suspense fallback={<div className='h-screen w-screen flex items-center justify-center' children={<Loader type='Puff' color='#00BFFF' height={100} width={100} />} />}>
      <Component {...props} />
    </Suspense>
  );
};

const CartData = () => {
  const { itemLength } = useCartStore();
  return (
    <div className='p-1 rounded transition duration-200 text-gray-100 focus:outline-none focus:bg-gray-700 hover:bg-gray-700 '>
      <Link to={`/cart`}>cart : {itemLength}</Link>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className=' z-0 lg:flex-grow'>
        <div className=' z-0 lg:flex-grow'>
          <div className='bg-gray-800  flex justify-between'>
            <div className='p-1 rounded transition duration-200 text-gray-100 focus:outline-none focus:bg-gray-700 hover:bg-gray-700 '>
              <Link to={`/home`}> HOME </Link>
            </div>

            <div className='pt-2 pb-2 relative mx-auto text-gray-600'>
              <input className='border-2 border-gray-300 bg-white h-8 px-3 pr-10 rounded-lg text-sm focus:outline-none' name='search' placeholder='Search' />
              <button className='absolute right-0 top-0 mt-4 mb-3 mr-3'>
                <SearchIcon />
              </button>
            </div>

            <div className='flex space-x-4'>
              <CartData />
              <div className='p-1 rounded transition duration-200 text-gray-100 focus:outline-none focus:bg-gray-700 hover:bg-gray-700 '>
                <Link to={`/my-profile`}> Profile </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Switch>
        <Route exact path='/home' component={withLazy(() => import('./pages/home'))} />
        <Route exact path='/cart' component={withLazy(() => import('./pages/cart'))} />
        <Route exact path='/product-details/:id' component={withLazy(() => import('./pages/product-details'))} />
        <Route exact path='/' render={props => <Redirect {...props} to='/home' />} />
        <Route path='/my-profile' component={withLazy(() => import('./pages/my-profile'))} />
        <Route path='/category/:category' component={withLazy(() => import('./pages/category'))} />
        <Route component={withLazy(() => import('./pages/error404'))} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
