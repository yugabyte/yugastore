import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/App';
import Cart from './components/Cart';
import BaseLayout from './components/BaseLayout';
import Products from './components/Products';
import ShowProduct from './components/ShowProduct';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
  <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route exact path="/" component={App} />

        <Route path="/cart" component={Cart} />

        <Route path="/business"
          render={(props) => (
            <Products
              name={"Business Books"}
              category={"business"} /> 
          )} />
        <Route path="/cookbooks"
          render={(props) => (
            <Products
              name={"Cookbooks"}
              category={"cookbooks"} /> 
          )} />
        <Route path="/mystery"
          render={(props) => (
            <Products
              name={"Mystery & Suspense"}
              category={"mystery"} /> 
          )} />
        <Route path="/scifi"
          render={(props) => (
            <Products
              name={"Sci-Fi & Fantasy"}
              category={"scifi"} /> 
          )} />

        <Route exact path="/products/:id" component={ShowProduct} />
      </Switch>
    </BaseLayout>
  </BrowserRouter>

, document.getElementById('root'));
registerServiceWorker();
