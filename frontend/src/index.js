import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotScreen from './screens/ForgotScreen';
import CartScreen from './screens/CartScreen';
import store from './store';
import { Provider } from 'react-redux';
import ShippingScreen from './screens/ShippingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import UserListScreen from './screens/admin/UserListScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import { HelmetProvider } from 'react-helmet-async';

import { GlobalProvider } from "./context/GlobalState";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/shipping' element={<ShippingScreen />} />
      <Route path='/placeorder' element={<PlaceOrderScreen />} />
      <Route path='/order/:id' element={<OrderScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/forgot' element={<ForgotScreen />} />
      {/* Admin users */}
      <Route path='/admin/productlist' element={<ProductListScreen />} />
      <Route path='/admin/userlist' element={<UserListScreen />} />
      <Route path='/admin/orderlist' element={<OrderListScreen />} />
      <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalProvider>
  <React.StrictMode>
     <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
  </GlobalProvider>
  
);

reportWebVitals();
