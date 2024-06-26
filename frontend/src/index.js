import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Provider } from 'react-redux'
import store from './redux/store'
import { HelmetProvider } from 'react-helmet-async'

import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';


import { Home } from './screeens/Home';
import ProductDetail from './screeens/ProductDetail'
import Cart from './screeens/Cart.jsx'
import Login from './screeens/Login.jsx'
import Register from './screeens/Register.jsx'
import Shipping from './screeens/Shipping.jsx'
import Payment from './screeens/Payment.jsx'
import PlaceOrder from './screeens/PlaceOrder.jsx'
import Order from './screeens/Order.jsx'
import Profile from './screeens/Profile.jsx'
import OrdersAmin from './screeens/admin/OrdersAdmin.jsx'
import PrivateAccess from './components/PrivateAccess.jsx'
import Admin from './components/Admin.jsx'
import Products from './screeens/admin/Products.jsx'
import ProductEdit from './screeens/admin/ProductEdit.jsx'
import UserList from './screeens/admin/UserList.jsx'
import EditUser from './screeens/admin/EditUser.jsx'
// axios.defaults.baseURL = 'http://localhost:3000/api';



const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='/page/:pageNumber' element={<Home />} />
      <Route path='/product/:id' element={<ProductDetail />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='' element={<PrivateAccess />}>
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/orders/:id' element={<Order />} />
        <Route path='/profile' element={<Profile />} />
      </Route>

      <Route path='' element={<Admin />}>
        <Route path='/admin/orderlist' element={<OrdersAmin />} />
        <Route path='/admin/productlist/:pageNumber' element={<Products />} />
        <Route path='/admin/product/:id/edit' element={<ProductEdit />} />
        <Route path='/admin/userlist' element={<UserList />} />
        <Route path='/admin/user/:id/edit' element={<EditUser />} />
      </Route>
    </Route>
  )
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={route} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
